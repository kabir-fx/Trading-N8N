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
    SheetTitle
} from "@/components/ui/sheet"
import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import { Input } from "@/components/ui/input";

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

// List of supported assets currently available for use
const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"]

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
    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600
    });
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
                    {selectedTrigger == "timer" && <div>
                        No. of seconds after which to run the timer
                        <Input type="text" placeholder="3600" onChange={(e) => {
                            setMetadata((existingMetadata) => ({
                                ...existingMetadata,
                                time: Number(e.target.value)
                            }))
                        }} ></Input>
                    </div>
                    }

                    {selectedTrigger == "price-trigger" && <div>
                        Price:
                        <Input type="text" onChange={(e) => {
                            setMetadata((existingMetadata) => ({
                                ...existingMetadata,
                                price: Number(e.target.value)
                            }))
                        }} >
                        </Input>

                        Asset:
                        <Select
                            // value: This tells the dropdown: "Show the option that matches the variable selectedTrigger
                            value={metadata.asset}
                            //  onValueChange: When the user clicks a different option, this updates the selectedTrigger variable to the new choice
                            onValueChange={(value) => setMetadata((existingMetadata) => ({
                                ...existingMetadata,
                                asset: value
                            }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an asset" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* Maps thru the list of all the supported triggers to display to the user */}
                                    {SUPPORTED_ASSETS.map((id) => <>
                                        <SelectItem value={id}> {id} </SelectItem>
                                    </>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>}
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