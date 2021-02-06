import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Inhibitor {
	public constructor() {
		super('inhibitor_blacklist_guild', {
			reason: 'GUILD_BLACKLISTED',
			priority: 9,
		});
	}

	public async exec(message: Message) {
		if (!message.guild) return false;
		else return message.guild.banned;
	}
}
