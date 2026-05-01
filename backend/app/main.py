"""
ElectionSim — FastAPI Backend
Main application entry point with all API routes.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from app.config import CORS_ORIGINS
from app.election_data import TIMELINE_PHASES, FLOWCHART_NODES, FLOWCHART_EDGES
from app.simulation import start_session, process_action, get_available_roles
from app.ai_assistant import ask_ai

app = FastAPI(
    title="ElectionSim API",
    description="Interactive Election Education & Simulation Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Request / Response Models ───────────────────────────────────

class SimulationStartRequest(BaseModel):
    role: str  # "voter", "candidate", or "officer"

class SimulationActionRequest(BaseModel):
    session_id: str
    action: str

class AskRequest(BaseModel):
    question: str
    context: Optional[str] = ""


# ─── Health Check ────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"status": "ok", "app": "ElectionSim API", "version": "1.0.0"}


# ─── Timeline API ────────────────────────────────────────────────

@app.get("/api/timeline/india")
async def get_timeline():
    """Return election timeline phases for India."""
    return {"country": "India", "phases": TIMELINE_PHASES}


# ─── Flowchart API ───────────────────────────────────────────────

@app.get("/api/flowchart")
async def get_flowchart():
    """Return flowchart nodes and edges for election process."""
    return {"nodes": FLOWCHART_NODES, "edges": FLOWCHART_EDGES}


# ─── Simulation API ─────────────────────────────────────────────

@app.get("/api/simulate/roles")
async def get_roles():
    """Return available simulation roles."""
    return {"roles": get_available_roles()}


@app.post("/api/simulate/start")
async def sim_start(req: SimulationStartRequest):
    """Start a new simulation session."""
    result = start_session(req.role)
    if "error" in result:
        return {"error": result["error"]}, 400
    return result


@app.post("/api/simulate/action")
async def sim_action(req: SimulationActionRequest):
    """Process a simulation action."""
    result = process_action(req.session_id, req.action)
    if "error" in result:
        return {"error": result["error"]}, 400
    return result


# ─── AI Assistant API ────────────────────────────────────────────

@app.post("/api/ask")
async def ask_question(req: AskRequest):
    """Ask the AI assistant a question about elections."""
    result = await ask_ai(req.question, req.context)
    return result


# ─── Run ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    from app.config import BACKEND_HOST, BACKEND_PORT
    uvicorn.run("app.main:app", host=BACKEND_HOST, port=BACKEND_PORT, reload=True)
