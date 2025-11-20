import {useEffect, useState} from "react";
import {ThemeToggle} from "@/components/interface/ThemeToggle.tsx";
import {cn} from "@/lib/utils.ts";

interface Props {
    isConnected: boolean;
}

export default function Header({isConnected}: Props) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <header className={"border p-3 bg-card/50 backdrop-blur-sm"}>
            <div className={"flex justify-between items-center"}>
                {/*left side, basic info in case you forgot where you are*/}
                <div className={"flex gap-4 items-center"}>
                    <div className={"flex gap-2 items-center"}>
                        <div className={cn(
                            "w-2 h-2 rounded-full animate-pulse",
                            isConnected ? "bg-green-400/50" : "bg-destructive"
                            )}/>
                        <span className={"text-sm text-foreground font-mono"}>{isConnected ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}</span>
                    </div>
                    <div className="h-4 w-px bg-border"/>
                    <h1 className={"font-mono text-primary text-lg tracking-wider"}>AURORA_CONTROL_v0.4</h1>
                </div>

                {/*right side, time because it looks cool idk*/}
                <div className="text-sm font-mono text-muted-foreground items-center flex gap-4">
                    <ThemeToggle/>
                    <div className="h-4 w-px bg-border"/>
                    <p>
                        {currentTime.toLocaleString('dk', {hour12: false}).replace(',', '')}
                    </p>
                </div>
            </div>
        </header>
    )
}