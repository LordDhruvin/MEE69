import { Command } from 'discord-akairo';
import { Listener } from 'discord-akairo';
import { Util } from 'discord.js';
import { TextChannel } from 'discord.js';
import { Message } from 'discord.js';
import config from '../../../Data/config';

export default class extends Listener {
	public constructor() {
		super('listener_command_handler_error', {
			emitter: 'CommandHandler',
			event: 'error',
		});
	}

	public async exec(error: Error, message: Message, command: Command) {
		if (this.client.isOwner(message.author)) {
			return message.channel.send(
				this.client.util
					.embed()
					.setColor(0xff0000)
					.addField(`Error`, `\`\`\`prolog\n${error.message}\n\`\`\``)
					.addField(`Command`, `\`${command.id}\``)
			);
		} else {
			if (!config.bot.logchannels.error) return;
			let embed = this.client.util
				.embed()
				.setTitle(`Error`)
				.addField(
					`${error.name}`,
					`\`\`\`prolog\n${error.message}\n\`\`\``,
					true
				)
				.addField(`Command`, `\`${command.id}\``, true)
				.addField(
					`Message`,
					`\`${
						message.content
							? Util.escapeMarkdown(message.content)
							: ' '
					}\`\n**Author:** ${message.author} \`${
						message.author.id
					}\`\n**Guild:** ${
						message.guild
							? `${message.guild.name} \`${message.guild.id}\``
							: `DMs`
					}`
				)
				.addField(
					`Stacked Error`,
					`\`\`\`prolog\n${error.stack}\n\`\`\``
				)
				.setColor(0xff0000);
			let chn = this.client.channels.cache.get(
				config.bot.logchannels.error
			) as TextChannel;
			if (!chn)
				try {
					chn = (await this.client.channels.fetch(
						config.bot.logchannels.error
					)) as TextChannel;
				} catch (err) {}

			this.client.logger.error(error);
			if (!chn) return undefined;
			return chn.send(embed);
		}
	}
}
