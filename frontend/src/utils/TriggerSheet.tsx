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
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);

    return <Sheet open={true}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select your trigger</SheetTitle>
                <SheetDescription>
                    <Select
                        // value: This tells the dropdown: "Show the option that matches the variable selectedTrigger
                        value={selectedTrigger}
                        //  onValueChange: When the user clicks a different option, this updates the selectedTrigger variable to the new choice
                        onValueChange={(value) => setSelectedTrigger(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {/* Maps thru the list of all the supported triggers to display to the user */}
                                {SUPPORTED_TRIGGERS.map(({ id, title, description }) => <>
                                    <SelectItem value={id}> {title} </SelectItem>
                                    <SelectLabel>{description}</SelectLabel>
                                </>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </SheetDescription>
            </SheetHeader>
            <SheetFooter>
                <Button onClick={() => {
                    onSelectHandler(
                        selectedTrigger,
                        metadata
                    )
                }} > Submit </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
}