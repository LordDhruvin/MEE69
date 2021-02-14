import { Command } from "discord-akairo";
import { Message } from "discord.js";
import fetch from "node-fetch";

export default class extends Command {
    public constructor() {
        super('command_fun_reddit', {
            aliases: ['reddit'],
            cooldown: 5e4,
            args: [
                {
                    id: 'reddit',
                    type: 'string',
                    prompt: {
                        start: `Which subreddit?`
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { reddit }: { reddit: string}) {
        //Reddit is just too hard, if someone good with working on this or has a wrapper, contact me.
        let bluedditres = await fetch(`https://www.reddit.com/r/${reddit}/random/.json`)
        let blueddit = await bluedditres.json()
        let greenddit = blueddit[0].data.children[0]
        if(bluedditres.status === 200) {
        let embed = this.client.util.embed()
        .setTitle(`${greenddit.data.title}`)
        .setDescription(`${greenddit.data.selftext || '\u200b'}`)
        .setURL(`https://www.reddit.com${greenddit.data.permalink}`)//This EXISTSS??????????
        .setFooter(`👍 ${greenddit.data.ups} 💬 ${greenddit.data.num_comments}`)
        .setColor("RED")
        greenddit.data.thumbnail ? embed.setImage(greenddit.data.thumbnail) : null //add image if exists

        return message.util?.send(embed)
        } else if(bluedditres.status === 400){
            return message.util?.send(`You fool that is not a valid subreddit!!!`)
        } else {
            return message.util?.send(`There is some unknown error with this command.\nMaybe you should try again later.`)
        }
    }
}
