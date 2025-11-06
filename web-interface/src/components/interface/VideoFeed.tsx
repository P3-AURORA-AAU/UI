import Window from "@/components/general/Window.tsx";
import videojs from "video.js";
import "video.js/dist/video-js.css";



export default function VideoFeed() {
    return (
        <Window title={"VIDEO_FEED"}>
            <div className={"aspect-video"}>
                <video
                    id="my_player"
                    class="video-js vjs-default-skin"
                    controls
                    preload="auto"
                    data-setup="{}">
                    <source src="https://www.youtube.com/watch?v=g4uOsS0FsEs" type="video/mp4" />
                    Your browser failed
                </video>

                <script src="https://vjs.zencdn.net/8.6.1/video.min.js"></script>
                <script>
                    var player = videojs('my_player')
                </script>
            </div>
        </Window>
    )
}