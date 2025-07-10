import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface SaveButtonProps {
  onSave: () => { success: boolean; message: string };
}

export default function SaveButton({ onSave }: SaveButtonProps) {
  const [saveResult, setSaveResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSave = () => {
    const result = onSave();
    setSaveResult(result);
    
    // Clear the message after 3 seconds
    setTimeout(() => setSaveResult(null), 3000);
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="flex items-center gap-3">
        {saveResult && (
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            saveResult.success 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {saveResult.message}
          </div>
        )}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}