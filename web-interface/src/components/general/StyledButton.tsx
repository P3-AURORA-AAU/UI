import * as React from "react";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import type {VariantProps} from "class-variance-authority";

export default function StyledButton({
                                         className,
                                         size,
                                         asChild = false,
                                         ...props
                                     }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}) {
    return (
        <Button
            variant={"outline"}
            size={size}
            asChild={asChild}
            className={cn(className,
                "border-primary/50 hover:border-primary hover:bg-primary/20 hover:text-primary bg-transparent" +
                " active:bg-primary/50 active:text-secondary"
            )}
            {...props}
        >
        </Button>
    )
}