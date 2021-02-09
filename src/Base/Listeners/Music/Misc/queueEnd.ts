import { Listener } from 'discord-akairo';
import { Player } from 'erela.js';

export default class extends Listener {
	public constructor() {
		super('listener_music_queueEnd', {
			emitter: 'music',
			event: 'queueEnd',
		});
	}
	public async exec(player: Player) {
		player.destroy();
	}
}
