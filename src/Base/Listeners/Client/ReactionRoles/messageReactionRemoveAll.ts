import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Listener {
	public constructor() {
		super('listener_client_messageReactionRemoveAll', {
			emitter: 'Bot',
			event: 'messageReactionRemove',
		});
	}
	public async exec(message: Message) {
		if (message.partial) await message.fetch();
		if (!message.guild) return;

		console.log(
			`All emojis from message ${message.id} in ${message.channel} of ${message.guild} were removed`,
		);
	}
}
