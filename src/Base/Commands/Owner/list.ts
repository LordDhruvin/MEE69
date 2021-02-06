import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_owner_list', {
			aliases: ['list'],
			ownerOnly: true,
			description: {
				short: 'Lists all the commands, listeners and inhibitors',
				hidden: true,
			},
			args: [
				{
					id: 'commands',
					match: 'flag',
					flag: '--commands',
				},
				{
					id: 'listeners',
					match: 'flag',
					flag: '--listeners',
				},
				{
					id: 'inhibitors',
					match: 'flag',
					flag: '--inhibitors',
				},
			],
		});
	}

	public async exec(
		message: Message,
		{
			commands,
			listeners,
			inhibitors,
		}: { commands: boolean; listeners: boolean; inhibitors: boolean }
	) {
		let embed1 = this.client.util
			.embed()
			.setTitle(`${this.client.user?.tag}'s Modules`)
			.addField(
				`Commands - \`[ ${this.client.CommandHandler.modules.size} ]\``,
				`${this.client.CommandHandler.modules
					.map((m) => `\`${m.id}\``)
					.join(`\n`)}`
			)
			.setColor(this.client.baseColor)
			.setThumbnail(
				this.client.user!.displayAvatarURL({ dynamic: true })
			);

		let embed2 = this.client.util
			.embed()
			.setTitle(`${this.client.user?.tag}'s Modules`)
			.addField(
				`Listeners - \`[ ${this.client.ListenerHandler.modules.size} ]\``,
				`${this.client.ListenerHandler.modules
					.map((m) => `\`${m.id}\``)
					.join(`\n`)}`
			)
			.setColor(this.client.baseColor)
			.setThumbnail(
				this.client.user!.displayAvatarURL({ dynamic: true })
			);

		let embed3 = this.client.util
			.embed()
			.setTitle(`${this.client.user?.tag}'s Modules`)
			.addField(
				`Inhibitors - \`[ ${this.client.InhibitorHandler.modules.size} ]\``,
				`${this.client.InhibitorHandler.modules
					.map((m) => `\`${m.id}\``)
					.join(`\n`)}`
			)
			.setColor(this.client.baseColor)
			.setThumbnail(
				this.client.user!.displayAvatarURL({ dynamic: true })
			);

		if (commands || listeners || inhibitors) {
			if (commands) {
				return message.util?.send(embed1);
			} else if (listeners) {
				return message.util?.send(embed2);
			} else if (inhibitors) {
				return message.util?.send(embed3);
			} else {
				// I love ts :)
				return undefined;
			}
		} else {
			return message.util?.send(
				this.client.util
					.embed()
					.setColor(this.client.baseColor)
					.addField(
						`Invalid Input`,
						`You need to provide one of these flags:\n\`--commands\`\n\`--listeners\`\n\`--inhibitors\`\nExample: \`${
							this.handler.prefix /*(message)*/
						}list --commands\``
					)
			);
		}
	}
}
