import { Listener } from 'discord-akairo';
import { Player, Track, TrackExceptionEvent } from 'erela.js';
import { TextChannel } from 'discord.js';
import config from '../../../../Data/config';

export default class extends Listener {
	public constructor() {
		super('listener_music_trackError', {
			emitter: 'music',
			event: 'trackError',
		});
	}
	public async exec(
		player: Player,
		track: Track,
		payload: TrackExceptionEvent,
	) {
		let chn;
		if (player.textChannel) {
			chn = this.client.channels.cache.get(
				player.textChannel,
			) as TextChannel;
			chn.send(
				'Track `' +
					track.title +
					'` has encountered some unknown Error.',
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
		let _13blnkspaces = '             '; //for better formatting of embed xD
		let embed = this.client.util
			.embed()
			.setTitle('Track Error')
			.setDescription(
				`\`\`\`md\n* Track: ${track.title}\n* Error: ${
					payload.error
				}\n* Exception: ${
					payload.exception
						? `${_13blnkspaces}* Cause: ${payload.exception.cause}\n${_13blnkspaces}* Message: ${payload.exception.message}\n${_13blnkspaces}* Severity: ${payload.exception.severity}`
						: `Unknown`
				}\`\`\``,
			)
			.setColor(0xff0000);
		chn
			? embed.addField(
					'More Info',
					`Guild: ${chn.guild.name} \`${chn.guild.id}\``,
			  )
			: null;

		chnn.send(embed);
	}
}
