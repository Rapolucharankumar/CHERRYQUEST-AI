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

        # Mission 3: Basic Math
        m3 = Mission(
            chapter_id=chapter1.id,
            title="The Alchemist's Equation",
            story_intro="Every spell has a cost. By learning mathematical operations, you can calculate the exact amount of mana required.",
            learning_objective="Learn basic arithmetic operations: addition, subtraction, multiplication, and division.",
            explanation="Python can be used as a calculator.\n\n```python\nmana = 10 + 5\ncost = mana * 2\n```",
            xp_reward=250,
            coin_reward=40,
            order_index=3
        )
        db.add(m3)
        await db.commit()
        await db.refresh(m3)

        c3 = CodingChallenge(
            mission_id=m3.id,
            language="python",
            starter_code="# Calculate the total mana by adding 50 and 75, then print the result.\n\n",
            solution_code="total_mana = 50 + 75\nprint(total_mana)",
            test_cases=[{"input": "", "expected_output": "125\n"}]
        )
        db.add(c3)

        # Mission 4: Strings
        m4 = Mission(
            chapter_id=chapter1.id,
            title="Whispers in the Code",
            story_intro="Words have power. By manipulating strings of text, you can cast enchantments and communicate with ancient systems.",
            learning_objective="Learn string concatenation and basic string methods.",
            explanation="You can combine strings using the `+` operator.\n\n```python\ngreeting = 'Hello' + ' ' + 'World'\n```",
            xp_reward=300,
            coin_reward=50,
            order_index=4
        )
        db.add(m4)
        await db.commit()
        await db.refresh(m4)

        c4 = CodingChallenge(
            mission_id=m4.id,
            language="python",
            starter_code="# Combine 'Cyber' and 'Punk' into a single string and print it.\nword1 = 'Cyber'\nword2 = 'Punk'\n\n",
            solution_code="word1 = 'Cyber'\nword2 = 'Punk'\nprint(word1 + word2)",
            test_cases=[{"input": "", "expected_output": "CyberPunk\n"}]
        )
        db.add(c4)

        # Mission 5: Lists
        m5 = Mission(
            chapter_id=chapter1.id,
            title="The Inventory of Holding",
            story_intro="Every adventurer needs a bag to hold their loot. In Python, we use lists to store multiple items in a single variable.",
            learning_objective="Learn how to create and access elements in a list.",
            explanation="Lists are used to store multiple items in a single variable.\n\n```python\ninventory = ['potion', 'sword', 'shield']\nprint(inventory[0]) # prints potion\n```",
            xp_reward=350,
            coin_reward=60,
            order_index=5
        )
        db.add(m5)
        await db.commit()
        await db.refresh(m5)

        c5 = CodingChallenge(
            mission_id=m5.id,
            language="python",
            starter_code="# Create a list called 'weapons' containing 'sword', 'bow', and 'staff'. Print the second item.\n\n",
            solution_code="weapons = ['sword', 'bow', 'staff']\nprint(weapons[1])",
            test_cases=[{"input": "", "expected_output": "bow\n"}]
        )
        db.add(c5)

        # Mission 6: Loops
        m6 = Mission(
            chapter_id=chapter1.id,
            title="The Endless Cycle",
            story_intro="Some spells need to be cast repeatedly. Instead of saying the incantation 100 times, you can use a loop to do it for you.",
            learning_objective="Learn how to use a for loop to iterate over a list.",
            explanation="A for loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string).\n\n```python\nfor item in inventory:\n  print(item)\n```",
            xp_reward=400,
            coin_reward=70,
            order_index=6
        )
        db.add(m6)
        await db.commit()
        await db.refresh(m6)

        await db.commit()
        print("Successfully seeded World 1 and Missions into the database!")

if __name__ == "__main__":
    asyncio.run(seed_data())
