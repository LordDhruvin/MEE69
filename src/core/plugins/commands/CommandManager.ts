import { Bot } from "../..";
import { Plugin } from "../..";
import { Command } from "./Command";
import { Lexer, Parser, prefixedStrategy, Args } from "lexure";

export class CommandManager implements Plugin {
    public commands: Set<Command>;
    public prefix = "!";
    public id = "CommandManager";

    public constructor(public bot: Bot) {
        this.commands = new Set();
    }

    parse(raw: string): CommandParseOutput | undefined {
        const lexer = new Lexer(raw).setQuotes([
            ['"', '"'],
            ["“", "”"],
            ["「", "」"],
        ]);

        const matchPrefix = (prefix: string) => prefix.length;
        const lout = lexer.lexCommand(matchPrefix);
        if (!lout) return;

        const [possibleCommand, getTokens] = lout;
        const command = Array.from(this.commands).find((cmd) =>
            cmd.triggers.includes(possibleCommand.value),
        );
        if (!command) return;
        const pout = new Parser(getTokens())
            .setUnorderedStrategy(
                prefixedStrategy(["--", "—"], ["=", ":"]),
            )
            .parse();

        const args = new Args(pout);
        return { command, args: Array.from(args), largs: args };
    }

    public load(command: Command, _emit = true) {
        if (this.commands.has(command))
            return this.bot.emit(
                "CommandManager.COMMAND_ALREADY_LOADED",
                command,
            );

        this.commands.add(command);
        if (_emit)
            this.bot.emit("CommandManager.COMMAND_LOADED", command);
        return;
    }

    public unload(command: Command, _emit = true) {
        if (!this.commands.has(command))
            return this.bot.emit(
                "CommandManager.COMMAND_NOT_LOADED",
                command,
            );
        this.commands.delete(command);
        if (_emit) this.bot.emit("CommandManager.COMMAND_UNLOADED");
        return;
    }

    public reload(command: Command) {
        this.unload(command, false);
        this.load(command, false);
        this.bot.emit("CommandManager.COMMAND_RELOADED", command);
    }
}

export type CommandParseOutput = {
    command: Command;
    args: string[];
    largs: Args;
};
