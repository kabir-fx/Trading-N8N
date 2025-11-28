import { Handle, Position } from "@xyflow/react"

// Properties attached to a Time trigger node
export type TimerNodeMetadata = {
    // Seconds until this triggers acts
    time: number
}

// React component for a Time trigger node
export function Timer({ data }: {
    data: {
        metadata: TimerNodeMetadata,
    }
}) {
    return <div>
        Every {data.metadata.time} seconds
        <Handle type="source" position={Position.Right}></Handle>
    </div>
}
