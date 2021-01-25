import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import ms from 'ms';

export default class extends Command {
	public constructor() {
		super('brawl_command_infomation_help', {
			aliases: ['help'],
			description: {
				short: 'Did you just use help command on help command itself?',
				hidden: false,
				usage: '[ Command ]',
			},
			args: [
				{
					id: 'command',
					type: 'commandAlias',
				},
			],
		});
	}

	public async exec(message: Message, { command }: { command: Command }) {
		// @ts-ignore I love ts :)
		let prefix: string = /*this.handler.prefix(message) || */ this.handler
			.prefix;
		let embed;
		let better_description;
		if (command) {
			better_description = Object.assign(
				{
					short: '404: Description not found.',
					usage: '',
					hidden: false,
				},
				command.description
			);
			let guildOnly = 'No';
			if (command.channel) {
				if (command.channel === 'guild') guildOnly = 'Yes';
			}

			embed = this.client.util
				.embed()
				.setColor(this.client.baseColor)
				.setTitle(
					`\`${prefix}${command.aliases[0]}${
						better_description.usage
							? ` ${better_description.usage}`
							: ''
					}\``
				)
				.addField(
					`Description`,
					`\`${
						better_description.short || 'No Description Given!' //Keeping just in case!
					}\``
				);
			if (command.cooldown) {
				embed.addField(`Cooldown`, `\`${ms(command.cooldown)}\``, true);
			}
			embed
				.addField(`Category`, `\`${command.category}\``)
				.addField(`Guild Only`, `${guildOnly}`);
		}
		let embed2 = this.client.util
			.embed()
			.setTitle(
				`${this.client.user?.username}'s Commands \`[ ${this.handler.modules.size} ]\``
			)
			.setColor(this.client.baseColor)
			.setThumbnail(this.client.user!.displayAvatarURL())
			.setFooter(
				`Do "${prefix}help [ Command ]" for detailed help on a particular command`
			);

		for (let category of this.handler.categories.values()) {
			if (this.client.isOwner(message.author))
				embed2.addField(
					`${category.id} \`[ ${category.size} ]\``,
					`${category
						.map((cmd) => `\`${cmd.aliases[0]}\``)
						.join(', ')}`
				);
			else if (category.id != 'Owner')
				embed2.addField(
					`${category.id} \`[ ${category.size} ]\``,
					`${category
						.filter((cmd) => !cmd.description.hidden)
						.map((cmd) => `\`${cmd.aliases[0]}\``)
						.join(', ')}`
				);
		}

		if (command) {
			if (this.client.isOwner(message.author)) {
				return message.util?.send(embed);
			} else if (command.ownerOnly) {
				return message.util?.send(embed2);
			} else if (!command.description.hidden) {
				return message.util?.send(embed);
			} else {
				return message.util?.send(embed2);
			}
		} else {
			return message.util?.send(embed2);
		}
	}
}
