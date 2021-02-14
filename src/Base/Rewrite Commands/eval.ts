/**
 * Taken from discord-bot-template GitHub , I actually loved the look of it.
 */
import { Command } from 'discord-akairo';
import { Message, MessageReaction, User } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_owner_eval', {
			aliases: ['eval', 'ev'],
			ownerOnly: true,
			args: [
				{
					id: 'silent',
					flag: ['--silent', '--s'],
					match: 'flag',
				},
				{
					id: 'del',
					flag: ['--delete', '--del', '--d'],
				},
				{
					id: 'code',
					match: 'rest',
				},
			],
		});
	}
	public async exec(
		message: Message,
		{ silent, del, code }: { silent: boolean; del: boolean; code: string },
	) {
		let resp: string;
		let err = false;

		if (del) {
			message.delete().catch(() => {});
		}

		let embed = this.client.util
			.embed()
			.setFooter(`Eval command executed by ${message.author.tag}`)
			.setTimestamp();

		try {
			if (code.includes('await') && !message.content.includes('\n')) {
				code = '( async () => {return ' + code + '})()';
			} else if (
				code.includes('await') &&
				message.content.includes('\n')
			) {
				code = '( async () => {' + code + '})()';
			}
			resp = await eval(code);
		} catch (e) {
			err = true;
			resp = e;
		}

		if (silent) return;

		let len = `\`\`\`js\n${resp}\n\`\`\``.length;

		embed
			.setTitle(err ? 'Error' : 'Success')
			.setDescription(`\`\`\`js\n${resp.substr(0, 2038)}\n\`\`\``);

		if (len >= 2049) {
			console.log(
				`An eval command executed by ${message.author.tag}'s response was too long (${len}/2048) the response was:\n${resp}`,
			);
			embed.addField(
				'Note:',
				`The response was too long with a length of \`${len}/2048\` characters. it was logged to the console`,
			);
		}

		let msg = await message.channel.send(embed);

		let rctn = await msg.react('bin');

		let filter = (r: MessageReaction, u: User) =>
			r.emoji.id === 'e.id' && u.id === message.author.id;
		try {
			let delresp = await msg.awaitReactions(filter, {
				time: 60 * 1000, //1 minute
				errors: ['time'],
			});

			delresp ? msg.delete() : rctn.remove();
		} catch (e) {
			rctn.remove();
		}
		//TODO: react to the message with a red delete emoji, then await reponse to that emoji and delete this message on that reponse. //needed: Emoji
	}
}
