import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import SupercellGameStatsUtil from '../../../Helpers/SupercellGameStatsUtil';

//Both commands are very similar ;)
export default class extends Command {
	public constructor() {
		super('brawl_command_statistics_club', {
			aliases: ['club'],
			args: [
				{
					id: 'tag',
					type: 'string',
					prompt: {
						start:
							"What club's profile do you want me to show?(Give me the club's tag)",
					},
				},
			],
			typing: true
		});
	}

	public async exec(message: Message, { tag }: { tag: string }) {
		//All below this will become a custom arguement type, tryng to learn to do that...
		//Looking to do it as a regex that captures only the tag (without the #) and only contains those characters.
		tag = tag.toUpperCase();
		tag = tag.replace('#', '')
		let tagCanOnlyContain = [
			'0',
			'2',
			'8',
			'9',
			'P',
			'Y',
			'L',
			'Q',
			'G',
			'R',
			'J',
			'C',
			'U',
			'V',
		];
		tagCanOnlyContain//I love ts :)
		tag = tag.replace('O', '0');
			let clubStats = await SupercellGameStatsUtil.getClubBrawlStarsStatsById(
				tag
			);
			if (clubStats.status === 400) {
				return message.util?.send(
					`Club not found!\nMost probably the given club tag is incorrect.`
				);
			} else if (clubStats.status === 200 && clubStats.embed) {
				return message.util?.send(clubStats.embed);
			} else {
				return message.util?.send(
					`There is some unknown error with this command.\nMaybe you should try again later.`
				);
			}
	}
}
