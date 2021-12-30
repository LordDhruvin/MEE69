import { Plugin } from "../..";
import type { Message } from "eris";
import { Args } from "lexure";
import { Promisable } from "../../util";

export interface Command extends Plugin {
    triggers: string;
    /**
     * If condition is defined, Command only runs when condition is true.
     */
    condition?: CommandCondition;
    execute: (
        msg: Message,
        args: string[],
        largs: Args,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promisable<any>;
}

export type CommandCondition = (msg: Message) => Promisable<boolean>;
