import {Card} from "@/components/ui/card.tsx";
import * as React from "react";
import {cn} from "@/lib/utils.ts";
import {type JSX, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Minus, Plus} from "lucide-react";

export default function Window({
                                   className,
                                   title,
                                    enabledByDefault = true,
                                   ...props
                               }: React.ComponentProps<"div"> & { title?: string, enabledByDefault?: boolean }): JSX.Element {
    const [enabled, setEnabled] = useState(enabledByDefault)

    return (
        <Card className={cn(
            "p-0 flex flex-col transition-all duration-300",
            enabled ? "flex-1 gap-6" : "gap-0",
            className
        )}>
            {/*header stuff*/}
            <div className={"border-b p-2 flex items-center justify-between gap-2 bg-secondary/30 px-3"}>
                <div className={"flex items-center gap-2"}>
                    <div className={cn(
                        "w-1.5 h-1.5 rounded-full animate-pulse transition-all duration-300",
                        enabled ? "bg-primary" : "bg-destructive"
                    )}/>
                    <span className={cn(
                        "font-mono text-xs text-foreground transition-all duration-300",
                        enabled ? "text-foregroun" : "text-muted-foreground"
                    )}>{title}</span>
                </div>
                <Button className={"h-4"} variant={"ghost"} size={"sm"} onClick={() => setEnabled(!enabled)}>
                    { enabled ? <Minus /> : <Plus />}
                </Button>
            </div>

            <div
                className={cn(
                    "grid transition-all duration-300 overflow-hidden",
                    enabled ? "grid-rows-[1fr] flex-1" : "grid-rows-[0fr]"
                )}
            >
                <div className="min-h-0" {...props}>
                </div>
            </div>
        </Card>
    )
}