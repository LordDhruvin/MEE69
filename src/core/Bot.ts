import type { Promisable } from "./util";
import type { ClientOptions } from "eris";
import { Client } from "eris";
import { on } from "events";
import { CommandManager, ListenerManager } from "../plugins";
import { Logger } from "./Logger";

export class Bot extends Client {
    public logger: Logger;
    public listenerManager: ListenerManager;
    public commandManager: CommandManager;

    public constructor(token: string, options?: ClientOptions) {
        super(token, options);

        this.logger = Logger;

        this.listenerManager = new ListenerManager(this);
        this.commandManager = new CommandManager(this);
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
}
