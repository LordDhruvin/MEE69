import { Command } from 'discord-akairo';
import { VoiceChannel } from 'discord.js';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_mee69_music_play', {
			aliases: ['play', 'p'],
			channel: 'guild',
		});
	}
	public async exec(message: Message) {
		if (!message.guild) return 'How the FUCK??';
		let player = await message.guild.player();
		if (!player) {
			//Do that set of calculations here i.e. the voice channel check binding to the channel etc.
			return message.util?.send(
				'Hey! My devs are still working on this command. you gotta stay tuned!',
			);
		} else {
			if (player.textChannel) {
				if (message.channel.id != player.textChannel) return undefined; //this makes it ignore if the channel is not the one that the player is bound to.
			}
			if (player.voiceChannel) {
				if (message.member?.voice.channelID != player.voiceChannel)
					return message.util?.send(
						'You need to join the ' +
							(this.client.channels.cache.get(
								player.voiceChannel,
							) as VoiceChannel).name +
							' channel to play music.',
					);
			}
			return message.util?.send(
				'Hey! My devs are still working on this command. you gotta stay tuned!',
			);
		}
	}
}
