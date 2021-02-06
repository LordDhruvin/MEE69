import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import index from '../../../index';
import emojis from '../../../Data/emojis';

export default class extends Command {
	public constructor() {
		super('brawl_command_information_brawler', {
			aliases: ['brawler'],
			args: [
				{
					id: 'brawlername',
					type: 'string',
					match: 'rest',
					prompt: {
						start: 'What brawler?',
					},
				},
			],
		});
	}
	public async exec(
		message: Message,
		{ brawlername }: { brawlername: string }
	) {
		if (!index.starlistapicache) return this.remove(); //Remove the command if the functionality is not enabled.

		if (!index.starlistapicache.is_ready)
			return message.util?.send(
				`Hey, The api utility for this command is not ready yet.\nTry again in a few minutes.`
			);

		let brawler = index.starlistapicache.data.get('brawlers');
		brawler = brawler.list.find((el: any) => el.name === brawlername);

		if (!brawler)
			return message.channel.send(
				`${message.author}, brawler \`${brawlername}\` could not be found.\nCheck the name and try again later.`
			);

		let embed = this.client.util
			.embed()
			.setAuthor(
				`${brawler.name}`,
				brawler['imageUrl3'],
				`${brawler.link}/?utm_source=discord&utm_campaign=Dhruvin%27s%20Bot`
			)
			.setDescription(`\`\`\`\n${brawler.description}\n\`\`\``)
			.addField(
				`Additional Information`,
				`**Rarity:** ${brawler.rarity.name}${
					brawler.unlock
						? `\n**Unlocked at:** ${brawler.unlock}Trophies`
						: ``
				}\n**Class:** ${brawler.class.name}\n`
			)
			.addField(
				`${emojis.bsem2.Gadget}Gadgets`,
				`${brawler.gadgets
					.map(
						(g: any) =>
							`**Name:** ${g.name}\n**Description:** ${g.description}\n**Image Url:** [Click Me](${g.imageUrl})`
					)
					.join(`\n\n`)}`
			)
			.addField(
				`${emojis.bsem2.StarPower}Star Powers`,
				`${brawler.starPowers
					.map(
						(s: any) =>
							`**Name:** ${s.name}\n**Description:** ${s.description}\n**Image Url:** [Click Me](${s.imageUrl})`
					)
					.join(`\n\n`)}`
			)
			.setColor(brawler.rarity.color)
			.setThumbnail(`${brawler.imageUrl}`)
			.setFooter(`Information provided by StarList ❤️`);
		return message.util?.send(embed);
	}
}
