import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Inhibitor {
	public constructor() {
		super('inhibitor_misc_not_text_based_channel', {
			reason: 'NOT_TEXT_BASED_CHANNEL',
			priority: 10,
		});
	}

	public async exec(message: Message) {
		return !message.channel.isText();
	}
}
