import Window from "@/components/general/Window.tsx";
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CircleQuestionMark, Lock, Unlock} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";
import type {MoveData, RoverStatusData} from "@/hooks/useRoverWebsockets.ts";

interface Props {
    moveRover: (moveData: MoveData) => void;
    roverStatus: RoverStatusData;
    enableHumanDetection: (enabled: boolean) => void;
    enableAutonomousDriving: (enabled: boolean) => void;
}

export default function Control(props: Props) {
  const [manualMovementLock, setManualMovementLock] = useState(false);

  // Auto driving should always lock movement (override manual)
  const movementLocked = manualMovementLock || props.roverStatus.auto_driving;

  return (
    <Window title={"CONTROL_INTERFACE"}>
      <div className={"h-60"}>
        <div className={"grid grid-cols-4 gap-4 px-4 h-full"}>
          <Movement
            {...props}
            movementLocked={movementLocked}
            manualMovementLock={manualMovementLock}
            setManualMovementLock={setManualMovementLock}
          />
          <System
            enableHumanDetection={props.enableHumanDetection}
            enableAutonomousDriving={props.enableAutonomousDriving}
            roverStatus={props.roverStatus}
          />
          <ExpansionModules />
        </div>
      </div>
    </Window>
  );
}


function Movement({
  moveRover,
  roverStatus,
  movementLocked,
  manualMovementLock,
  setManualMovementLock,
}: Props & {
  movementLocked: boolean;
  manualMovementLock: boolean;
  setManualMovementLock: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  interface MovementDirectionsState {
    forward: boolean;
    backwards: boolean;
    left: boolean;
    right: boolean;
  }

  const [movementDirections, setMovementDirections] =
    useState<MovementDirectionsState>({
      forward: false,
      backwards: false,
      left: false,
      right: false,
    });

  function getDirectionString(d: MovementDirectionsState) {
    let s = "";

    if (!(d.forward && d.backwards)) {
      if (d.forward) s += "forward";
      if (d.backwards) s += "backwards";
    }

    if (!(d.left && d.right)) {
      if (d.left) s += s ? "_left" : "left";
      if (d.right) s += s ? "_right" : "right";
    }

    return s || "none";
  }

  useEffect(() => {
    if (movementLocked) return;
    moveRover({ direction: getDirectionString(movementDirections) });
  }, [movementDirections, movementLocked, moveRover]);

  useEffect(() => {
    if (!movementLocked) return;

    setMovementDirections({
      forward: false,
      backwards: false,
      left: false,
      right: false,
    });

    moveRover({ direction: "none" });
  }, [movementLocked, moveRover]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (movementLocked) return;

      const key = e.key.toLowerCase();
      switch (key) {
        case "w":
        case "arrowup":
          setMovementDirections((prev) => ({ ...prev, forward: true }));
	  console.log("uwu");
          break;
        case "s":
        case "arrowdown":
          setMovementDirections((prev) => ({ ...prev, backwards: true }));
          break;
        case "a":
        case "arrowleft":
          setMovementDirections((prev) => ({ ...prev, left: true }));
          break;
        case "d":
        case "arrowright":
          setMovementDirections((prev) => ({ ...prev, right: true }));
          break;
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      switch (key) {
        case "w":
        case "arrowup":
          setMovementDirections((prev) => ({ ...prev, forward: false }));
          break;
        case "s":
        case "arrowdown":
          setMovementDirections((prev) => ({ ...prev, backwards: false }));
          break;
        case "a":
        case "arrowleft":
          setMovementDirections((prev) => ({ ...prev, left: false }));
          break;
        case "d":
        case "arrowright":
          setMovementDirections((prev) => ({ ...prev, right: false }));
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [movementLocked]);

  return (
    <div className={"flex flex-col gap-4 justify-between pb-4"}>
      <span className={"text-xs font-mono text-muted-foreground border-b p-1"}>
        MOVEMENT
      </span>

      <div className={"grid grid-cols-3 gap-1.5"}>
        <Button
          variant={"outline"}
          disabled={movementLocked}
          className={"h-10 text-muted-foreground"}
        >
          <CircleQuestionMark className={"size-6"} />
        </Button>

        <Button
          variant={"outline"}
          disabled={movementLocked}
          className={cn(
            "h-10 text-muted-foreground",
            movementDirections.forward &&
              "bg-primary/50 text-secondary hover:bg-primary/50 hover:text-secondary border-primary"
          )}
          onMouseDown={() => setMovementDirections((p) => ({ ...p, forward: true }))}
          onMouseUp={() => setMovementDirections((p) => ({ ...p, forward: false }))}
          onMouseLeave={() => setMovementDirections((p) => ({ ...p, forward: false }))}
        >
          <ArrowUp className={"size-6"} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`h-10 w-auto shrink-0 transition-all ${
            movementLocked
              ? "border-destructive bg-destructive/20 text-destructive/70 hover:text-destructive hover:bg-destructive/30 hover:border-destructive active:hover:bg-destructive/50"
              : ""
          }`}
          onClick={() => setManualMovementLock((v) => !v)}
          disabled={roverStatus.auto_driving}
          title={roverStatus.auto_driving ? "Locked by auto driving" : "Toggle manual lock"}
        >
          {movementLocked ? <Lock className="h-6 w-6" /> : <Unlock className="h-6 w-6" />}
        </Button>

        <Button
          variant={"outline"}
          disabled={movementLocked}
          className={cn(
            "h-10 text-muted-foreground",
            movementDirections.left &&
              "bg-primary/50 text-secondary hover:bg-primary/50 hover:text-secondary border-primary"
          )}
          onMouseDown={() => setMovementDirections((p) => ({ ...p, left: true }))}
          onMouseUp={() => setMovementDirections((p) => ({ ...p, left: false }))}
          onMouseLeave={() => setMovementDirections((p) => ({ ...p, left: false }))}
        >
          <ArrowLeft className={"size-6"} />
        </Button>

        <Button
          variant={"outline"}
          disabled={movementLocked}
          className={cn(
            "h-10 text-muted-foreground",
            movementDirections.backwards &&
              "bg-primary/50 text-secondary hover:bg-primary/50 hover:text-secondary border-primary"
          )}
          onMouseDown={() => setMovementDirections((p) => ({ ...p, backwards: true }))}
          onMouseUp={() => setMovementDirections((p) => ({ ...p, backwards: false }))}
          onMouseLeave={() => setMovementDirections((p) => ({ ...p, backwards: false }))}
        >
          <ArrowDown className={"size-6"} />
        </Button>

        <Button
          variant={"outline"}
          disabled={movementLocked}
          className={cn(
            "h-10 text-muted-foreground",
            movementDirections.right &&
              "bg-primary/50 text-secondary hover:bg-primary/50 hover:text-secondary border-primary"
          )}
          onMouseDown={() => setMovementDirections((p) => ({ ...p, right: true }))}
          onMouseUp={() => setMovementDirections((p) => ({ ...p, right: false }))}
          onMouseLeave={() => setMovementDirections((p) => ({ ...p, right: false }))}
        >
          <ArrowRight className={"size-6"} />
        </Button>
      </div>

      <div className="text-[10px] font-mono text-muted-foreground text-center mt-2">
        {movementLocked ? "MOVEMENT LOCKED" : "MOVEMENT UNLOCKED"}
      </div>
    </div>
  );
}


interface SystemProps {
    enableHumanDetection: (enabled: boolean) => void
    enableAutonomousDriving: (enabled: boolean) => void
    roverStatus: RoverStatusData
}

function System({ enableHumanDetection, enableAutonomousDriving, roverStatus}: SystemProps) {
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
                <div className={"grid grid-cols-4 gap-4 items-center"}>
                    <span className={"col-span-3"}>
                        Autonomous_Driving
                    </span>
                    <button
                        onClick={() => enableAutonomousDriving(!roverStatus.auto_driving)}
                        className={`flex-1 relative h-10 border-2 transition-all hover:bg-primary/20 ${
                            roverStatus.auto_driving
                            ? "border-primary bg-primary/10 hover:bg-primary/20"
                            : "border-primary/50 bg-transparent hover:bg-primary/10"
                        }`}
                        >
                        <div
                            className={`absolute top-1 bottom-1 w-1/2 transition-all duration-300 ${
                            roverStatus.auto_driving
                                ? "translate-x-[calc(100%-0.2rem)] bg-primary/80"
                                : "translate-x-[0.2rem] bg-primary/30"
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
