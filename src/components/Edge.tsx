import React from 'react';
import { FlowEdge, FlowNode } from '../types/flow';

interface EdgeProps {
  edge: FlowEdge;
  nodes: FlowNode[];
}

export default function Edge({ edge, nodes }: EdgeProps) {
  const sourceNode = nodes.find(n => n.id === edge.source);
  const targetNode = nodes.find(n => n.id === edge.target);

  if (!sourceNode || !targetNode) return null;

  const sourceX = sourceNode.position.x + 100; // Center of node (width/2)
  const sourceY = sourceNode.position.y + 80; // Bottom of node
  const targetX = targetNode.position.x + 100; // Center of node
  const targetY = targetNode.position.y - 8; // Top of node

  const path = `M ${sourceX} ${sourceY} Q ${sourceX} ${(sourceY + targetY) / 2} ${targetX} ${targetY}`;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#666"
          />
        </marker>
      </defs>
      <path
        d={path}
        stroke="#666"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}