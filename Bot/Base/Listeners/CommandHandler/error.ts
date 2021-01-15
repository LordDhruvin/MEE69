import { Command } from "discord-akairo";
import { Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class extends Listener {
    public constructor() {
        super('listener_command_handler_error', {
            emitter: 'CommandHandler',
            event: 'error'
        })
    }

    public async exec(error: Error, message: Message, command: Command) {
        this.client.logger.error(error)
        if(this.client.isOwner(message.author)){
            message.util?.send(this.client.util.embed().addField(`Error`, `\`\`\`prolog\n${error}\`\`\``).addField(`Command`, `${command.id}`).setFooter(message), { split: true })
        }
    }
}