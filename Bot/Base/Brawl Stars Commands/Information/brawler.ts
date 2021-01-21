import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import index from '../../../index'

export default class extends Command{
    public constructor() {
        super('brawl_command_information_brawler', {
            aliases: ['brawler'],
            args: [
                {
                    id: 'brawlername',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: 'What brawler?'
                    }
                }
            ]
        })
    }
    public async exec(message: Message, { brawlername }: { brawlername: string }) {
        if(!index.starlistapicache) return undefined

        if(!index.starlistapicache.is_ready) return message.util?.send(`Hey, The api utility for this command is not ready yet.\nTry again in a few minutes.`)

        let brawler = index.starlistapicache.data.get('bralwers')
        brawler = brawler.list.find((el: any) => el.name === brawlername)

        if(!brawler) return message.channel.send(`${message.author}, brawler \`${brawlername}\` could not be found.\nCheck the name and try again later.`)

        let embed = this.client.util.embed()
        .setAuthor(`${brawler.name}`, brawler["imageUrl3"], brawler.link)
        .setDescription(`${brawler.description}`)
        .addField(`Additional Information`, `**Rarity:** ${brawler.rarity.name}${brawler.unlock ? `\n**Unlocked at:** ${brawler.unlock}Trophies` : ``}\n**Class:** ${brawler.class}\n`)
        .addField(`Gadgets`, `${brawler.gadgets.map((g: any) => `**Name:** ${g.name}\n**Description:** ${g.description}\n**Image Url:** [Click Me](${g.imageUrl})`).join(`\n\n`)}`)
        .addField(`Star Powers`, `${brawler.starPowers.map((s: any) => `**Name:** ${s.name}\n**Description:** ${s.description}\n**Image Url:** [Click Me](${s.imageUrl})`).join(`\n\n`)}`)
        .setColor(brawler.rarity.color)
        .setThumbnail(`${brawler.imageUrl}`)
        .setFooter(`Information provided by StarList ❤️`)
        return message.util?.send(embed)
        
    }
}