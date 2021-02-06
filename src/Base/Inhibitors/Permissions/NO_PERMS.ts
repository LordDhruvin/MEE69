import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Inhibitor {
	public constructor() {
		super('inhibitor_permissions_no_perms', {
			reason: 'NO_PERMS',
			priority: 10,
		});
	}

	public async exec(message: Message) {
		if (!message.guild) return false;
		return !message.guild.me?.permissions;
	}
}
