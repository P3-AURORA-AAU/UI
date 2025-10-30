import {Card} from "@/components/ui/card.tsx";
import * as React from "react";
import {cn} from "@/lib/utils.ts";
import type {JSX} from "react";

export default function Window({
                                   className,
                                   title,
                                   ...props
                               }: React.ComponentProps<"div"> & { title?: string }): JSX.Element {
    return (
        <Card className={cn("p-0", className)}>
            {/*header stuff*/}
            <div className={"border-b p-2 flex items-center gap-2 bg-secondary/30 px-3"}>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"/>
                <span className={"font-mono text-xs text-foreground"}>{title}</span>
            </div>

            <div {...props}>
            </div>
        </Card>
    )
}