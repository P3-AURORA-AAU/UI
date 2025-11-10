import Window from "@/components/general/Window.tsx";
import ReactPlayer from "react-player";

export default function VideoFeed() {
    return (
        <Window title={"VIDEO_FEED"}>
            <div className={"aspect-video"}>
                <ReactPlayer
                    src="https://www.youtube.com/watch?v=g4uOsS0FsEs"
                    width="100%"
                    height="100%"
                    controls
                />
            </div>
        </Window>
    )
}