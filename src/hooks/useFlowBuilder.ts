import { useState, useCallback } from 'react';
import { FlowNode, FlowEdge, Position, NodeType } from '../types/flow';

export default function useFlowBuilder() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggedNodeType, setDraggedNodeType] = useState<NodeType | null>(null);

  const addNode = useCallback((nodeType: NodeType, position: Position) => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type: nodeType.id,
      position,
      data: { ...nodeType.defaultData }
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const updateNode = useCallback((nodeId: string, data: any) => {
    setNodes(prev => 
      prev.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, ...data } }
          : node
      )
    );
  }, []);

  const moveNode = useCallback((nodeId: string, position: Position) => {
    setNodes(prev => 
      prev.map(node => 
        node.id === nodeId 
          ? { ...node, position }
          : node
      )
    );
  }, []);

  const selectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId || null);
  }, []);

  const connectNodes = useCallback((sourceId: string, targetId: string) => {
    // Check if source already has an outgoing edge
    const hasOutgoingEdge = edges.some(edge => edge.source === sourceId);
    
    if (!hasOutgoingEdge) {
      const newEdge: FlowEdge = {
        id: `edge-${Date.now()}`,
        source: sourceId,
        target: targetId
      };
      setEdges(prev => [...prev, newEdge]);
    }
  }, [edges]);

  const validateFlow = useCallback(() => {
    if (nodes.length <= 1) return true;
    
    const nodesWithoutTargets = nodes.filter(node => 
      !edges.some(edge => edge.target === node.id)
    );
    
    return nodesWithoutTargets.length <= 1;
  }, [nodes, edges]);

  const saveFlow = useCallback(() => {
    const isValid = validateFlow();
    
    if (isValid) {
      console.log('Flow saved successfully!', { nodes, edges });
      return { success: true, message: 'Flow saved successfully!' };
    } else {
      return { success: false, message: 'Cannot save Flow' };
    }
  }, [nodes, edges, validateFlow]);

  const selectedNode = selectedNodeId ? nodes.find(n => n.id === selectedNodeId) || null : null;

  return {
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
  };
}