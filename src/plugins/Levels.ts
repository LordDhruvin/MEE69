import { Message, PossiblyUncachedTextableChannel } from "eris";
import type { Bot, Plugin } from "../core";

export class Levels implements Plugin {
    public id = "Levels";
    public bot!: Bot;

    public constructor(dburl: string) {
        // TODO: Use this mongodb url to connect to database.
        console.log(`Database URL: ${dburl}`);
    }

    public init(bot: Bot) {
        this.bot = bot;
        // Connects to database.
    }

    public load() {
        this.bot.on("messageCreate", this.handleMessageCreate);
        // This will also load commands on the bot of this plugin (i.e. !rank, !levels, etc)
    }

    public unload() {
        this.bot.removeListener(
            "messageCreate",
            this.handleMessageCreate,
        );
        // This will also unload commands on the bot of this plugin (i.e. !rank, !levels, etc)
    }

    public reload() {
        this.unload();
        this.load();
        // This will also reload commands on the bot of this plugin (i.e. !rank, !levels, etc)
    }

    private async handleMessageCreate(
        msg: Message<PossiblyUncachedTextableChannel>,
    ) {
        msg;
        // Check if message is command when command system is done.
        // Levels logic
    }

    public async destroy() {
        this.unload();
        // Disconnect from database.
    }
}
