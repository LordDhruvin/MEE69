import { Listener } from 'discord-akairo';

export default class extends Listener {
	public constructor() {
		super('listener_music_nodeConnect', {
			emitter: 'music',
			event: 'nodeConnect',
		});
	}
	public async exec() {
		this.client.logger.success('Erela Connected Successfully', 'Erela');
	}
}
