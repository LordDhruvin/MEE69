import { Listener } from 'discord-akairo';
import { Player, Track } from 'erela.js';
import { TextChannel } from 'discord.js';
import config from '../../../../Data/config';

export default class extends Listener {
	public constructor() {
		super('listener_music_trackStuck', {
			emitter: 'music',
			event: 'trackStuck',
		});
	}
	public async exec(player: Player, track: Track) {
		let chn;
		if (player.textChannel) {
			chn = this.client.channels.cache.get(
				player.textChannel,
			) as TextChannel;
			chn.send(
				'Track `' +
					track.title +
					'` is Stuck due to some unknown error.',
			);
		}

		let chnn = this.client.channels.cache.get(
			config.bot.logchannels.error,
		) as TextChannel;
		if (!chnn)
			try {
				chnn = (await this.client.channels.fetch(
					config.bot.logchannels.error,
				)) as TextChannel;
			} catch (err) {}

		if (!chnn) return;
		let embed = this.client.util
			.embed()
			.setTitle('Track Stuck')
			.setColor(0xff0000)
			.setDescription(`\`\`\`md\n* Track: ${track.title}\`\`\``);
		chn
			? embed.addField(
					'More Info',
					`Guild: ${chn.guild.name} \`${chn.guild.id}\``,
			  )
			: null;

		chnn.send(embed);
	}
}
