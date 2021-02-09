import { Listener } from 'discord-akairo';
//import { TextChannel } from 'discord.js';
//import { Player } from 'erela.js';

export default class extends Listener {
	public constructor() {
		super('listener_music_nodeDisconnect', {
			emitter: 'music',
			event: 'nodeDisconnect',
		});
	}
	//in docs the second param isn't player, mhm code seems kinda sus
	public async exec(_: unknown /*, player: Player*/) {
		this.client.logger.warn('Node disconnected', 'Erela');
		/*player.destroy;
		if (player.textChannel) {
			let chn = this.client.channels.cache.get(
				player.textChannel,
			) as TextChannel;
			chn.send(
				'Music had to be stopped as the Utility for this has been disconnected.',
			);
		}*/
	}
}
