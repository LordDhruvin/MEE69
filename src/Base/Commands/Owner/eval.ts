/**
 * Taken from discord-bot-template GitHub , I actually loved the look of it.
 */
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { inspect } from 'util';

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
					match: 'flag',
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
			resp = e.toString();
		}

		if (typeof resp != 'string') {
			resp = inspect(resp, { depth: 3 });
		}
		if (silent) return;

		let len = `\`\`\`js\n${resp}\n\`\`\``.length;

		embed
			.setTitle(err ? 'Error' : 'Success')
			.setDescription(`\`\`\`js\n${resp.substr(0, 2038)}\n\`\`\``)
			.setColor(err ? 'RED' : 'GREEN');

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

		let rctn = await msg.react('<:Delete:810464113682808832>');
		let delresp
		try {
			delresp = await msg.awaitReactions((reaction, user) => reaction.emoji.name === '<:Delete:810464113682808832>' && user.id === message.author.id, {
				time: 60 * 1000, //1 minute
				errors: ['time'],
			});
		} catch (e) {
			return rctn.remove();
		}

		return delresp.first()?.message.delete()
		//TODO: react to the message with a red delete emoji, then await reponse to that emoji and delete this message on that reponse. //needed: Emoji
	}
}
