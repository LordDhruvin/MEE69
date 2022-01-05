import type { Bot, PluginManager } from "../../core";
import type { Command } from "./Command";
import { Args, Lexer, Parser, prefixedStrategy } from "lexure";
import { Message } from "eris";
import {
    Promisable,
    readDirRecursivelyAndCall,
} from "../../core/util";

export class CommandManager implements PluginManager {
    public commands: Set<Command>;
    public prefix = "!";
    readonly id = "CommandManager";

    public constructor(public bot: Bot) {
        this.commands = new Set();
    }

    // This will be replaced by message later on, so we can fetch the prefix here itself.
    public process(raw: string): CommandParseOutput | undefined {
        const lexer = new Lexer(raw).setQuotes([
            ['"', '"'],
            ["“", "”"],
            ["「", "」"],
        ]);
        const matchPrefix = (text: string) =>
            text.startsWith(this.prefix) ? this.prefix.length : null;
        const lout = lexer.lexCommand(matchPrefix);
        console.log(lout);
        if (!lout) return;
        const [possibleCommand, getTokens] = lout;
        // Problem is here
        const command = Array.from(this.commands.values()).find(
            (cmd) => {
                cmd.triggers.includes(possibleCommand.value);
            },
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

    public load(command: Command, _filename: unknown, _emit = true) {
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

    public unload(
        command: Command,
        _filename: unknown,
        _emit = true,
    ) {
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
        this.unload(command, null, false);
        this.load(command, null, false);
        this.bot.emit("CommandManager.COMMAND_RELOADED", command);
    }

    public init() {
        this.bot.on("messageCreate", this.handleMessageCreate);
    }

    public destroy() {
        this.bot.removeListener(
            "messageCreate",
            this.handleMessageCreate,
        );
    }

    public handleMessageCreate = async (msg: Message) => {
        const output = this.process(msg.content);
        console.log(output);
        if (!output) return;
        if (output.command?.condition)
            if (!(await output.command?.condition(this.bot, msg)))
                return;
        await output.command.execute(
            this.bot,
            msg,
            output.args,
            output.largs,
        );
    };

    public async loadFrom(
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) {
        return await readDirRecursivelyAndCall(
            dir,
            filter,
            this.load,
        );
    }

    public async unloadFrom(
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) {
        return await readDirRecursivelyAndCall(
            dir,
            filter,
            this.unload,
        );
    }

    public async reloadFrom(
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) {
        return await readDirRecursivelyAndCall(
            dir,
            filter,
            this.reload,
        );
    }
}

export type CommandParseOutput = {
    command: Command;
    args: string[];
    largs: Args;
};
