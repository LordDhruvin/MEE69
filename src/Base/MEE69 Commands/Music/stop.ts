import { Command } from 'discord-akairo';
import { Message, VoiceChannel } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('comand_mee69_music_stop', {
			aliases: ['stop', 'fuck-off'],
			channel: 'guild',
			description: {
				short: 'Stops the music',
				hidden: false,
			},
		});
	}
	public async exec(message: Message) {
		if (!message.guild) return 'How the FUCK??';
		let player = await message.guild.player();

		if (!player)
			return message.util?.send(
				"I can't skip nothing, No song(s) are being played at the moment.",
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

		player.destroy();

		return message.reply(':wave_tone1: Bye Bye');
	}
}
