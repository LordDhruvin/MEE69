import { Command } from "discord-akairo";
import { Message } from "discord.js";
import index from '../../../index'

export default class extends Command {
    public constructor() {
        super('command_brawl_stars_events', {})
    }

    public async exec(message: Message) {
        //Means it is not setup
        if(!index.starlistapicache) return undefined

        //Means it isn't cached yet.
        if(!index.starlistapicache.is_ready) return message.util?.send(`Hey, The api utility for this command is not ready yet.\nTry again in a few minutes.`)
        
        //The actual needed data
        let events = index.starlistapicache?.data.get('events')

        //Needs work. IDK what is that json and hence i can't do rn + i bet i will need a paginator
        let embed = this.client.util.embed()
        .setDescription(events)

        return message.util?.send(embed)
    }
}