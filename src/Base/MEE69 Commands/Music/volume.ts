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
				},
			],
			description: {
				short: 'Show the current volume or change it!',
				usage: '[ Volume ]',
				hidden: false,
			},
		});
	}
	public async exec(message: Message, { vol }: { vol: number }) {
		if (!message.guild) return 'How the FUCK??';

		let player = await message.guild.player();
		if (!player)
			return message.channel.send(
				'I cannot change or show the volume of nothing, No song(s) are being at the moment.',
			);

		let thatvol = player.volume;

		if (!vol)
			return message.channel.send(
				`The current volume is \`${thatvol}%\` ${
					thatvol > 50 ? '🔊' : '🔉'
				}`,
			);

		if (thatvol === vol)
			return message.channel.send(
				`You seem like a fool to me trying to change the volume from \`${thatvol}\` to \`${vol}\`.`,
			);
		vol > 100 ? (vol = 100) : null;

		let thatemote =
			vol > thatvol ? '🔊' : vol < thatvol ? '🔉' : 'undefined';
		player.setVolume(vol);

		return message.channel.send(
			`${thatemote} Set the volume to \`${vol}%\` :ok_hand_tone1:`,
		);
	}
}
