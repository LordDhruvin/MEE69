import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import index from '../../../index';

export default class extends Command {
	public constructor() {
		super('brawl_command_information_gamemode', {
			aliases: ['gamemode', 'gamemodes'],
			args: [
				{
					id: 'gm',
					type: 'string',
					match: 'rest',
					prompt: {
						start: 'What gamemode?',
					},
				},
			],
		});
	}

	public async exec(message: Message, { gm }: { gm: string }) {
		//Means it is not setup
		if (!index.starlistapicache) return this.remove();//Remove the command if the functionality is not enabled.

		//Means it isn't cached yet.
		if (!index.starlistapicache.is_ready)
			return message.util?.send(
				`Hey, The api utility for this command is not ready yet.\nTry again in a few minutes.`
			);
		//The actual needed data
		let gamemodes = index.starlistapicache?.data.get('gamemodes');
		gamemodes = gamemodes.list
		let whichOne = gamemodes.find((el: any) => el.name === gm);

		if (!whichOne)
			return message.channel.send(
				`${message.author}, game mode \`${gm}\` could not be found.\nCheck the name and try again later.`
			);
		let embed = this.client.util
			.embed()
			.setAuthor(
				`${whichOne.name}`,
				whichOne.imageUrl,
				`${whichOne.link}/?utm_source=discord&utm_campaign=Dhruvin%27s%20Bot`
			)
			.setImage(whichOne['imageUrl2'])
			.setColor(whichOne.color)
			.setTitle(whichOne.title)
			.setDescription(`\`\`\`\n${whichOne.tutorial}\n\`\`\``)
			.addField('\u200b', `\`\`\`\n${whichOne.description}\n\`\`\``)
			.setFooter(`Information provided by StarList ❤️`);
		return message.util?.send(embed);
	}
}
