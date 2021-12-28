import type { Bot } from "..";
import type { Promisable } from "../util";

export interface Plugin {
    id: string;
    init?: (bot: Bot) => Promisable<unknown>;
    load: () => Promisable<unknown>;
    reload: () => Promisable<unknown>;
    unload: () => Promisable<unknown>;
    destroy?: () => Promisable<unknown>;
}
