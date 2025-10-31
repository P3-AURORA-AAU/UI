import Window from "@/components/general/Window.tsx";
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp} from "lucide-react";
import StyledButton from "@/components/general/StyledButton.tsx";

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
                <StyledButton className={"h-10"}>
                    <ArrowUp className={"size-6"}/>
                </StyledButton>
                <div/>
                <StyledButton className={"h-10"}>
                    <ArrowLeft className={"size-6"}/>
                </StyledButton>
                <StyledButton className={"h-10"}>
                    <ArrowDown className={"size-6"}/>
                </StyledButton>
                <StyledButton className={"h-10"}>
                    <ArrowRight className={"size-6"}/>
                </StyledButton>
            </div>
            <p>Idk put something here ig</p>
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