import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { Timer } from '@/nodes/triggers/Timer';

// The type of triggers we support on an empty canvas
export type TriggerType = "action" | "trigger"

// The kinds of nodes a user can add on the canvas
export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter"

// Metadata for the node storing info about the task its performing
export type NodeMetadata = any;

// Data structure for the node being used in the workflow
interface NodeType {
    id: string,
    type: NodeKind,
    data: {
        kind: TriggerType,
        metadata: NodeMetadata,
    },
    position: {
        x: number,
        y: number
    },
}

// Data structure for the edges being used in the workflow
interface EdgeType {
    id: string,
    source: string,
    target: string
}

// Component that will handle all the workflow creation process
export function CreateWorkflow() {

    // State variables to handle the states of nodes in the canvas
    const [nodes, setNodes] = useState<NodeType[]>([]);

    // State variables to handle the states of edges in the canvas
    const [edges, setEdges] = useState<EdgeType[]>([]);

    // Runs the following callback function on a node's change
    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );

    // Runs the following callback function on a edge's change
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    // Runs the following callback function on connecting an edge to a node
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    // Variables to store node-types, being sent to Reactflow component
    const nodeTypes = {
        "price-trigger": PriceTrigger,
        "timer": Timer
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {JSON.stringify(nodes)}
            {/* If there are no nodes present on the canvas it triggers a sheet to appear on RHS to select the type of trigger as the first node */}
            {!nodes.length && <TriggerSheet onSelectHandler={(type, metadata) => {
                setNodes([...nodes, {
                    id: Math.random().toString(),
                    type,
                    data: {
                        kind: "trigger",
                        metadata,
                    },
                    position: {
                        x: 0,
                        y: 0
                    },
                }])
            }} />}

            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </div>
    );
}