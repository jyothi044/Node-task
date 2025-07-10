export interface Position {
  x: number;
  y: number;
}

export interface FlowNode {
  id: string;
  type: string;
  position: Position;
  data: {
    text: string;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface NodeType {
  id: string;
  label: string;
  icon: string;
  defaultData: any;
}