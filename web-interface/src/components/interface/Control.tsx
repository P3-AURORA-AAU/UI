import Window from "@/components/general/Window.tsx";
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Lock, Unlock} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

export default function Control() {
    return (
        <Window title={"CONTROL_INTERFACE"}>
            <div className={"h-60"}>
                <div className={"grid grid-cols-4 gap-4 px-4 h-full"}>
                    <Movement/>
                    <System/>
                    <ExpansionModules/>
                </div>
            </div>
        </Window>
    )
}

function Movement() {
    const [isFullSpeed, setIsFullSpeed] = useState(true)
    const [isMovementLocked, setIsMovementLocked] = useState(false)

    return (
        <div className={"flex flex-col gap-4 justify-between pb-4"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>MOVEMENT</span>
            <div className={"grid grid-cols-3 gap-1.5"}>
                <div/>
                <Button variant={"outline"} disabled={isMovementLocked} className={"h-10 text-muted-foreground"}>
                    <ArrowUp className={"size-6"}/>
                </Button>
                <div/>
                <Button variant={"outline"} disabled={isMovementLocked} className={"h-10 text-muted-foreground"}>
                    <ArrowLeft className={"size-6"}/>
                </Button>
                <Button variant={"outline"} disabled={isMovementLocked} className={"h-10 text-muted-foreground"}>
                    <ArrowDown className={"size-6"}/>
                </Button>
                <Button variant={"outline"} disabled={isMovementLocked} className={"h-10 text-muted-foreground"}>
                    <ArrowRight className={"size-6"}/>
                </Button>
            </div>
            <div>
                <div className={"flex gap-2"}>
                    <button
                        onClick={() => setIsFullSpeed(!isFullSpeed)}
                        className={`flex-1 relative h-16 border-2 transition-all hover:bg-primary/20 ${
                            isFullSpeed
                                ? "border-primary bg-primary/10 hover:bg-primary/20"
                                : "border-primary/50 bg-transparent hover:bg-primary/10"
                        }`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-mono font-bold text-primary whitespace-break-spaces">Speed: {isFullSpeed ? "100%" : "50% "}</span>
                        </div>
                        <div
                            className={`absolute top-1 bottom-1 w-1/2 bg-primary/30 transition-transform duration-300 ${
                                isFullSpeed ? "translate-x-[calc(100%-0.2rem)]" : "translate-x-[0.2rem]"
                            }`}
                        />
                    </button>
                    <Button
                        variant="outline"
                        size="icon"
                        className={`h-16 w-16 shrink-0 transition-all ${
                            isMovementLocked
                                ? "border-destructive bg-destructive/20 text-destructive/70 hover:text-destructive hover:bg-destructive/30 hover:border-destructive active:hover:bg-destructive/50"
                                : ""
                        }`}
                        onClick={() => setIsMovementLocked(!isMovementLocked)}
                    >
                        {isMovementLocked ? <Lock className="h-6 w-6" /> : <Unlock className="h-6 w-6" />}
                    </Button>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground text-center mt-2">
                    {isMovementLocked ? "MOVEMENT LOCKED" : "MOVEMENT UNLOCKED"}
                </div>
            </div>
        </div>
    )
}

function System() {
    return (
        <div className={"flex flex-col gap-4 col-span-1"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>SYSTEM</span>
        </div>
    )
}

function ExpansionModules() {
    return (
        <div className={"flex flex-col gap-4 col-span-2 h-60"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>EXPANSION_MODULES</span>
            <Tabs defaultValue={"none"} className={"grid grid-cols-3 gap-2 min-h-0 pb-4"}>
                <TabsList className={"col-span-1 flex h-auto w-auto flex-col gap-2 overflow-y-auto " +
                    "scrollbar-thin scrollbar-track-background scrollbar-thumb-primary/50 pr-2 bg-transparent"}>
                    <TabsTrigger value={"sensors"} className={""}>Sensors</TabsTrigger>
                    <TabsTrigger value={"none"} className={""}>None</TabsTrigger>
                    <TabsTrigger value={"none"} className={""}>None</TabsTrigger>
                    <TabsTrigger value={"none"} className={""}>None</TabsTrigger>
                    <TabsTrigger value={"none"} className={""}>None</TabsTrigger>
                    <TabsTrigger value={"none"} className={""}>None</TabsTrigger>
                </TabsList>
                <div className={"col-span-2"}>
                    <TabsContent value={"none"} className={"border h-full p-2 w-auto"}>none</TabsContent>
                    <TabsContent value={"sensors"} className={"border h-full p-2 w-auto"}>wawa</TabsContent>
                </div>
            </Tabs>
        </div>
    )
}