import { TextChannel, Message } from 'discord.js';
import { MessageOptions } from 'discord.js';
import { Structures } from 'discord.js';

export interface MageTextChannel extends TextChannel {
	sendCode(
		content?: string,
		language?: string,
		options?: MessageOptions
	): Promise<Message | Array<Message>>;
}

export default Structures.extend('TextChannel', (TextChannel) => {
	////////////////////////////////////////////////////////
	///                Mage Text Channel                ///
	//////////////////////////////////////////////////////

	class MageTextChannel extends TextChannel {
		public constructor(...args: any) {
			// @ts-ignore
			super(...args);
		}

		/**
		 * Sends a codeblock message to the given TextChannel
		 * @param {string} [content=''] The content of the message
		 * @param {string} [language=''] The Language of codeblock to use
		 * @param {Object} [options={}] The normal discord.js MessageOptions
		 */
		public async sendCode(
			content = '',
			language = '',
			options: MessageOptions
		): Promise<Message | Array<Message>> {
			return this.send(`\`\`\`${language}\n${content}\n\`\`\``, options);
		}
	}

	return MageTextChannel;
});
