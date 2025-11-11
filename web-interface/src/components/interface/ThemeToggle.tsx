"use client"

import {Moon, AlertTriangle} from "lucide-react"
import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button.tsx";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        // Check localStorage on mount
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
        if (savedTheme) {
            setTheme(savedTheme)
            document.documentElement.classList.toggle("light", savedTheme === "light")
        } else {
            document.documentElement.classList.add("light")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.classList.toggle("light", newTheme === "light")
    }

    return (
        <Button
            variant={"outline"}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            size={"sm"}
        >
            {theme === "dark" ? (
                <>
                    {/*<Sun className="w-4 h-4 text-primary"/>*/}
                    <AlertTriangle className="w-4 h-4 text-primary"/>
                    <span className="text-xs font-mono text-foreground">LIGHT</span>
                </>
            ) : (
                <>
                    <Moon className="w-4 h-4 text-primary"/>
                    <span className="text-xs font-mono text-foreground">DARK</span>
                </>
            )}
        </Button>
    )
}
