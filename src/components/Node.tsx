import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Circle } from 'lucide-react';
import { FlowNode, Position } from '../types/flow';

interface NodeProps {
  node: FlowNode;
  isSelected: boolean;
  onSelect: (nodeId: string) => void;
  onMove: (nodeId: string, position: Position) => void;
  onConnect: (sourceId: string, targetId: string) => void;
  onStartConnection: (nodeId: string) => void;
  connectingFrom: string | null;
  edges: any[];
}

export default function Node({ 
  node, 
  isSelected, 
  onSelect, 
  onMove, 
  onConnect, 
  onStartConnection, 
  connectingFrom,
  edges 
}: NodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === nodeRef.current || nodeRef.current?.contains(e.target as Node)) {
      setIsDragging(true);
      const rect = nodeRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
      onSelect(node.id);
    }
  };

  const handleSourceHandleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartConnection(node.id);
  };

  const handleTargetHandleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (connectingFrom && connectingFrom !== node.id) {
      onConnect(connectingFrom, node.id);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && nodeRef.current) {
        const canvas = nodeRef.current.closest('.flow-canvas');
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();
          const newX = e.clientX - canvasRect.left - dragOffset.x;
          const newY = e.clientY - canvasRect.top - dragOffset.y;
          onMove(node.id, { x: Math.max(0, newX), y: Math.max(0, newY) });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, node.id, onMove]);

  const hasOutgoingEdge = edges.some(edge => edge.source === node.id);
  const hasIncomingEdge = edges.some(edge => edge.target === node.id);

  return (
    <div
      ref={nodeRef}
      className={`absolute cursor-move select-none group ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Target Handle */}
      <div
        className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-gray-400 bg-white rounded-full cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors ${
          connectingFrom ? 'border-blue-500 bg-blue-50' : ''
        } ${hasIncomingEdge ? 'border-green-500 bg-green-50' : ''}`}
        onClick={handleTargetHandleClick}
      >
        <Circle className="w-2 h-2 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Node Content */}
      <div className="bg-emerald-100 border-2 border-emerald-500 rounded-lg p-4 shadow-lg min-w-[200px] hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-emerald-800">Send Message</span>
        </div>
        <div className="text-sm text-gray-700 bg-white p-2 rounded border min-h-[40px] break-words">
          {node.data.text || 'Enter your message...'}
        </div>
      </div>

      {/* Source Handle */}
      <div
        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-gray-400 bg-white rounded-full cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors ${
          hasOutgoingEdge ? 'border-green-500 bg-green-50' : ''
        } ${connectingFrom === node.id ? 'border-blue-500 bg-blue-50' : ''}`}
        onClick={handleSourceHandleClick}
      >
        <Circle className="w-2 h-2 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}