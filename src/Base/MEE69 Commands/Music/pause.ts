import { Command } from 'discord-akairo';
import { Message, VoiceChannel } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_mee69_music_pause', {
			aliases: ['pause'],
			channel: 'guild',
			description: {
				short: 'Pauses the player if not paused and vice-versa',
				hidden: false,
			},
		});
	}
	public async exec(message: Message) {
		if (!message.guild) return 'How the FUCK??';
		let player = await message.guild.player();

		if (!player)
			return message.channel.send(
				"I can't pause nothing,  No song(s) are being played at the moment.",
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

		let pp = player.paused;
		player.pause(pp ? false : true);

		return message.reply(`${pp ? '▶️ Playing' : '⏸️ Paused'}`);
	}
}
