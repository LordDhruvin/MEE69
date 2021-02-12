import { Argument } from 'discord-akairo';
import { Listener } from 'discord-akairo';
import { Inhibitor } from 'discord-akairo';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_owner_reload', {
			aliases: ['reload'],
			ownerOnly: true,
			description: {
				short: 'Reload Something or everything',
				hidden: true,
				usage: '[ Command | Inhibitor | Listener ]',
			},
			args: [
				{
					id: 'toReload',
					match: 'rest',
					type: Argument.union('command', 'inhibitor', 'listener'),
				},
				{
					id: 'all',
					match: 'flag',
					flag: ['--all', '--everything'],
				},
			],
		});
	}

	public async exec(
		message: Message,
		{
			toReload,
			all,
		}: { toReload: Command | Inhibitor | Listener; all: boolean }
	) {
		if (all) {

			this.client.CommandHandler.reloadAll();
			this.client.BrawlStarsCommandHandler.reloadAll();
			this.client.MEE69CommandHandler.reloadAll();
			this.client.ListenerHandler.reloadAll();
			this.client.InhibitorHandler.reloadAll();

			return message.util?.send('Everything reloaded');
		} else if (toReload) {
			toReload.reload();
			return message.util?.send(
				`\`${toReload.id}\` reloaded successfully`
			);
		} else {
			return message.util?.send(`You have to specify me what to reload`);
		}
	}
}
