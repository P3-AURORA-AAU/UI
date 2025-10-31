import type {TerminalLine} from "@/components/interface/Terminal.tsx";

export interface CommandOutput {
    lines: TerminalLine[]
}

export interface Command {
    name: string,
    description: string,
    aliases?: string[],
    execute: (args?: string[]) => CommandOutput | Promise<CommandOutput>,
}

export const TerminalCommands: Command[] = [
    {
        name: "help",
        description: "shows available commands",
        aliases: ["h"],
        execute:  () => ({
            lines: [
                {type: "output", content: "Available commands:"},
                ...TerminalCommands.map(command => ({
                        type: "output" as const,
                        content: `  ${command.name} - ${command.description}`,
                    }))
            ]
        })
    }
]