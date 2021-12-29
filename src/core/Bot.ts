import type { Plugin } from "./plugins/Plugin";
import type { Promisable } from "./util";
import type { ClientOptions } from "eris";

import { Client } from "eris";
import { on } from "events";

export class Bot extends Client {
    public plugins: Map<string, Plugin>;

    public constructor(token: string, options?: ClientOptions) {
        super(token, options);

        this.plugins = new Map();
    }

    public async waitFor(
        event: string,
        check: (...args: unknown[]) => Promisable<unknown>,
        listener: (...args: unknown[]) => Promisable<unknown>,
    ): Promise<void> {
        for await (const args of on(this, event)) {
            if (await check(...args)) {
                await listener(...args);
                break;
            }
        }
    }

    public async use(plugin: Plugin) {
        if (this.plugins.has(plugin.id)) {
            this.emit(
                "error",
                `Plugin ${plugin.id} is already loaded.`,
                plugin,
            );
            return;
        }
        if ("init" in plugin) await plugin.init(this);
        this.plugins.set(plugin.id, plugin);
    }
}
