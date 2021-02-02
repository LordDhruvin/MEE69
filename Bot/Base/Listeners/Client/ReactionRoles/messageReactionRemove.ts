import { Listener } from 'discord-akairo';
import { User } from 'discord.js';
import { MessageReaction } from 'discord.js';

export default class extends Listener {
	public constructor() {
		super('listener_client_messageReactionRemove', {
			emitter: 'Bot',
			event: 'messageReactionRemove',
		});
	}
	public async exec(reaction: MessageReaction, user: User) {
		if (user.bot) return;
		if (reaction.partial) await reaction.fetch();
		let { message, emoji } = reaction;
		if (message.partial) await message.fetch();
        if (!message.guild) return;

		console.log(
			`${user.tag}'s reaction to message ${message.id} in channel ${message.channel} of ${message.guild} with emoji ${emoji.id} was removed`,
		);
	}
}
