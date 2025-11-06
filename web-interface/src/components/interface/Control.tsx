import Window from "@/components/general/Window.tsx";
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";

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
    return (
        <div className={"flex flex-col gap-4"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>MOVEMENT</span>
            <div className={"grid grid-cols-3 gap-1.5"}>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    50%
                </Button>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    <ArrowUp className={"size-6"}/>
                </Button>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    100%
                </Button>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    <ArrowLeft className={"size-6"}/>
                </Button>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    <ArrowDown className={"size-6"}/>
                </Button>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    <ArrowRight className={"size-6"}/>
                </Button>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    IMO
                </Button>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    Gyroscope
                </Button>
                <Button variant={"outline"} className={"h-10 text-muted-foreground"}>
                    IDFK
                </Button>
                
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