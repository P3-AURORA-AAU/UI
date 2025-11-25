import Header from "@/components/interface/Header.tsx";
import VideoFeed from "@/components/interface/VideoFeed.tsx";
import InfoPanel from "@/components/interface/InfoPanel.tsx";
import Terminal from "@/components/interface/Terminal.tsx";
import Control from "@/components/interface/Control.tsx";
import {useRoverWebSocket} from "@/hooks/useRoverWebsockets.ts";

export default function Interface() {
    const {isConnected, cameraData, changeSPeed, moveRover} = useRoverWebSocket();

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
                        <InfoPanel/>
                        <Terminal/>
                    </div>

                    <div className={"col-span-3"}>
                        <Control changeSpeed={changeSPeed} moveRover={moveRover}/>
                    </div>
                </div>
            </div>
        </div>
    )
}