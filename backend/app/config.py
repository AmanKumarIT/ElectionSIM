"""
ElectionSim Configuration
Loads environment variables using python-dotenv.
"""
import os
from dotenv import load_dotenv

load_dotenv()

# ─── NVIDIA / Qwen AI ────────────────────────────────────────────
ASSISTANT_API_KEY = os.getenv("ASSISTANT_API_KEY", "")
MODEL = os.getenv("MODEL", "qwen/qwen2.5-72b-instruct")

# ─── MongoDB ─────────────────────────────────────────────────────
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/electionsim")
DB_NAME = os.getenv("DB_NAME", "electionsim")

# ─── Server ──────────────────────────────────────────────────────
BACKEND_HOST = os.getenv("BACKEND_HOST", "0.0.0.0")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", "8000"))
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
