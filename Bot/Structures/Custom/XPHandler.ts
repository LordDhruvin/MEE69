import { MongooseProvider } from "discord-akairo";
import { Message } from "discord.js";
import { EventEmitter } from "events";

class XPHandler extends EventEmitter {//Will do the rest later.

    /**
     * The class XP handler.
     * @param mdb Member Database.
     */
    public constructor(mdb: MongooseProvider) {
        super()

        this.mdb = mdb
    }

    private mdb: MongooseProvider

    /**
     * Gives a user xp takes care of some checks but it is recommended to do it yourself
     * @param message The message that triggered this
     * @param multi The XP multiplier
     * @param prefix The prefix for this server
     * @param perMessageXP The xp to be given each message.
     * @param neededXP The needed XP (formula = neededXP * NextLevel)
     */
    public async giveXP(message: Message, multi = 1, prefix: string,perMessageMinXP: number, perMessageMaxXP: number, neededXP: number) {
        if(message.content.startsWith(prefix)||message.content.startsWith(`<@!${message.client.user?.id}>`)||message.content.startsWith(`<@${message.client.user?.id}>`)||!message.guild) return
        else {
            let member = message.member
            let gainedXP = Math.ceil(Math.floor(Math.random() * (perMessageMaxXP - perMessageMinXP + 1) ) + perMessageMinXP)
        }
    }
}