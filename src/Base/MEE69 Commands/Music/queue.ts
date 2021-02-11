import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_mee69_music_queue', {
			aliases: ['queue', 'q'],
			channel: 'guild',
			args: [
				{
					id: 'pagenum',
					type: (_: Message, str: string): null | number => {
						if (str && !isNaN(Number(str))) return Number(str);
						return null;
					},
					default: 1,
					match: 'rest',
				},
			],
			description: {
				short: 'Show the current song queue',
				usage: '[ Page Number ]',
				hidden: false,
			},
		});
	}
	public async exec(message: Message, { pagenum }: { pagenum: number }) {
		if (!message.guild) return 'How the FUCK??';
		let player = await message.guild.player();
		if (!player || !player.queue)
			return message.channel.send(
				'No song(s) are being played at the moment.',
			);

		let queue = player.queue;

		let e = this.client.util.embed().setTitle(`Queue`);
		queue.current
			? e.setImage(
					`https://img.youtube.com/vi/${queue.current.identifier}/maxresdefault.jpg`,
			  )
			: null;

		const x = 5;
		const page =
			player.queue.length && Number(pagenum) ? Number(pagenum) : 1;

		const end = page * x;
		const start = end - x;

		const tracks = queue.slice(start, end);

		if (queue.current) {
			e.addField(
				'Current',
				`[${queue.current.title}](${queue.current.uri}) request by: ${queue.current.requester}`,
			);
		}

		if (!tracks.length)
			e.setDescription(
				`No tracks in ${page > 1 ? `page ${page}` : 'the queue'}.`,
			);
		else
			e.setDescription(
				tracks
					.map(
						(track, i) =>
							`${start + ++i} - [${track.title}](${
								track.uri
							}) request by: ${queue.current?.requester}`,
					)
					.join('\n'),
			);

		const maxPages = Math.ceil(queue.length / x);

		e.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

		return message.channel.send(e);
	}
}
