import { Command } from 'discord-akairo'
import { Message, TextChannel } from 'discord.js'
import { Embeds } from 'discord-paginationembed'

export default class extends Command {
    public constructor() {
        super('command_owner_list', {
            aliases: ['list'],
            ownerOnly: true,
            description: {
                short: 'Lists all the commands, listeners and inhibitors',
                visible: false
            },
            args: [
                {
                    id: 'commands',
                    match: 'flag',
                    flag: '--commands'
                },
                {
                    id: 'listeners',
                    match: 'flag',
                    flag: '--listeners'
                },
                {
                    id: 'inhibitors',
                    match: 'flag',
                    flag: '--inhibitors'
                }
            ]
        })
    }

    public async exec(message: Message, { commands, listeners, inhibitors }: { commands: boolean, listeners: boolean, inhibitors: boolean }) {

        let embed1 = this.client.util.embed()
        .setTitle(`${this.client.user?.tag}'s Modules`)
        .addField(`Commands - \`[ ${this.client.CommandHandler.modules.size} ]\``, `${this.client.CommandHandler.modules.map(m => `\`${m.id}\``).join(`\n`)}`)
        .setColor(this.client.baseColor)
        .setThumbnail(this.client.user!.displayAvatarURL({dynamic: true}))

        let embed2 = this.client.util.embed()
        .setTitle(`${this.client.user?.tag}'s Modules`)
        .addField(`Listeners - \`[ ${this.client.ListenerHandler.modules.size} ]\``, `${this.client.ListenerHandler.modules.map(m => `\`${m.id}\``).join(`\n`)}`)
        .setColor(this.client.baseColor)
        .setThumbnail(this.client.user!.displayAvatarURL({dynamic: true}))

        let embed3 = this.client.util.embed()
        .setTitle(`${this.client.user?.tag}'s Modules`)
        .addField(`Inhibitors - \`[ ${this.client.InhibitorHandler.modules.size} ]\``, `${this.client.InhibitorHandler.modules.map(m => `\`${m.id}\``).join(`\n`)}`)
        .setColor(this.client.baseColor)
        .setThumbnail(this.client.user!.displayAvatarURL({dynamic: true}))

        if (commands || listeners || inhibitors) {
            if(commands) {
                return message.util?.send(embed1)
            } else if (listeners) {
                return message.util?.send(embed2)
            } else if (inhibitors) {
                return message.util?.send(embed3)
            }
        } else {
            let users = [this.client.ownerID]
            if(!this.client.isOwner(message.author)) users.push(message.author.id)
            
            let paginator = new Embeds()
            .setArray([embed1, embed2, embed3])
            .setChannel(message.channel as TextChannel)
            // @ts-ignore BRUH What's wrong with ts
            .setAuthorizedUsers(users)
            .setTitle(`${this.client.user?.tag}'s Modules`)
            .setThumbnail(this.client.user!.displayAvatarURL({dynamic: true}))
            .setColor(this.client.baseColor)
            //.setDeleteOnTimeout(true)
            .setNavigationEmojis({
                back: '◀',
                jump: '↗',
                forward: '▶',
                delete: '🗑'
            })
            .setDisabledNavigationEmojis(['delete', 'jump'])
            .setFooter('')
            .setPageIndicator('footer')
            .setTimestamp()
            .setTimeout(2 * 60 * 1000)

            return await paginator.build()
        }
    }
}