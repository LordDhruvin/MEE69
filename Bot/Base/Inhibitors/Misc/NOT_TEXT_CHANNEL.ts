import { Inhibitor } from "discord-akairo";
import { Message } from "discord.js";

export default class extends Inhibitor {
    public constructor() {
        super('inhibitor_misc_not_text_channel', {
            reason: 'NOT_TEXT_CHANNEL',
            priority: 10
        })
    }

    public async exec(message: Message) {
        if(!message.guild) return false
        return !(message.channel.type === 'text')
    }
}