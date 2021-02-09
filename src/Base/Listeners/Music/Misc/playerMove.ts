import { Listener } from 'discord-akairo';
import { Player } from 'erela.js';

export default class extends Listener {
	public constructor() {
		super('listener_music_playerMove', {
			emitter: 'music',
			event: 'playerMove',
		});
	}
	public async exec(player: Player, newChannel: string) {
		if (!newChannel) {
			player.destroy();
		}
	}
}
