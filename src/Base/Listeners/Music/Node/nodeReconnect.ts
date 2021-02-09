import { Listener } from 'discord-akairo';

export default class extends Listener {
	public constructor() {
		super('listener_music_nodeReconnect', {
			emitter: 'music',
			event: 'nodeReconnect',
		});
	}
	public async exec() {
		this.client.logger.success('Node Reconnected', 'Erela');
	}
}
