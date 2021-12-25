import type { ClientOptions } from "eris";
import { Client } from "eris";
import type { Plugin } from "./plugins/Plugin";

export class Bot extends Client {
    public plugins: Map<string, Plugin>;

    public constructor(token: string, options?: ClientOptions) {
        super(token, options);

        this.plugins = new Map();
    }

    public waitFor(event: string) {
        console.log(event);
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
        await plugin.init(this);
        this.plugins.set(plugin.id, plugin);
    }
}
