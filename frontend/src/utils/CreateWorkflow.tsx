import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger, type PriceTriggerMetadata } from '@/nodes/triggers/PriceTrigger';
import { Timer, type TimerNodeMetadata } from '@/nodes/triggers/Timer';
import { ActionSheet, type TradingMetadata } from './ActionSheet';
import { Lighter } from '@/nodes/actions/Lighter';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';
import { Backpack } from '@/nodes/actions/Backpack';

// The type of triggers we support on an empty canvas
export type TriggerType = "action" | "trigger"

// The kinds of nodes a user can add on the canvas
export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter"

// Metadata for the node storing info about the task its performing
export type NodeMetadata = TradingMetadata | TimerNodeMetadata | PriceTriggerMetadata;

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
function Flow() {
    const { screenToFlowPosition } = useReactFlow();

    // State variables to handle the states of nodes in the canvas
    const [nodes, setNodes] = useState<NodeType[]>([]);

    // State variables to handle the states of edges in the canvas
    const [edges, setEdges] = useState<EdgeType[]>([]);

    // State variables to handle the state of the action sheet
    const [selectAction, setSelectAction] = useState<{
        position: {
            x: number,
            y: number
        },
        startingNodeId: string
    } | null>(null);

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

    // Runs the following callback function on connecting an edge to a node
    const onConnectEnd = useCallback(
        (event: any, connectionInfo: any) => {
            // If the edge is connected is left open in the canvas it opens the action sheet
            if (!connectionInfo.isValid) {
                // Gets the position of the mouse cursor
                const { clientX, clientY } = event;

                // Converts the position of the mouse cursor to the position of the node in the canvas
                const position = screenToFlowPosition({ x: clientX, y: clientY });

                setSelectAction({
                    position,
                    startingNodeId: connectionInfo.fromNode.id
                })
            }
        },
        [screenToFlowPosition]
    );

    // Variables to store node-types, being sent to Reactflow component
    const nodeTypes = {
        "price-trigger": PriceTrigger,
        "timer": Timer,
        "lighter": Lighter,
        "backpack": Backpack,
        "hyperliquid": Hyperliquid
    };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>

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

            {/* If the state of selectionAction is not null it triggers a sheet to appear on RHS to select the type of action as the second node */}
            {selectAction && <ActionSheet onSelectHandler={(type, metadata) => {
                const id = Math.random().toString();

                // Adds the action node to the canvas
                setNodes([...nodes, {
                    id,
                    type,
                    data: {
                        kind: "action",
                        metadata,
                    },
                    position: selectAction.position
                }])

                // Adds the edge to the canvas
                setEdges([...edges, {
                    id: `${selectAction.startingNodeId}-${id}`,
                    source: selectAction.startingNodeId,
                    target: id
                }])

                // Resets the state of selectionAction
                setSelectAction(null)
            }} />}

            {/* The ReactFlow component that renders the canvas */}
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                fitView
            />
        </div>
    );
}

// Component to wrap the Flow component to provide the ReactFlow context
export function CreateWorkflow() {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
}