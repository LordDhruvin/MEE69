import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_mee69_music_nowplaying', {
			aliases: ['now-playing', 'np'],
			channel: 'guild',
			description: {
				short: 'View the currently playing song!',
				hidden: false
			}
		});
	}
	public async exec(message: Message) {
		if (!message.guild) return 'How the FUCK??';
		let player = await message.guild?.player();
		if (!player || !player.queue.current)
			return message.channel.send(
				'No song(s) are being played at the moment.',
			);
		const { title, author, identifier } = player.queue.current;

		let emb = this.client.util
			.embed()
			.setTitle(
				'[] Currently Playing: {} by ()'
					.replace('[]', player.playing ? '▶️' : '⏸️')
					.replace('{}', title)
					.replace('()', author || 'Unknown'),
			)
			.setImage(`http://i3.ytimg.com/vi/${identifier}/maxresdefault.jpg`);
		return message.util?.send(emb);
	}
}
