import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Inhibitor {
	public constructor() {
		super('inhibitor_blacklist_user', {
			reason: 'USER_BLACKLISTED',
			priority: 8,
		});
	}

	public async exec(message: Message) {
		return message.author.banned;
	}
}
