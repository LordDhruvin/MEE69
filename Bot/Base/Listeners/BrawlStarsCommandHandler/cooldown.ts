import { Command } from 'discord-akairo';
import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import ms from 'ms';

export default class extends Listener {
	public constructor() {
		super('listener_brawl_stars_command_handler_cooldown', {
			emitter: 'BrawlStarsCommandHandler',
			event: 'cooldown',
		});
	}

	public async exec(message: Message, command: Command, remaining: number) {
		let embed = this.client.util
			.embed()
			.addField(
				`Cooldown`,
				`You need to wait \`${ms(remaining, {
					long: true,
				})}\` before running the ${command.aliases[0]} again.`
			);
		if (typeof command.cooldown === 'number') {
			embed.setFooter(
				`The default cooldown for ${
					command.aliases[0]
				} is ${ms(command.cooldown, { long: true })}`
			);
		}

		return message.channel.send(embed);
	}
}
