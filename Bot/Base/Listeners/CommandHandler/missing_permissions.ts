import { Command } from "discord-akairo";
import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import permissions from "../../../Data/permissions";

export default class extends Listener {
    public constructor() {
        super('listener_command_handler_missing_permissions', {
            emitter: 'CommandHandler',
            event: 'missingpermissions'
        })
    }

    public async exec(message: Message, command: Command, type: 'client'|'user', missing: any) {
        if(type === 'client') {
            let embed = this.client.util.embed()
            if(typeof(missing) === 'string') {
                embed.addField(`Missing permission`, `I will need the \`${permissions[missing]}\` permission in order to execute the ${command.aliases[0]} Command.`)
            // @ts-ignore I love ts :)
            } else if(typeof(missing) === 'string[]') {
                embed.addField(`Missing permissions`, `I will need ${missing.map((m: string) => `\`${permissions[m]}\``).join(`, `)} permissions in order to execute the ${command.aliases[0]} Command.`)
            }
            message.channel.send(embed)
        }
        if(type === 'user') {
            let embed = this.client.util.embed()
            if(typeof(missing) === 'string') {
                embed.addField(`Missing permission`, `You will need the \`${permissions[missing]}\` permission in order to use the ${command.aliases[0]} Command.`)
            // @ts-ignore I love ts :)
            } else if(typeof(missing) === 'string[]') {
                embed.addField(`Missing permissions`, `You will need ${missing.map((m: string) => `\`${permissions[m]}\``).join(`, `)} permissions in order to use the ${command.aliases[0]} Command.`)
            }
            message.channel.send(embed)
        }
    }
}