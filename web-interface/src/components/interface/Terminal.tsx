import Window from "@/components/general/Window.tsx";
import {type FormEvent, useState} from "react";
import {Input} from "@/components/ui/input.tsx";

interface TerminalLine {
    // idk what we need here these are just what i could think of
    type: "input" | "output" | "error" | "warning" | "log";
    content: string;
}

export default function Terminal() {
    const [lines, setLines] = useState<TerminalLine[]>([
        {type: "output", content: "AURORA TERMINAL v0.1"},
        {type: "output", content: "Type 'help' for commands"},
    ]);
    const [input, setInput] = useState<string>("");

    const handleCommand = (inputText: string) => {
        // need this when we actually handle the command
        // const trimmed = inputText.trim().toLowerCase();

        // add input to terminal
        setLines((prevState) => [...prevState, {type: "input", content: `> ${inputText}`}]);

        // this is where we are supposed to handle the command, but for now we just write out stuff to test
        setLines((prevState) => [...prevState, {type: "output", content: "wow you wrote a command, good job!!"}])
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleCommand(input)
        setInput("");
    }

    return (
        <Window title={"TERMINAL"} className={"flex-1 gap-0"}>
            <div className={"flex flex-col h-full"}>
                <div className={"font-mono overflow-y-auto text-xs  p-3 flex-1 max-h-56 scrollbar-thin" +
                    " scrollbar-track-background scrollbar-thumb-primary/50"}>
                    {lines.map((line, i) => (
                        <div key={i} className={
                            // fucked up ternary :sob: TODO: maybe do this better lol, or idk honestly who cares
                            line.type === "input" ? "text-primary" :
                                line.type === "error" ? "text-destructive" :
                                    "text-foreground/80"
                        }>{line.content}</div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className={"p-2 border-t bg-secondary/30"}>
                    <div className={"flex gap-2"}>
                        <span>{">"}</span>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={"Enter command..."}
                            className={"h-7 border-0 focus-visible:ring-0 text-xs font-mono text-foreground" +
                                " placeholder:text-muted-foreground px-0"}
                        />
                    </div>
                </form>
            </div>
        </Window>
    )
}