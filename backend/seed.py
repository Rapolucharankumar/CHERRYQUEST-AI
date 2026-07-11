import asyncio
from app.db.database import AsyncSessionLocal
from app.models.mission import World, Chapter, Mission, CodingChallenge

async def seed_data():
    async with AsyncSessionLocal() as db:
        # Create World 1
        world1 = World(
            title="Python Basics",
            description="Embark on your journey into the realm of Python. Learn the fundamentals of magic spells (code) to manipulate data and logic.",
            order_index=1
        )
        db.add(world1)
        await db.commit()
        await db.refresh(world1)

        # Create Chapter 1
        chapter1 = Chapter(
            world_id=world1.id,
            title="The Awakening",
            order_index=1
        )
        db.add(chapter1)
        await db.commit()
        await db.refresh(chapter1)

        # Mission 1: Variables
        m1 = Mission(
            chapter_id=chapter1.id,
            title="Slay the Syntax Bug",
            story_intro="Welcome, young mage. Before casting complex spells, you must learn to store magical energy in vessels called 'variables'.",
            learning_objective="Learn how to declare variables in Python and assign values to them.",
            explanation="Variables are containers for storing data values.\n\n```python\nx = 5\nname = 'CherryQuest'\n```",
            xp_reward=150,
            coin_reward=20,
            order_index=1
        )
        db.add(m1)
        await db.commit()
        await db.refresh(m1)

        # Challenge for M1
        c1 = CodingChallenge(
            mission_id=m1.id,
            language="python",
            starter_code="# Declare a variable named 'hero' and assign it the string 'CherryQuest'\n\n",
            solution_code="hero = 'CherryQuest'\nprint(hero)",
            test_cases=[{"input": "", "expected_output": "CherryQuest\n"}]
        )
        db.add(c1)
        
        # Mission 2: Data Types
        m2 = Mission(
            chapter_id=chapter1.id,
            title="The Potion of Data Types",
            story_intro="Not all magic is the same. Some spells require numbers, others require words. You must learn to distinguish them.",
            learning_objective="Understand integers, floats, strings, and booleans.",
            explanation="Python has different data types built-in by default, in these categories:\n- Text Type: `str`\n- Numeric Types: `int`, `float`, `complex`\n- Boolean Type: `bool`",
            xp_reward=200,
            coin_reward=30,
            order_index=2
        )
        db.add(m2)
        await db.commit()
        await db.refresh(m2)

        c2 = CodingChallenge(
            mission_id=m2.id,
            language="python",
            starter_code="# Print the type of the variable 'magic_power' which is set to 9000.5\nmagic_power = 9000.5\n",
            solution_code="magic_power = 9000.5\nprint(type(magic_power).__name__)",
            test_cases=[{"input": "", "expected_output": "float\n"}]
        )
        db.add(c2)

        await db.commit()
        print("Successfully seeded World 1 and Missions into the database!")

if __name__ == "__main__":
    asyncio.run(seed_data())
