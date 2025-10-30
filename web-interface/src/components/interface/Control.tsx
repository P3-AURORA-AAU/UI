import Window from "@/components/general/Window.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp} from "lucide-react";

export default function Control() {
    return (
        <Window title={"CONTROL_INTERFACE"}>
            <div className={"h-60"}>
                <div className={"grid grid-cols-5 gap-4 px-4"}>
                    <Movement/>
                    <System/>
                    <ExpansionModules/>
                </div>
            </div>
        </Window>
    )
}

function Movement() {
    return (
        <div className={"flex flex-col gap-4"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>MOVEMENT</span>
            <div className={"grid grid-cols-3 gap-1.5"}>
                <div/>
                <Button
                    variant={"outline"}
                    className={"h-14 border-primary/50 hover:border-primary hover:bg-primary/20 hover:text-primary" +
                        " bg-transparent"}
                >
                    <ArrowUp className={"size-6"}/>
                </Button>
                <div/>
                <Button
                    variant={"outline"}
                    className={"h-14 border-primary/50 hover:border-primary hover:bg-primary/20 hover:text-primary" +
                        " bg-transparent"}
                >
                    <ArrowLeft className={"size-6"}/>
                </Button>
                <Button
                    variant={"outline"}
                    className={"h-14 border-primary/50 hover:border-primary hover:bg-primary/20 hover:text-primary" +
                        " bg-transparent"}
                >
                    <ArrowDown className={"size-6"}/>
                </Button>
                <Button
                    variant={"outline"}
                    className={"h-14 border-primary/50 hover:border-primary hover:bg-primary/20 hover:text-primary" +
                        " bg-transparent"}
                >
                    <ArrowRight className={"size-6"}/>
                </Button>
            </div>
        </div>
    )
}

function System() {
    return (
        <div className={"flex flex-col gap-4 col-span-2"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>SYSTEM</span>
        </div>
    )
}

function ExpansionModules() {
    return (
        <div className={"flex flex-col gap-4 col-span-2"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>EXPANSION_MODULES</span>
        </div>
    )
}