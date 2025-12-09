import type {TerminalLine} from "@/components/interface/Terminal.tsx";

export interface CommandOutput {
    lines: TerminalLine[]
}

export interface Command {
    name: string,
    description: string,
    aliases?: string[],
    execute: (prevState: TerminalLine[], args?: string[]) => CommandOutput | Promise<CommandOutput>,
}

export const TerminalCommands: Command[] = [
    {
        name: "help",
        description: "shows available commands",
        aliases: ["h"],
        execute:  (prevState) => ({
            lines: [
                ...prevState,
                {type: "output", content: "Available commands:"},
                ...TerminalCommands.map(command => ({
                        type: "output" as const,
                        content: `  ${command.name} - ${command.description}`,
                    }))
            ]
        })
    },
    {
        // right now the reset is basically just clear but with some output added.
        // however might add stuff later
        name: "reset",
        description: "resets the terminal",
        aliases: ["r"],
        execute: () => ({
            lines: [
                {type: "output", content: "AURORA TERMINAL v1.0"},
                {type: "output", content: "Type 'help' for commands"},
            ]
        })
    },
    {
        name: "clear",
        description: "clears the terminal",
        aliases: ["c"],
        execute: () => ({
            lines: []
        })
    },
    {
        name: "cat",
        description: "prints the contents of a file (or something)",
        execute: (prevState) => ({
            lines: [
                ...prevState,
                {type: "output", content: ""},
                {type: "output", content: "  /\\_/\\  "},
                {type: "output", content: " ( o.o ) "},
                {type: "output", content: "  > ^ <  "},
                {type: "output", content: ""},
            ]
        })
    },
    {
        name: "destination",
        description: "sets the destination for the path finding",
        aliases: ["d", "dest"],
        execute: (prevState, args) => {
            if (!args || args.length < 2) return {lines: prevState.concat({type: "error", content: "Not enough arguments provided"})}
            if (args.length > 2) return {lines: prevState.concat({type: "error", content: "Too many arguments"})}

            return {
                lines: [
                    ...prevState,
                    {type: "output", content: `Destination set to ${args?.join(",") ?? "nothing lol"}`},
                ]
            }
        }
    }
]