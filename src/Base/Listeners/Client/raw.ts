import { Listener } from 'discord-akairo';

export default class extends Listener {
	public constructor() {
		super('listener_client_raw', {
			emitter: 'Bot',
			event: 'raw',
		});
	}
	public async exec(raw: any) {
		this.client.music.updateVoiceState(raw);
	}
}
