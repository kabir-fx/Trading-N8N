import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { useState } from "react";

// List of supported triggers currently available for use
const SUPPORTED_TRIGGERS = [
    {
        id: "timer",
        title: "Timer",
        description: "Run this trigger every x min/sec."
    },
    {
        id: "price-trigger",
        title: "Price Trigger",
        description: "Run this trigger when the price of a stock crosses a certain threshold."
    }
]

// Component to render a sheet on the RHS of the webpage
export const TriggerSheet = ({
    onSelectHandler
}: {
    onSelectHandler: (
        kind: NodeKind,
        metadata: NodeMetadata
    ) => void
}) => {
    // State variables to handle the state of metadata of the node
    const [metadata, setMetadata] = useState({});

    return <Sheet>
        <SheetTrigger>Create Triggers</SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select your trigger</SheetTitle>
                <SheetDescription>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {/* Maps thru the list of all the supported triggers to display to the user */}
                                {SUPPORTED_TRIGGERS.map(({ id, title, description }) => <>
                                    <SelectItem onSelect={() => onSelectHandler(
                                        id,
                                        metadata
                                    )} value={id}> {title} </SelectItem>
                                    <SelectLabel>{description}</SelectLabel>
                                </>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
}