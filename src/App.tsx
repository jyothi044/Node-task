import React from 'react';
import FlowCanvas from './components/FlowCanvas';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import SaveButton from './components/SaveButton';
import useFlowBuilder from './hooks/useFlowBuilder';
import { nodeTypes } from './data/nodeTypes';

function App() {
  const {
    nodes,
    edges,
    selectedNode,
    selectedNodeId,
    draggedNodeType,
    addNode,
    updateNode,
    moveNode,
    selectNode,
    connectNodes,
    saveFlow,
    setDraggedNodeType
  } = useFlowBuilder();

  const handleDragStart = (nodeType: any) => {
    setDraggedNodeType(nodeType);
  };

  const handleBack = () => {
    selectNode('');
  };

  return (
    <div className="h-screen flex bg-gray-100 relative">
      <SaveButton onSave={saveFlow} />
      
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodeMove={moveNode}
        onNodeSelect={selectNode}
        onAddNode={addNode}
        onConnect={connectNodes}
        selectedNodeId={selectedNodeId}
        draggedNodeType={draggedNodeType}
      />
      
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onUpdateNode={updateNode}
          onBack={handleBack}
        />
      ) : (
        <NodesPanel
          nodeTypes={nodeTypes}
          onDragStart={handleDragStart}
        />
      )}
    </div>
  );
}

export default App;