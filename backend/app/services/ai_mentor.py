import openai
from app.core.config import settings

# Initialize OpenRouter Client
client = openai.AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)

async def analyze_code(code: str, mission_context: str) -> str:
    if not settings.OPENROUTER_API_KEY:
        return "The AI Mentor is currently meditating. (Missing OPENROUTER_API_KEY in .env)"
        
    prompt = f"""You are the CherryQuest AI Mentor, a wise and encouraging programming teacher.
The user is working on the following mission:
{mission_context}

Here is their current code:
```python
{code}
```

Review their code. Do NOT give them the direct answer. Provide a short, beginner-friendly hint (max 3 sentences) to help them fix their syntax or logic errors. If their code is correct, praise them warmly."""

    try:
        response = await client.chat.completions.create(
            model="google/gemini-2.5-flash",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"The Mentor's magic is unstable right now. ({str(e)})"
