"""
Simulation Engine — State machine for election role simulations.
"""
import uuid
from app.election_data import SIMULATION_TREES

# In-memory session store (replaced by MongoDB in production)
_sessions: dict = {}


def get_available_roles():
    """Return available simulation roles with metadata."""
    return [
        {
            "id": role_id,
            "title": tree["title"],
            "description": tree["description"],
            "total_steps": max(
                s.get("total_steps", s.get("step_number", 1))
                for s in tree["steps"].values()
                if "total_steps" in s or "step_number" in s
            ),
        }
        for role_id, tree in SIMULATION_TREES.items()
    ]


def start_session(role: str) -> dict:
    """Start a new simulation session for a given role."""
    if role not in SIMULATION_TREES:
        return {"error": f"Invalid role: {role}. Choose from: {list(SIMULATION_TREES.keys())}"}

    session_id = str(uuid.uuid4())
    tree = SIMULATION_TREES[role]
    first_step = tree["steps"]["start"]

    session = {
        "session_id": session_id,
        "role": role,
        "current_step": "start",
        "history": [],
        "score": 0,
        "status": "active",
    }
    _sessions[session_id] = session

    return {
        "session_id": session_id,
        "role": role,
        "title": tree["title"],
        "step": first_step,
        "score": 0,
        "status": "active",
    }


def process_action(session_id: str, action: str) -> dict:
    """Process a user action and advance the simulation."""
    session = _sessions.get(session_id)
    if not session:
        return {"error": "Session not found. Start a new simulation."}

    if session["status"] != "active":
        return {"error": "Simulation already completed.", "session": session}

    role = session["role"]
    tree = SIMULATION_TREES[role]
    current = tree["steps"].get(session["current_step"])

    if not current:
        return {"error": "Invalid simulation state."}

    # Find matching choice
    next_step_id = None
    for choice in current.get("choices", []):
        if choice["action"] == action:
            next_step_id = choice["next"]
            break

    if not next_step_id:
        valid = [c["action"] for c in current.get("choices", [])]
        return {"error": f"Invalid action: '{action}'. Valid actions: {valid}"}

    # Advance state
    session["history"].append(session["current_step"])
    session["current_step"] = next_step_id
    next_step = tree["steps"].get(next_step_id)

    if not next_step:
        return {"error": f"Step '{next_step_id}' not found in simulation tree."}

    # Check if simulation ended
    if next_step.get("is_end"):
        session["status"] = "completed"
        session["score"] = next_step.get("score", 0)

    return {
        "session_id": session_id,
        "role": role,
        "step": next_step,
        "score": session["score"],
        "status": session["status"],
        "history": session["history"],
        "outcome": next_step.get("outcome"),
    }


def get_session(session_id: str) -> dict | None:
    """Retrieve a simulation session."""
    return _sessions.get(session_id)
