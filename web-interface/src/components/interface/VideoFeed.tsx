import Window from "@/components/general/Window.tsx";

interface Props {
    data: { image: string; } | null;
}

export default function VideoFeed({data}: Props) {
    return (
        <Window title={"VIDEO_FEED"} className={"gap-0"}>
            <div className={"aspect-video"}>
                <VideoPlayer data={data}/>
            </div>
        </Window>
    )
}

function VideoPlayer({data}: Props) {
    if (!data) return <div className={"text-center h-full flex flex-col justify-center"}>
        <p className={"text-xl animate-pulse"}>No camera feed :c</p>
    </div>;
    return (
        <div>
            <img src={`data:image/jpeg;base64,${data.image}`} alt={"camera feed"}/>
        </div>
    )
}