import { Listener } from 'discord-akairo';
import { Player } from 'erela.js';

export default class extends Listener {
	public constructor() {
		super('listener_music_socketClosed', {
			emitter: 'music',
			event: 'socketClosed',
		});
	}
	public async exec(player: Player) {
		player.destroy();
	}
}
