import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import SupercellGameStatsUtil from '../../../Helpers/SupercellGameStatsUtil';

export default class extends Command {
	public constructor() {
		super('brawl_command_statistics_profile', {
			aliases: ['profile'],
			args: [
				{
					id: 'tag',
					type: 'string',
					prompt: {
						start:
							"What player tag's profile do you want me to show?",
					},
				},
			],
		});
	}

	public async exec(message: Message, { tag }: { tag: string }) {
		//All below this will become a custom arguement type, tryng to learn to do that...
		tag = tag.toUpperCase();
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
		tag = tag.replace('O', '0');
		let status;
		for (let i = 0; i++; i <= tag.length) {
			if (tagCanOnlyContain.includes(tag.charAt[i])) status = true;
			else {
				status = false;
				break;
			}
		}
		if (!status) return message.channel.send(`Player Tag is Invalid`);
		else {
			let playerStats = await SupercellGameStatsUtil.getPlayerBrawlStarsStats(
				tag
			);
			if (playerStats.status === 400) {
				return message.channel.send(
					`Looks like the player tag isn't correct`
				);
			} else if (playerStats.status === 200 && playerStats.embed) {
				return message.channel.send(playerStats.embed);
			} else {
				return message.channel.send(
					`There is some unknown error with this command.\nMaybe you should try again later.`
				);
			}
		}
	}
}
