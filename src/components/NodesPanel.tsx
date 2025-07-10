import React from 'react';
import { MessageCircle } from 'lucide-react';
import { NodeType } from '../types/flow';

interface NodesPanelProps {
  nodeTypes: NodeType[];
  onDragStart: (nodeType: NodeType) => void;
}

export default function NodesPanel({ nodeTypes, onDragStart }: NodesPanelProps) {
  const handleDragStart = (e: React.DragEvent, nodeType: NodeType) => {
    e.dataTransfer.setData('application/reactflow', nodeType.id);
    onDragStart(nodeType);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Nodes Panel</h3>
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.id}
            className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-grab active:cursor-grabbing hover:border-blue-400 hover:bg-blue-50 transition-colors"
            draggable
            onDragStart={(e) => handleDragStart(e, nodeType)}
          >
            <MessageCircle className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">{nodeType.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}