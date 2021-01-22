import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import index from '../../../index';
import moment from 'moment';

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
		//The actual needed data
		let events = index.starlistapicache?.data.get('events');
		for (let event of events.active) {
			let embed = this.client.util
				.embed()
				.setFooter(`Information provided by StarList ❤️`)
				.setAuthor(
					`${event.map.name}`,
					event.map.gameMode.imageUrl,
					event.map.link.startWith('/') ? `${event.map.link}?utm_source=discord&utm_campaign=Dhruvin%27s%20Bot` : `${event.map.link}/?utm_source=discord&utm_campaign=Dhruvin%27s%20Bot`
				)
				.setDescription(
					`**Ends in:** ${moment(
						new Date(event.endTime)
					)}\n**Environment:** ${event.map.environment.name}`
				)
				.setThumbnail(event.map.imageUrl)
				.setImage(event.map.environment.imageUrl)
				.setColor(event.map.gameMode.color);
			message.util?.send(embed);
		}

		return true;
	}
}
