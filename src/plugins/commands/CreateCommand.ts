import { Command } from "./Command";

/**
 * A utility function for easily creating commands.
 * @constructor
 * @param triggers - The set of words that can trigger this command.
 * @param execute - The function which will be run whenever a message matches triggers and if it passes the condition.
 * @param condition - The condition for this command, Command will only run if this is truthy.
 * @param otherProps - The other props for this command.
 */
export function CreateCommand(
  triggers: Command["triggers"],
  execute: Command["execute"],
  condition?: Command["condition"],
  otherProps?: Omit<Command, "triggers" | "execute" | "condition">,
): Command {
  const res: Command = { triggers, execute };
  if (condition) res.condition = condition;
  return Object.assign(otherProps, res);
}
