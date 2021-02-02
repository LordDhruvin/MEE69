import { Listener } from 'discord-akairo';
import { Snowflake } from 'discord.js';
import { Collection } from 'discord.js';
import { Message } from 'discord.js';

export default class extends Listener {
	public constructor() {
		super('listener_client_messageBulkDelete', {
			emitter: 'Bot',
			event: 'messageBulkDelete',
		});
	}
	public async exec(messages: Collection<Snowflake, Message>) {
		console.log(messages);
		//will do message logs later on.
	}
}
