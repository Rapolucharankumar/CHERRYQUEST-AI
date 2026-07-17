from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.db.database import get_db
from app.models.user import User, Profile
from app.models.gamification import UserProgress
from app.schemas.user import UserSchema

router = APIRouter()


async def get_current_user(
    x_user_id: str = Header(None),
    x_user_email: str = Header(None),
    db: AsyncSession = Depends(get_db)
):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    result = await db.execute(
        select(User)
        .options(selectinload(User.profile), selectinload(User.progress))
        .where(User.id == x_user_id)
    )
    user = result.scalars().first()

    if not user:
        if not x_user_email:
            # Fallback for dev if email is not passed
            x_user_email = f"{x_user_id}@example.com"

        # Create new user
        user = User(id=x_user_id, email=x_user_email)
        profile = Profile(user_id=x_user_id)
        db.add(user)
        db.add(profile)

        # Init progress for mission 1
        progress = UserProgress(user_id=x_user_id, mission_id=1, status="available")
        db.add(progress)

        await db.commit()

        # Reload with relationships
        result = await db.execute(
            select(User)
            .options(selectinload(User.profile), selectinload(User.progress))
            .where(User.id == x_user_id)
        )
        user = result.scalars().first()

    return user


@router.get("/me", response_model=UserSchema)
async def get_me(user: User = Depends(get_current_user)):
    return user
