import { Handle, Position } from "@xyflow/react"

// Properties attached to a Price Trigger node
export type PriceTriggerMetadata = {
    // SOL, BTC, ETH, etc
    asset: string

    // Price of the asset
    price: number
}

// React component for a Price trigger node
export function PriceTrigger({ data }: {
    data: {
        metadata: PriceTriggerMetadata,
    }
}) {
    return <div>
        {data.metadata.asset}
        {data.metadata.price}
        <Handle type="source" position={Position.Right}></Handle>
    </div>
}
