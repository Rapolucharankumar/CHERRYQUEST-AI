from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "CherryQuest AI"
    # Using SQLite for local MVP to ensure fast iteration
    DATABASE_URL: str = "sqlite+aiosqlite:///./cherryquest.db"

    # Clerk Auth (We will validate tokens later)
    CLERK_SECRET_KEY: str = ""

    # AI Mentor
    OPENROUTER_API_KEY: str = ""

    # Frontend config
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        env_file = ".env"


settings = Settings()
