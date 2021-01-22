import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import index from '../../../index';

export default class extends Command {
	public constructor() {
		super('brawl_command_information_events', {
			aliases: ['events'],
		});
	}

	public async exec(message: Message) {
		//Means it is not setup
		if (!index.starlistapicache) return undefined;

		//Means it isn't cached yet.
		if (!index.starlistapicache.is_ready)
			return message.util?.send(
				`Hey, The api utility for this command is not ready yet.\nTry again in a few minutes.`
			);
		let embed = this.client.util
			.embed()
			.setFooter(`Information provided by StarList ❤️`);
		//The actual needed data
		let events = index.starlistapicache?.data.get('events');
		for (let event of events.active) {
			embed.addField(
				`${event.map.name}`,
				`[Map Link](${event.map.link})\n[${event.map.gameMode.name}](${event.map.gameMode.link})`
			);
		}

		return message.util?.send(embed);
	}
}
