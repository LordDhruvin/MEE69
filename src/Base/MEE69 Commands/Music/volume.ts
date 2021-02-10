import { Command, Argument } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_mee69_music_volume', {
			aliases: ['volume', 'vol'],
			channel: 'guild',
			args: [
				{
					id: 'vol',
					type: Argument.range('number', 0, 101),
					prompt: {
						start: 'What do you want the volume to be?',
						retry:
							'Come on, it has to be a valid number between 1 to 100',
					},
				},
			],
		});
	}
	public async exec(message: Message, { vol }: { vol: number }) {
		if (!message.guild) return 'How the FUCK??';

		let player = await message.guild.player();
		if (!player)
			return message.channel.send(
				'I cannot change the volume of nothing, No song(s) are being at the moment.',
			);

		vol > 100 ? (vol = 100) : null;
		player.setVolume(vol);

		return message.channel.send(
			`Set the volume to \`${vol}\`% :ok_hand_tone1:`,
		);
	}
}
