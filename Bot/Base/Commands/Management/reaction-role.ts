import { Command } from 'discord-akairo';

export default class extends Command {
	public constructor() {
		super('command_management_reaction-role', {
			aliases: ['reaction-role', 'reaction-roles', 'rr'],
		});
	}
}
