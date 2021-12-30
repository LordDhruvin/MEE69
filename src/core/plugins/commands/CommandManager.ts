import type { Bot } from "../..";
import type { PluginManager } from "../..";
import type { Command } from "./Command";
import { Lexer, Parser, prefixedStrategy, Args } from "lexure";
import { Message } from "eris";
import { Promisable, readDirRecursivelyAndCall } from "../../util";

export class CommandManager implements PluginManager {
    public commands: Set<Command>;
    public prefix = "!";
    readonly id = "CommandManager";

    public constructor(public bot: Bot) {
        this.commands = new Set();
    }

    // This will be replaced by message later on so we can fetch the prefix here itself.
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

    public init() {
        this.bot.on("messageCreate", this.handleMessageCreate);
    }

    public destroy() {
        this.bot.removeListener(
            "messageCreate",
            this.handleMessageCreate,
        );
    }

    public async handleMessageCreate(msg: Message) {
        const parsed = this.parse(msg.content);
        if (!parsed) return;
        if (parsed.command?.condition)
            if (!(await parsed.command?.condition(msg))) return;
        await parsed.command.execute(msg, parsed.args, parsed.largs);
    }

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
