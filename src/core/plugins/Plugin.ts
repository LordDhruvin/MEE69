/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Bot } from "..";
import type { Promisable } from "../util";

/* @note - I cannot use unknown here or it gives errors, same with never so I am being forced to use any. */
export interface Plugin {
    id: string;
    init?: (bot: Bot) => Promisable<any>;
    load: (...args: any[]) => Promisable<any>;
    reload: (...args: any[]) => Promisable<any>;
    unload: (...args: any[]) => Promisable<any>;
    destroy?: (...args: any[]) => Promisable<any>;
}
