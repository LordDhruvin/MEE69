import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import index from '../../../index';

export default class extends Command {
	public constructor() {
		super('brawl_command_infomation_map', {
			aliases: ['map'],
			args: [
				{
					id: 'mapname',
					type: 'string',
					match: 'content',
					prompt: {
						start: 'What map?',
					},
				},
			],
		});
	}

	public async exec(message: Message, { mapname }: { mapname: string }) {
		if (!index.starlistapicache) return  this.remove();

		if (!index.starlistapicache.is_ready)
			return message.util?.send(
				`Hey, The api utility for this command is not ready yet.\nTry again in a few minutes.`
			);

		let map = index.starlistapicache?.data.get('maps');
		map = map.list.find((el: any) => el.name === mapname);
		if (!map)
			return message.channel.send(
				`${message.author}, map \`${mapname}\` could not be found.\nCheck the name and try again later.`
			);
		let embed = this.client.util
			.embed()
			.setAuthor(
				`${map.name}`,
				map.gameMode.imageUrl,
				`${map.link}/?utm_source=discord&utm_campaign=Dhruvin%27s%20Bot`
			)
			.setDescription(
				`**Gamemode:** [${map.gameMode.name}](${
					`${map.gameMode.link}/?utm_source=discord&utm_campaign=Dhruvin%27s%20Bot`
				})\n**Environment:** [${map.environment.name}](${
					map.environment.imageUrl
				})`
			)
			.setImage(`${map.imageUrl}`)
			.setColor(map.gameMode.color)
			.setFooter(`Information provided by StarList ❤️`);
		return message.util?.send(embed);
	}
}
