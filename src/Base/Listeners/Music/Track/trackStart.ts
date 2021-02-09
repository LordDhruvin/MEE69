import { Listener } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import { Player, Track } from 'erela.js';

export default class extends Listener {
	public constructor() {
		super('listener_music_trackStart', {
			emitter: 'music',
			event: 'trackStart',
		});
	}
	public async exec(player: Player, track: Track) {
		if (player.textChannel) {
			let chn = this.client.channels.cache.get(
				player.textChannel,
			) as TextChannel;
			let embed = this.client.util
				.embed()
				.setTitle('Now Playing: ' + track.title)
				.setColor('RANDOM');
			track.thumbnail ? embed.setThumbnail(track.thumbnail) : null;
			track.uri ? embed.setURL(track.uri) : null;
			track.requester
				? embed.setDescription('Requested by: ' + track.requester)
				: null;
			track.author ? embed.setFooter('By: ' + track.author) : null;
			await chn.send(embed);
		}
	}
}
