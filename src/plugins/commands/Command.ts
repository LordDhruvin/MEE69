import type { Bot, Plugin } from "../../core";
import type { Message } from "eris";
import { Args } from "lexure";
import type { Promisable } from "../../core/util";

/**
 * The Command Class
 */
export interface Command extends Partial<Plugin> {
  /**
   * The set of words that can trigger this command. Should be an array of strings, even if only 1 string.
   */
  triggers: string[];
  /**
   * If condition is defined, Command only executes when condition is truthy.
   */
  condition?: CommandCondition;
  /**
   * The core part of this command, This function will be run whenever the message matches the any of the triggers and if the condition returns true.
   * @param msg - The message that triggered this Command.
   * @param args - The arguments that were passed with this Command. Should be parsed and converted manually.
   * @param largs - The lexure arguments (non-string) if needed (for use with flags, options, etc.).
   */
  execute: (
    bot: Bot,
    msg: Message,
    args: string[],
    largs: Args,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promisable<any>;
}

export type CommandCondition = (bot: Bot, msg: Message) => Promisable<boolean>;
