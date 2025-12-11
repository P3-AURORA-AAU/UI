import Window from "@/components/general/Window.tsx";
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CircleQuestionMark, Lock, Unlock} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";
import type {MoveData, RoverStatusData} from "@/hooks/useRoverWebsockets.ts";

interface Props {
    moveRover: (moveData: MoveData) => void;
    changeSpeed: (speed: string) => void;
    roverStatus: RoverStatusData;
    enableHumanDetection: (enabled: boolean) => void;
}

export default function Control(props: Props) {
    return (
        <Window title={"CONTROL_INTERFACE"}>
            <div className={"h-60"}>
                <div className={"grid grid-cols-4 gap-4 px-4 h-full"}>
                    <Movement {...props}/>
                    <System enableHumanDetection={props.enableHumanDetection} roverStatus={props.roverStatus}/>
                    <ExpansionModules/>
                </div>
            </div>
        </Window>
    )
}

function Movement({moveRover, changeSpeed, roverStatus}: Props) {
    interface MovementDirectionsState {
        forward: boolean;
        backwards: boolean;
        left: boolean;
        right: boolean;
    }

    const [isMovementLocked, setIsMovementLocked] = useState(false)
    const [movementDirections, setMovementDirections] = useState<MovementDirectionsState>({forward: false, backwards: false, left: false, right: false})
    const [directionString, setDirectionString] = useState<string>("none")

    // handle individual directions, and also combinations of x and y axis directions
    function getDirectionString() {
        let directionString = "";
        
        // if both forward and backward are pressed, do nothing. otherwise add it to the string
        if (!(movementDirections.forward && movementDirections.backwards)) {
            if (movementDirections.forward) directionString += "forward";
            if (movementDirections.backwards) directionString += "backwards";
        }

        // if both left and right are pressed, do nothing. otherwise add it to the string
        if (!(movementDirections.left && movementDirections.right)) {
            if (movementDirections.left) directionString += directionString ? "_left" : "left";
            if (movementDirections.right) directionString += directionString ? "_right" : "right";
        }

        return directionString || "none";
    }

    // direction buttons
    useEffect(() => {
        const newDirectionString = getDirectionString();
        if (newDirectionString !== directionString) {
            setDirectionString(newDirectionString);
            console.log("new direction string: " + newDirectionString)
            moveRover({direction: newDirectionString});
        }
    }, [movementDirections, directionString])

    // speed changes
    useEffect(() => {
        // do le thing
    })

    // WASD and arrow keys stuff
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (isMovementLocked) return;

            const key = e.key.toLowerCase();
            switch (key) {
                case "w":
                case "arrowup":
                    setMovementDirections(prev => ({...prev, forward: true}));
                    break;
                case "s":
                case "arrowdown":
                    setMovementDirections(prev => ({...prev, backwards: true}));
                    break;
                case "a":
                case "arrowleft":
                    setMovementDirections(prev => ({...prev, left: true}));
                    break;
                case "d":
                case "arrowright":
                    setMovementDirections(prev => ({...prev, right: true}));
                    break;
            }
        }

        function handleKeyUp (e: KeyboardEvent) {
            const key = e.key.toLowerCase();
            switch(key) {
                case 'w':
                case 'arrowup':
                    setMovementDirections(prev => ({...prev, forward: false}));
                    break;
                case 's':
                case 'arrowdown':
                    setMovementDirections(prev => ({...prev, backwards: false}));
                    break;
                case 'a':
                case 'arrowleft':
                    setMovementDirections(prev => ({...prev, left: false}));
                    break;
                case 'd':
                case 'arrowright':
                    setMovementDirections(prev => ({...prev, right: false}));
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    })

    return (
        <div className={"flex flex-col gap-4 justify-between pb-4"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>MOVEMENT</span>
            <div className={"grid grid-cols-3 gap-1.5"}>
                <Button variant={"outline"} disabled={isMovementLocked} className={"h-10 text-muted-foreground"}>
                    <CircleQuestionMark className={"size-6"}/>
                </Button>
                <Button
                    variant={"outline"}
                    disabled={isMovementLocked}
                    className={cn("h-10 text-muted-foreground", movementDirections.forward && "bg-primary/50 text-secondary hover:bg-primary/50 hover:text-secondary border-primary")}
                    onMouseDown={() => setMovementDirections(prev => ({...prev, forward: true}))}
                    onMouseUp={() => setMovementDirections(prev => ({...prev, forward: false}))}
                    onMouseLeave={() => setMovementDirections(prev => ({...prev, forward: false}))}
                >
                    <ArrowUp className={"size-6"}/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className={`h-10 w-auto shrink-0 transition-all ${
                        isMovementLocked
                            ? "border-destructive bg-destructive/20 text-destructive/70 hover:text-destructive hover:bg-destructive/30 hover:border-destructive active:hover:bg-destructive/50"
                            : ""
                    }`}
                    onClick={() => setIsMovementLocked(!isMovementLocked)}
                >
                    {isMovementLocked ? <Lock className="h-6 w-6" /> : <Unlock className="h-6 w-6" />}
                </Button>
                <Button
                    variant={"outline"}
                    disabled={isMovementLocked}
                    className={cn("h-10 text-muted-foreground", movementDirections.left && "bg-primary/50 text-secondary hover:bg-primary/50 hover:text-secondary border-primary")}
                    onMouseDown={() => setMovementDirections(prev => ({...prev, left: true}))}
                    onMouseUp={() => setMovementDirections(prev => ({...prev, left: false}))}
                    onMouseLeave={() => setMovementDirections(prev => ({...prev, left: false}))}
                >
                    <ArrowLeft className={"size-6"}/>
                </Button>
                <Button
                    variant={"outline"}
                    disabled={isMovementLocked}
                    className={cn("h-10 text-muted-foreground", movementDirections.backwards && "bg-primary/50 text-secondary hover:bg-primary/50 hover:text-secondary border-primary")}
                    onMouseDown={() => setMovementDirections(prev => ({...prev, backwards: true}))}
                    onMouseUp={() => setMovementDirections(prev => ({...prev, backwards: false}))}
                    onMouseLeave={() => setMovementDirections(prev => ({...prev, backwards: false}))}
                >
                    <ArrowDown className={"size-6"}/>
                </Button>
                <Button
                    variant={"outline"}
                    disabled={isMovementLocked}
                    className={cn("h-10 text-muted-foreground", movementDirections.right && "bg-primary/50 text-secondary hover:bg-primary/50 hover:text-secondary border-primary")}
                    onMouseDown={() => setMovementDirections(prev => ({...prev, right: true}))}
                    onMouseUp={() => setMovementDirections(prev => ({...prev, right: false}))}
                    onMouseLeave={() => setMovementDirections(prev => ({...prev, right: false}))}
                >
                    <ArrowRight className={"size-6"}/>
                </Button>
            </div>
            <div>
                <div className={"flex gap-2"}>
                    <button
                        onClick={() => {
                            changeSpeed(roverStatus.speed === "100%" ? "50%" : "100%");
                        }}

                        className={`flex-1 relative h-16 border-2 transition-all hover:bg-primary/20 ${
                            roverStatus.speed === "100%"
                                ? "border-primary bg-primary/10 hover:bg-primary/20"
                                : "border-primary/50 bg-transparent hover:bg-primary/10"
                        }`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-mono font-bold text-primary whitespace-break-spaces">Speed: {roverStatus.speed === "100%" ? "100%" : "50% "}</span>
                        </div>
                        <div
                            className={`absolute top-1 bottom-1 w-1/2 bg-primary/30 transition-transform duration-300 ${
                                roverStatus.speed === "100%" ? "translate-x-[calc(100%-0.2rem)]" : "translate-x-[0.2rem]"
                            }`}
                        />
                    </button>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground text-center mt-2">
                    {isMovementLocked ? "MOVEMENT LOCKED" : "MOVEMENT UNLOCKED"}
                </div>
            </div>
        </div>
    )
}

interface SystemProps {
    enableHumanDetection: (enabled: boolean) => void
    roverStatus: RoverStatusData
}

function System({ enableHumanDetection, roverStatus }: SystemProps) {
    return (
        <div className={"flex flex-col gap-4 col-span-1"}>
            <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>SYSTEM</span>
            <div className={"flex flex-col gap-4 mx-2"}>
                <div className={"grid grid-cols-4 gap-4 items-center"}>
                    <span className={"col-span-3"}>
                        Human_Detection
                    </span>
                    <button
                        onClick={() => {
                            enableHumanDetection(!roverStatus.human_detection);
                        }}

                        className={`flex-1 relative h-10 border-2 transition-all hover:bg-primary/20 ${
                            roverStatus.human_detection
                                ? "border-primary bg-primary/10 hover:bg-primary/20"
                                : "border-primary/50 bg-transparent hover:bg-primary/10"
                        }`}
                    >

                        <div
                            className={`absolute top-1 bottom-1 w-1/2 transition-all duration-300 ${
                                roverStatus.human_detection ? "translate-x-[calc(100%-0.2rem)] bg-primary/80" : "translate-x-[0.2rem] bg-primary/30"
                            }`}
                        />
                    </button>
                </div>
            </div>
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