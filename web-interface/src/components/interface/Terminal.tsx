import Window from "@/components/general/Window.tsx";
import {type FormEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {TerminalCommands} from "@/lib/commands.ts";

export interface TerminalLine {
    // idk what we need here these are just what i could think of
    type: "input" | "output" | "error" | "warning" | "log";
    content: string;
}

// for calling commands from outside the terminal
export interface TerminalRef {
    executeCommand: (command: string, showInput?: boolean) => Promise<void>;
}

export default forwardRef<TerminalRef>(function Terminal(_, ref) {
    const [lines, setLines] = useState<TerminalLine[]>([
        {type: "output", content: "AURORA TERMINAL v1.3"},
        {type: "output", content: "Type 'help' for commands"},
    ]);
    const [input, setInput] = useState<string>("");
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [lines])

    const handleCommand = async (inputText: string, showInput: boolean = true) => {
        if (inputText.trim() === "") return;
        const parsedCommand = inputText.trim().toLowerCase().split(" ");
        const commandText = parsedCommand[0];
        const args = parsedCommand.slice(1);

        // add input to terminal
        const lineWithInput: TerminalLine[] = showInput
            ? [...lines, {type: "input", content: `> ${inputText}`}]
            : lines;
        setLines(lineWithInput);

        // check if command exists
        const command = TerminalCommands.find(command => (
            command.name === commandText || command.aliases?.includes(commandText)
        ))

        if (!command) {
            setLines((prevState) => [...prevState, {type: "error", content: "Command not found"}]);
            return;
        }

        const commandResult = command.execute(lineWithInput, args)
        let output: TerminalLine[]
        // wait if promise
        if (commandResult instanceof Promise) {
            output = (await commandResult).lines
        } else {
            output = commandResult.lines
        }


        setLines(output)

    }

    // expose handleCommand via ref to allow external command execution
    useImperativeHandle(ref, () => ({
        executeCommand: handleCommand
    }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setInput("");
        await handleCommand(input)
    }

    return (
        <div className={"flex-1 flex flex-col"}>
            <Window title={"TERMINAL"} className={"gap-0"}>
                <div className={"flex flex-col h-full"}>
                    <div ref={scrollRef} className={"font-mono overflow-y-auto text-xs  p-3 flex-1 max-h-56 scrollbar-thin min-h-48" +
                        " scrollbar-track-background scrollbar-thumb-primary/50"}>
                        {lines.map((line, i) => (
                            <div key={i} className={
                                // fucked up ternary :sob: TODO: maybe do this better lol, or idk honestly who cares
                                line.type === "input" ? "text-primary" :
                                    line.type === "error" ? "text-destructive" :
                                        "text-foreground/80 whitespace-break-spaces"
                            }>{line.content}</div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className={"py-2 px-4 border-t bg-secondary/30"}>
                        <div className={"flex gap-2"}>
                            <span className={"pt-[3px]"}>{">"}</span>
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={"Enter command..."}
                                className={"h-7 border-0 focus-visible:ring-0 text-xs font-mono text-foreground" +
                                    " placeholder:text-muted-foreground px-0 pb-0 pt-1"}
                            />
                        </div>
                    </form>
                </div>
            </Window>
        </div>
    )
});