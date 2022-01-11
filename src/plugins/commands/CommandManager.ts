import type { Bot, Plugin } from "../../core";
import type { Command } from "./Command";
import { Args, Lexer, Parser, prefixedStrategy } from "lexure";
import type { Message } from "eris";

export class CommandManager implements Plugin {
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
    if (!lout) return;
    const [possibleCommand, getTokens] = lout;
    const command = Array.from(this.commands).find((cmd) => {
      cmd.triggers.includes(possibleCommand.value);
    });
    if (!command) return;
    const pout = new Parser(getTokens())
      .setUnorderedStrategy(prefixedStrategy(["--", "—"], ["=", ":"]))
      .parse();
    const args = new Args(pout);
    return { command, args: Array.from(args), largs: args };
  }

  public load(command: Command, _emit = true) {
    if (this.commands.has(command))
      return this.bot.emit("CommandManager.COMMAND_ALREADY_LOADED", command);

    this.commands.add(command);
    if (_emit) this.bot.emit("CommandManager.COMMAND_LOADED", command);
    return;
  }

  public unload(
    command: Command,

    _emit = true,
  ) {
    if (!this.commands.has(command))
      return this.bot.emit("CommandManager.COMMAND_NOT_LOADED", command);
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
    this.bot.removeListener("messageCreate", this.handleMessageCreate);
  }

  public handleMessageCreate = async (msg: Message) => {
    const output = this.process(msg.content);
    if (!output) return;
    if (output.command?.condition)
      if (!(await output.command?.condition(this.bot, msg))) return;
    await output.command.execute(this.bot, msg, output.args, output.largs);
  };
}

export type CommandParseOutput = {
  command: Command;
  args: string[];
  largs: Args;
};
