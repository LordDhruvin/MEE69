import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import SupercellGameStatsUtil from '../../../Helpers/SupercellGameStatsUtil';

//definetely this code isn't copied
export default class extends Command {
	public constructor() {
		super('brawl_command_statistics_brawlers', {
			aliases: ['brawlers'],
			args: [
				{
					id: 'tag',
					type: 'string',
					prompt: {
						start:
							"What player tag's brawlers do you want me to show?",
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
			let playerBrawlers = await SupercellGameStatsUtil.getPlayerBrawlersById(
				tag
			);
			if (playerBrawlers.status === 400) {
				return message.util?.send(
					`Player not found!\nMost probably the given player tag is incorrect.`
				);
			} else if (playerBrawlers.status === 200 && playerBrawlers.embed) {
				return message.util?.send(playerBrawlers.embed);
			} else {
				return message.util?.send(
					`There is some unknown error with this command.\nMaybe you should try again later.`
				);
			}
	}
}
