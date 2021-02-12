import { Command } from 'discord-akairo';
import { Message, VoiceChannel } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_mee69_music_loop', {
			aliases: ['loop', 'repeat'],
			channel: 'guild',
			args: [
				{
					id: 'song',
					flag: '--song',
					match: 'flag',
				},
			],
			description: {
				short:
					'Loop the queue (or the current track)\nHint: try "--song" flag)',
				hidden: false,
			},
		});
	}
	public async exec(message: Message, { song }: { song: boolean }) {
		if (!message.guild) return 'How the FUCK??';
		let player = await message.guild.player();

		if (!player)
			return message.channel.send(
				"I can't loop nothing,  No song(s) are being played at the moment.",
			);

		if (player.textChannel) {
			if (message.channel.id != player.textChannel) return undefined;
		}

		let chn;
		message.member?.voice
			? ({ channel: chn } = message.member?.voice)
			: null;

		if (
			chn?.id != player.voiceChannel &&
			!message.member?.hasPermission('MANAGE_GUILD') &&
			player.voiceChannel
		)
			return message.channel.send(
				'You need to be in the {} channel to use this command'.replace(
					'{}',
					(this.client.channels.cache.get(
						player.voiceChannel,
					) as VoiceChannel).name,
				),
			);

		if (!song) {
			let pq = player.queueRepeat;
			player.setQueueRepeat(pq ? false : true);

			return message.reply(`:repeat: ${pq ? 'Disabled' : 'Enabled'}`);
		} else {
			let pt = player.trackRepeat;
			player.setTrackRepeat(pt ? false : true); //highly doubt that emoji.

			return message.reply(`:repeat_one: ${pt ? 'Disabled' : 'Enabled'}`); //highly doubt that emoji.
		}
	}
}
