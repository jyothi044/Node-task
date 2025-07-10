import React, { useState, useRef } from 'react';
import Node from './Node';
import Edge from './Edge';
import { FlowNode, FlowEdge, Position, NodeType } from '../types/flow';

interface FlowCanvasProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  onNodeMove: (nodeId: string, position: Position) => void;
  onNodeSelect: (nodeId: string) => void;
  onAddNode: (nodeType: NodeType, position: Position) => void;
  onConnect: (sourceId: string, targetId: string) => void;
  selectedNodeId: string | null;
  draggedNodeType: NodeType | null;
}

export default function FlowCanvas({
  nodes,
  edges,
  onNodeMove,
  onNodeSelect,
  onAddNode,
  onConnect,
  selectedNodeId,
  draggedNodeType
}: FlowCanvasProps) {
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onNodeSelect('');
      setConnectingFrom(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (draggedNodeType && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left - 100, // Center the node
        y: e.clientY - rect.top - 50
      };
      onAddNode(draggedNodeType, position);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleStartConnection = (nodeId: string) => {
    setConnectingFrom(nodeId);
  };

  const handleConnect = (sourceId: string, targetId: string) => {
    // Check if source already has an outgoing edge
    const hasOutgoingEdge = edges.some(edge => edge.source === sourceId);
    
    if (!hasOutgoingEdge) {
      onConnect(sourceId, targetId);
    }
    
    setConnectingFrom(null);
  };

  return (
    <div
      ref={canvasRef}
      className="flex-1 bg-gray-50 relative overflow-hidden flow-canvas"
      onClick={handleCanvasClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ minHeight: '100vh' }}
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Edges */}
      {edges.map((edge) => (
        <Edge key={edge.id} edge={edge} nodes={nodes} />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
          onSelect={onNodeSelect}
          onMove={onNodeMove}
          onConnect={handleConnect}
          onStartConnection={handleStartConnection}
          connectingFrom={connectingFrom}
          edges={edges}
        />
      ))}

      {/* Connection Preview */}
      {connectingFrom && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 absolute top-4 left-4">
            Click on a target handle to connect
          </div>
        </div>
      )}
    </div>
  );
}