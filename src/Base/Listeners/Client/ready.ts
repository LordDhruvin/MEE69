import { Listener } from 'discord-akairo';

export default class extends Listener {
	public constructor() {
		super('listener_client_ready', {
			emitter: 'Bot',
			event: 'ready',
		});
	}

	public async exec() {
		this.client.logger.success(
			this.client.text.LISTENERS.CLIENT.READY.replace(
				'$VAR1',
				this.client.user!.tag
			)
		); //replace it
	}
}
