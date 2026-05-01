"use client";
import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { getFlowchart, FlowNode as FN, FlowEdge as FE } from "@/lib/api";

const GROUP_COLORS: Record<string, string> = {
  pre: "#6366f1",
  election: "#06b6d4",
  post: "#f59e0b",
};

function buildNodes(data: FN[]): Node[] {
  return data.map((n) => ({
    id: n.id,
    position: { x: n.x * 0.7, y: n.y * 1.2 },
    data: { label: `${n.icon} ${n.label}` },
    style: {
      background: "rgba(255,255,255,0.03)",
      backdropFilter: "blur(12px)",
      border: `1px solid rgba(255,255,255,0.08)`,
      borderLeft: `3px solid ${GROUP_COLORS[n.group] || "#6366f1"}`,
      borderRadius: "8px",
      padding: "10px 14px",
      color: "#e4e1ed",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "12px",
      fontWeight: 500,
      minWidth: "130px",
      textAlign: "center" as const,
    },
  }));
}

function buildEdges(data: FE[]): Edge[] {
  return data.map((e, i) => ({
    id: `e${i}`,
    source: e.source,
    target: e.target,
    label: e.label || "",
    animated: true,
    style: { stroke: "#6366f180", strokeWidth: 2 },
    labelStyle: { fill: "#c7c4d7", fontSize: 10, fontFamily: "'Space Grotesk', sans-serif" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f180" },
  }));
}

// Fallback data
const FALLBACK_NODES: FN[] = [
  { id: "n1", label: "Election Announced", icon: "📢", group: "pre", x: 0, y: 200 },
  { id: "n2", label: "Model Code of Conduct", icon: "📜", group: "pre", x: 250, y: 200 },
  { id: "n3", label: "Nomination Filing", icon: "📝", group: "pre", x: 500, y: 200 },
  { id: "n4", label: "Scrutiny", icon: "🔍", group: "pre", x: 750, y: 200 },
  { id: "n5a", label: "Accepted", icon: "✅", group: "pre", x: 1000, y: 100 },
  { id: "n5b", label: "Rejected", icon: "❌", group: "pre", x: 1000, y: 300 },
  { id: "n6", label: "Candidate List", icon: "📋", group: "pre", x: 1250, y: 100 },
  { id: "n7", label: "Campaign", icon: "📣", group: "pre", x: 1500, y: 100 },
  { id: "n8", label: "Silent Period", icon: "🤫", group: "election", x: 1750, y: 100 },
  { id: "n9", label: "Polling Day", icon: "🗳️", group: "election", x: 2000, y: 200 },
  { id: "n10", label: "EVM Voting", icon: "🖥️", group: "election", x: 2250, y: 200 },
  { id: "n11", label: "Sealed & Stored", icon: "🔒", group: "election", x: 2500, y: 200 },
  { id: "n12", label: "Counting Day", icon: "📊", group: "post", x: 2750, y: 200 },
  { id: "n13", label: "Results", icon: "🏆", group: "post", x: 3000, y: 200 },
  { id: "n14a", label: "Majority", icon: "✅", group: "post", x: 3250, y: 100 },
  { id: "n14b", label: "No Majority", icon: "⚖️", group: "post", x: 3250, y: 300 },
  { id: "n15a", label: "Govt Formed", icon: "🏛️", group: "post", x: 3500, y: 100 },
  { id: "n15b", label: "Coalition", icon: "🔄", group: "post", x: 3500, y: 300 },
];
const FALLBACK_EDGES: FE[] = [
  { source: "n1", target: "n2" }, { source: "n2", target: "n3" },
  { source: "n3", target: "n4" }, { source: "n4", target: "n5a", label: "Valid" },
  { source: "n4", target: "n5b", label: "Invalid" }, { source: "n5a", target: "n6" },
  { source: "n6", target: "n7" }, { source: "n7", target: "n8" },
  { source: "n8", target: "n9" }, { source: "n9", target: "n10" },
  { source: "n10", target: "n11" }, { source: "n11", target: "n12" },
  { source: "n12", target: "n13" }, { source: "n13", target: "n14a", label: "Majority" },
  { source: "n13", target: "n14b", label: "Hung" }, { source: "n14a", target: "n15a" },
  { source: "n14b", target: "n15b" },
];

export default function FlowchartPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    getFlowchart()
      .then((d) => {
        setNodes(buildNodes(d.nodes));
        setEdges(buildEdges(d.edges));
      })
      .catch(() => {
        setNodes(buildNodes(FALLBACK_NODES));
        setEdges(buildEdges(FALLBACK_EDGES));
      });
  }, [setNodes, setEdges]);

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1 className="heading-lg text-gradient">Election Process Flow</h1>
          <p className="page-header__subtitle">Interactive visualization of the complete election lifecycle</p>
        </div>
      </div>
      <div className="container" style={{ padding: "0 40px 48px" }}>
        <div className="flowchart-wrapper" style={{ position: "relative" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            proOptions={{ hideAttribution: true }}
            style={{ background: "#0a0e1a" }}
          >
            <Background color="#6366f108" gap={40} />
            <Controls
              style={{ background: "#1f1f27", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
            />
            <MiniMap
              style={{ background: "#13131b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
              nodeColor="#6366f1"
              maskColor="rgba(10,14,26,0.8)"
            />
          </ReactFlow>

          {/* Legend */}
          <div className="glass-card flow-legend">
            <div className="label-caps" style={{ marginBottom: 4 }}>Legend</div>
            {[
              { color: "#6366f1", label: "Pre-Election" },
              { color: "#06b6d4", label: "Election Day" },
              { color: "#f59e0b", label: "Post-Election" },
            ].map((l) => (
              <div key={l.label} className="flow-legend__item">
                <div className="flow-legend__dot" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
