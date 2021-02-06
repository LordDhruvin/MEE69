import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_special_credits', {
			aliases: ['credits', 'credit', 'thanks'],
		});
	}

	public async exec(message: Message) {
		let credits = [
			{
				name: 'StarList',
				desc:
					'Thank them for providing API with additional information on brawl stars commands!',
				message:
					'Use code `starlist` in brawl stars shop to support them!',
				link: `https://starlist.pro/?utm_source=discord&utm_campaign=Dhruvin's%20Bot`,
				imageUrl: 'https://cdn.starlist.pro/front/Star.png',
				color: 0xffc107,
			},
		];

		for (let credit of credits) {
			let embed = this.client.util
				.embed()
				.setThumbnail(credit.imageUrl)
				.setDescription(
					credit.message +
						`\n\n[Check them out here](${credit.link} "${credit.name}")`
				)
				.setAuthor(credit.name, credit.imageUrl, credit.link)
				.setFooter(credit.desc)
				.setColor(credit.color);

			message.util?.send(embed);
		}
	}
}
