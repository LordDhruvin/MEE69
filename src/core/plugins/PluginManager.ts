import type { Plugin } from "./Plugin";
import type { Promisable } from "../util";

export interface PluginManager extends Plugin {
    loadFrom: (
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) => Promisable<boolean>;
    reloadFrom: (
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) => Promisable<boolean>;
    unloadFrom: (
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) => Promisable<boolean>;
}
