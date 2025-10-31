import Interface from "@/components/Interface.tsx";

function App() {

    return (
        <div className={"h-screen w-screen p-4 bg-background"}>
            <div className={"container mx-auto space-y-4"}>
                <Header/>
                <div className={"grid grid-cols-3 gap-4"}>
                    {/*left column*/}
                    <div className={"col-span-2 space-y-4"}>
                        <VideoFeed/>
                    </div>

                    {/*right column*/}
                    <div className={"space-y-4 flex flex-col "}>
                        <InfoPanel/>
                        <Terminal/>
                    </div>

                    <div className={"col-span-3"}>
                        <Control/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App