import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class extends Command {
	public constructor() {
		super('command_owner_eval', {
			aliases: ['eval'],
			ownerOnly: true,
			description: {
				short: 'Evaluate some code',
				usage: '< Code >',
				hidden: true,
			},
			args: [
				{
					id: 'code',
					type: 'string',
					prompt: {
						start: `What to evaluate?`,
					},
					match: 'rest',
				},
				{
					id: 'unsecure',
					match: 'flag',
					flag: '--unsecure', //Needs work
				},
				{
					id: 'asynchronous',
					match: 'flag',
					flag: '--async',
				},
			],
		});
	}

	/**
	 * Clean the text
	 * @param {string} text The text to be cleaned
	 * @private
	 */
	private clean(text: string) {
		if (typeof text === 'string') {
			return text
				.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203));
		} else {
			return text;
		}
	}

	public async exec(
		message: Message,
		{ code, unsecure }: { code: string; unsecure: string }
	) {
		if (unsecure) {
			console.log(`Unsecure Evaluation Requested`);
		}

		try {
			let evalled = await eval(
				unsecure ? '(async () => {' + code + '})()' : code
			);
			if (typeof evalled !== 'string') {
				evalled = require('util').inspect(evalled);
			}
			message.util!.send(`\`\`\`js\n${this.clean(evalled)}\`\`\``, {
				split: {
					maxLength: 1980,
					prepend: '```js\n',
					append: '\n```',
				},
			});
		} catch (err) {
			message.util!.send(
				`**Error:**\`\`\`prolog\n${this.clean(err)}\`\`\``,
				{
					split: {
						maxLength: 1980,
						prepend: '```js\n',
						append: '\n```',
					},
				}
			);
		}
	}
}
