import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class extends Command {
    public constructor() {
        super('brawl_command_statistics_profile', {
            aliases: ['profile'],
            args: [
                {
                    id: 'tag',
                    type: 'string',
                    prompt: {
                        start: 'What player tag\'s profile do you want me to show?'
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { tag }: { tag: string}) {
        tag = tag.toUpperCase()
        let tagCanOnlyContain =  ['0', '2', '8', '9', 'P', 'Y', 'L', 'Q', 'G', 'R', 'J', 'C', 'U', 'V']
        tag = tag.replace('O', '0')
        let status
        for(let i = 0; i++; i <= tag.length ) {
            if(tagCanOnlyContain.includes(tag.charAt[i])) status = true
            else {
                status = false
                break
            }
        }
        if(!status) return message.channel.send(`Player Tag is Invalid`)
        else return message.channel.send(`Hello there, this command is still under development.`)
    }
}