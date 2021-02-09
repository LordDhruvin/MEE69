import { Listener } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import config from '../../../../Data/config';

export default class extends Listener {
	public constructor() {
		super('listener_music_nodeError', {
			emitter: 'music',
			event: 'nodeError',
		});
	}
	public async exec(_: unknown, error: Error) {
		if (!config.bot.logchannels.error) return;
		let embed = this.client.util
			.embed()
			.setTitle(`Music Error`)
			.addField(`${error.name}`, `\`\`\`prolog\n${error.message}\n\`\`\``)
			.addField(`Stacked Error`, `\`\`\`prolog\n${error.stack}\`\`\``)
			.setColor(0xff0000);
		let chn = this.client.channels.cache.get(
			config.bot.logchannels.error,
		) as TextChannel;
		if (!chn)
			try {
				chn = (await this.client.channels.fetch(
					config.bot.logchannels.error,
				)) as TextChannel;
			} catch (err) {}

		if (!chn) return;
		chn.send(embed);

		this.client.logger.error(error);
	}
}
