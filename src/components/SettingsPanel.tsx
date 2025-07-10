import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { FlowNode } from '../types/flow';

interface SettingsPanelProps {
  selectedNode: FlowNode | null;
  onUpdateNode: (nodeId: string, data: any) => void;
  onBack: () => void;
}

export default function SettingsPanel({ selectedNode, onUpdateNode, onBack }: SettingsPanelProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.text || '');
    }
  }, [selectedNode]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { text: newText });
    }
  };

  if (!selectedNode) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <MessageCircle className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Message</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text
          </label>
          <textarea
            value={text}
            onChange={handleTextChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter your message..."
          />
        </div>
      </div>
    </div>
  );
}