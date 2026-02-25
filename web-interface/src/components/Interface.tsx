import Header from "@/components/interface/Header.tsx";
import VideoFeed from "@/components/interface/VideoFeed.tsx";
import Terminal, {type TerminalRef} from "@/components/interface/Terminal.tsx";
import Control from "@/components/interface/Control.tsx";
import {useRoverWebSocket} from "@/hooks/useRoverWebsockets.ts";
import PathVisualizer, {type PathData} from "@/components/interface/PathVisualizer.tsx";
import {useRef} from "react";

export default function Interface() {
    const terminalRef = useRef<TerminalRef>(null);
    const {isConnected, cameraData, pathData, roverStatus, moveRover, enableHumanDetection, enableAutonomousDriving} = useRoverWebSocket();
    
    // const testPathData: PathData = {
    //     grid: [
    //         [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    //         [0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    //         [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    //         [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    //         [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    //         [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    //         [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    //         [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    //         [1, 0, 0, 1, 0, 1, 0, 0, 0, 0]
    //     ],
    //     path: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2], [4, 2], [4, 3], [4, 4]],
    //     start: [0, 0],
    //     destination: [4, 4]
    // }

    return (
        <div className={"h-screen w-screen p-4 bg-background grid-pattern"}>
            <div className={"container mx-auto space-y-4"}>
                <Header isConnected={isConnected}/>
                <div className={"grid grid-cols-3 gap-4"}>
                    {/*left column*/}
                    <div className={"col-span-2 space-y-4"}>
                        <VideoFeed data={cameraData}/>
                    </div>

                    {/*right column*/}
                    <div className={"space-y-4 grid grid-flow-col grid-rows-2"}>
                        <PathVisualizer data={pathData} terminalRef={terminalRef}/>
                        <Terminal ref={terminalRef}/>
                    </div>

                    <div className={"col-span-3"}>
                        <Control moveRover={moveRover} roverStatus={roverStatus} enableHumanDetection={enableHumanDetection} enableAutonomousDriving={enableAutonomousDriving}/>
                    </div>
                </div>
            </div>
        </div>
    )
}