"""
AI Assistant — Qwen integration via NVIDIA NIM (OpenAI-compatible API).
"""
from openai import OpenAI
from app.config import ASSISTANT_API_KEY, MODEL

SYSTEM_PROMPT = """You are ElectionSim AI, an expert election education assistant.

ROLE:
- Explain Indian election processes in simple, clear language
- Answer "what happens if..." questions about elections
- Provide factual, unbiased procedural knowledge
- Help users understand the Election Commission of India's processes

RULES:
- NEVER express political opinions or party preferences
- NEVER recommend voting for any party or candidate
- If asked about political opinions, politely decline and redirect to procedural topics
- Always cite the Election Commission of India or relevant laws when applicable
- Use examples and analogies to explain complex processes
- Keep responses concise but informative (2-3 paragraphs max)
- If the question is not related to elections or democracy, politely redirect

CONTEXT:
You are part of ElectionSim, an interactive election education platform.
The user may be going through a simulation as a Voter, Candidate, or Election Officer.

TASK:
Analyze users queries and if they are related to Indian Elections then answer them as cleanly and in few words. If not then say "I can only answer reagrding
Indian Elections" and politely end conversation.
"""


def get_client():
    """Create OpenAI client pointing to NVIDIA NIM endpoint."""
    return OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=ASSISTANT_API_KEY,
    )


async def ask_ai(question: str, context: str = "") -> dict:
    """Send a question to Qwen via NVIDIA NIM and return the response."""
    if not ASSISTANT_API_KEY:
        return {
            "answer": "AI Assistant is not configured. Please set the ASSISTANT_API_KEY in your .env file.",
            "model": "none",
            "error": True,
        }

    try:
        client = get_client()
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        if context:
            messages.append({
                "role": "system",
                "content": f"Current simulation context: {context}",
            })

        messages.append({"role": "user", "content": question})

        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=1024,
        )

        answer = response.choices[0].message.content
        return {
            "answer": answer,
            "model": MODEL,
            "error": False,
        }

    except Exception as e:
        return {
            "answer": f"I'm having trouble connecting to the AI service. Error: {str(e)}",
            "model": MODEL,
            "error": True,
        }
