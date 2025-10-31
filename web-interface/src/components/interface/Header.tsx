import {useEffect, useState} from "react";
import {ThemeToggle} from "@/components/interface/ThemeToggle.tsx";

export default function Header() {
    const [currentTime, setCurrentTime] = useState(new Date())

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
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
                        <span className={"text-sm text-foreground font-mono"}>SYSTEM ONLINE</span>
                    </div>
                    <div className="h-4 w-px bg-border"/>
                    <h1 className={"font-mono text-primary text-lg tracking-wider"}>AURORA_CONTROL_v0.3</h1>
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