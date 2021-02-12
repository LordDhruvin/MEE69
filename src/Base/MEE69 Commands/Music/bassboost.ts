import { Command } from 'discord-akairo';
import { Role } from 'discord.js';
import { VoiceChannel } from 'discord.js';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_mee69_music_bassboost', {
			aliases: ['bass-boost', 'bb'],
			channel: 'guild',
			description: {
				short: 'Set the bassboost filter for music',
				usage: '[ low | medium | high ]',
				hidden: false,
			},
			args: [
				{
					id: 'filter',
					type: [
						['n', 'none', 'null', 'reset'],
						['l', 'low'],
						['m', 'medium'],
						['h', 'high'],
					],
					default: 'n',
				},
			],
		});
	}
	public async exec(
		message: Message,
		{ filter }: { filter: 'n' | 'l' | 'm' | 'h' },
	) {
		if (!message.guild) return 'How the FUCK??';
		let player = await message.guild.player();

		if (!player)
			return message.channel.send(
				"I can't pause nothing,  No song(s) are being played at the moment.",
			);

		if (player.textChannel) {
			if (message.channel.id != player.textChannel) return undefined;
		}

		let chn;
		message.member?.voice
			? ({ channel: chn } = message.member?.voice)
			: null;

		if (
			chn?.id != player.voiceChannel &&
			!message.member?.hasPermission('MANAGE_GUILD') &&
			player.voiceChannel
		)
			return message.channel.send(
				'You need to be in the {} channel to use this command'.replace(
					'{}',
					(this.client.channels.cache.get(
						player.voiceChannel,
					) as VoiceChannel).name,
				),
			);

		let lvls = {
			n: 0.0,
			l: 0.2,
			m: 0.3,
			h: 0.35,
		};

		player.setEQ(
			...new Array(3)
				.fill(null)
				.map((_, i) => ({ band: i, gain: lvls[filter] })),
		);

		let usrfrndly = {
			n: 'None',
			l: 'Low',
			m: 'Medium',
			h: 'High',
		};

        if (
			!message.member?.roles.cache.find((r: Role) => r.name === 'DJ') &&
			!message.member?.hasPermission('MANAGE_CHANNELS')
		)
			return message.channel.send(
				'You need to either have the "DJ" role or the "Manage Channels" permission to use this command!',
			);

		return message.reply(
			`the bassboost level has been set to \`${usrfrndly[filter]}\``,
		);
	}
}
