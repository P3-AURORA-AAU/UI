import Window from "@/components/general/Window.tsx";

interface Props {
    data: { image: string; } | null;
}

export default function VideoFeed({data}: Props) {
    return (
        <Window title={"VIDEO_FEED"}>
            <div className={"aspect-video"}>
                <VideoPlayer data={data}/>
            </div>
        </Window>
    )
}

function VideoPlayer({data}: Props) {
    if (!data) return <div>No camera feed :c</div>;
    return (
        <div>
            <img src={`data:image/jpeg;base64,${data.image}`} alt={"camera feed"}/>
        </div>
    )
}