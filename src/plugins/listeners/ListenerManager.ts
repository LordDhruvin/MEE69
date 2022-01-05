import { PluginManager } from "../../core";
import { Bot } from "../../core";
import { readDirRecursivelyAndCall, Promisable } from "../../core/util";

export class ListenerManager implements PluginManager {
    public readonly id = "ListenerManager";

    public listeners: Map<string, AnyListener>;

    public constructor(public bot: Bot) {
        this.listeners = new Map();
    }

    // init and destroy are promises solely so that they don't mess up refresh.
    public async init() {
        this.listeners.forEach((value, key) =>
            this.bot.on(key, value),
        );
    }

    public async destroy() {
        this.listeners.forEach((value, key) =>
            this.bot.removeListener(key, value),
        );
    }

    public async refresh() {
        await this.destroy();
        await this.init();
    }

    load(listener: AnyListener, filename: string, _emit = true) {
        if (this.listeners.has(filename))
            return this.bot.emit(
                "ListenerManager.LISTENER_ALREADY_LOADED",
                filename,
                listener,
            );
        this.listeners.set(filename, listener);
        if (_emit)
            this.bot.emit(
                "ListenerManager.LISTENER_LOADED",
                filename,
                listener,
            );
        return;
    }

    public async loadFrom(
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) {
        return await readDirRecursivelyAndCall(
            dir,
            filter,
            this.load,
        );
    }

    reload(listener: AnyListener, filename: string) {
        this.unload(listener, filename, false);
        this.load(listener, filename, false);
        this.bot.emit(
            "CommandManager.COMMAND_RELOADED",
            filename,
            listener,
        );
        return;
    }

    public async reloadFrom(
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) {
        return await readDirRecursivelyAndCall(
            dir,
            filter,
            this.reload,
        );
    }

    unload(listener: AnyListener, filename: string, _emit = true) {
        if (this.listeners.has(filename))
            return this.bot.emit(
                "ListenerManager.LISTENER_NOT_LOADED",
                filename,
                listener,
            );
        this.listeners.delete(filename);
        if (_emit)
            this.bot.emit(
                "ListenerManager.LISTENER_UNLOADED",
                filename,
                listener,
            );
        return;
    }

    public async unloadFrom(
        dir: string,
        filter: (file: string) => Promisable<boolean>,
    ) {
        return await readDirRecursivelyAndCall(
            dir,
            filter,
            this.unload,
        );
    }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type AnyListener = (...args: any) => Promisable<any>;
