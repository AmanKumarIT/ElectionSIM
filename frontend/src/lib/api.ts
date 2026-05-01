import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export type Phase = {
  id: string;
  step: string;
  icon: string;
  day: number;
  duration: string;
  color: string;
  description: string;
  key_activities: string[];
};

export type FlowNode = {
  id: string;
  label: string;
  icon: string;
  group: "pre" | "election" | "post";
  x: number;
  y: number;
};

export type FlowEdge = {
  source: string;
  target: string;
  label?: string;
};

export type Choice = {
  label: string;
  action: string;
  next: string;
};

export type SimStep = {
  id: string;
  prompt: string;
  info: string;
  choices: Choice[];
  is_end?: boolean;
  score?: number;
  outcome?: string;
  step_number?: number;
  total_steps?: number;
};

export type SimRole = {
  id: string;
  title: string;
  description: string;
  total_steps: number;
};

export type SimSession = {
  session_id: string;
  role: string;
  title?: string;
  step: SimStep;
  score: number;
  status: string;
  history?: string[];
  outcome?: string;
};

// ─── API Functions ──────────────────────────────────────────────

export async function getTimeline(): Promise<{ country: string; phases: Phase[] }> {
  const { data } = await api.get("/timeline/india");
  return data;
}

export async function getFlowchart(): Promise<{ nodes: FlowNode[]; edges: FlowEdge[] }> {
  const { data } = await api.get("/flowchart");
  return data;
}

export async function getRoles(): Promise<{ roles: SimRole[] }> {
  const { data } = await api.get("/simulate/roles");
  return data;
}

export async function startSimulation(role: string): Promise<SimSession> {
  const { data } = await api.post("/simulate/start", { role });
  return data;
}

export async function submitAction(sessionId: string, action: string): Promise<SimSession> {
  const { data } = await api.post("/simulate/action", {
    session_id: sessionId,
    action,
  });
  return data;
}

export async function askAI(
  question: string,
  context?: string
): Promise<{ answer: string; model: string; error: boolean }> {
  const { data } = await api.post("/ask", { question, context });
  return data;
}
