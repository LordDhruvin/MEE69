import { Command } from 'discord-akairo';
//import { Role } from 'discord.js';
import { MessageAttachment } from 'discord.js';
import { VoiceChannel } from 'discord.js';
import { Message } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('command_mee69_music_play', {
			aliases: ['play', 'p'],
			channel: 'guild',
			args: [
				{
					id: 'search',
					type: 'string',
					match: 'rest',
				},
			],
			description: {
				short: 'Play a song, tune in some music',
				usage: '< Song name | Youtube Link | Spotify Link >',
				hidden: false,
			},
			cooldown: 5 * 1000, //5 seconds
		});
	}
	public async exec(
		message: Message,
		{ search }: { search: string | MessageAttachment },
	) {
		if (!message.guild) return 'How the FUCK??';

		let player = await message.guild.player();

		search = message.attachments.first() || search;
		if (!search)
			return message.channel.send("You can't just search for nothing!");

		let chn;
		message.member?.voice
			? ({ channel: chn } = message.member?.voice)
			: null;

		if (!chn)
			return message.util?.send(
				'Come on, you have to be in a voice channel to use Music Commands.',
			);

		if (
			!player /* || 
			message.member?.roles.cache.find((r: Role) => r.name === 'DJ') ||
			message.member?.hasPermission('MANAGE_CHANNELS')*/ // i will add a check to see if their channels are the same, if so i will have to skip the step.
		) {
			//will need another role name here, members with this role can stop a current playing music and start it anywhere they want to.

			let plr = this.client.music.create({
				guild: message.guild.id,
				voiceChannel: chn.id,
				textChannel: message.channel.id,
				selfDeafen: true,
			});
			await plr.connect(); //ik that's not promisified but i still wanna use await because i can.
			message.util?.send(`Joined ${chn} and bound to ${message.channel}`);
			let res;
			try {
				res = await plr.search(
					search instanceof MessageAttachment ? search.url : search,
					message.author,
				);

				if (res.loadType === 'LOAD_FAILED') {
					if (!plr.queue.current) plr.destroy();
					throw new Error(res.exception?.message);
				}
			} catch (e) {
				return message.util?.send(
					'Error while searching: ' + e.message,
				);
			}

			switch (res.loadType) {
				case 'NO_MATCHES':
					if (!plr.queue.current) plr.destroy();
					return message.channel.send('No search results found.');

				case 'TRACK_LOADED':
					plr.queue.add(res.tracks[0]);
					if (!plr.playing && !plr.paused && !plr.queue.length)
						plr.play();
					return message.channel.send(
						'Queued ' + res.tracks[0].title,
					);

				case 'PLAYLIST_LOADED':
					plr.queue.add(res.tracks[0]);
					if (
						!plr.playing &&
						!plr.paused &&
						plr.queue.size === res.tracks.length
					)
						plr.play();
					let ttl = res.playlist?.name;
					let emb = this.client.util
						.embed()
						.setTitle('🎶 Playlist Loaded 🎶')
						.addField(
							'Title',
							`${
								(ttl?.length ? ttl.length > 10 : null)
									? `${ttl?.substring(0, 10)}...`
									: ttl
							}`,
							true,
						)
						.setImage(
							`https://img.youtube.com/vi/${res.tracks[0].identifier}/maxresdefault.jpg`,
						)
						.setFooter('Requested by: ' + res.tracks[0].requester);
					return message.channel.send(emb);

				case 'SEARCH_RESULT':
					let max = 5;
					let collected;
					let filter = (m: Message) =>
						m.author.id === message.author.id &&
						/^(\d+|cancel)$/i.test(m.content);
					if (res.tracks.length < max) max = res.tracks.length;

					let results = res.tracks
						.slice(0, max)
						.map(
							(track, index) => `${++index} - \`${track.title}\``,
						)
						.join('\n');

					let e = this.client.util
						.embed()
						.setAuthor(
							`🎶 Result of ${search} 🎶`,
							'https://cdn.discordapp.com/attachments/713193780932771891/759022257669406800/yt.png',
						) //Looks like a YT logo or smth to me
						.setDescription(results)
						.setFooter(
							`Requested by: ${message.author.tag} | Type "cancel" to cancel the selection`,
						);
					message.channel.send(e);
					try {
						collected = await message.channel.awaitMessages(
							filter,
							{ max: 1, time: 30e3, errors: ['time'] },
						);
					} catch (e) {
						if (!plr.queue.current) plr.destroy();
						return message.reply(
							'You fool you need to actually choose something!',
						);
					}
					let first = collected.first()?.content;

					if (first?.toLowerCase() === 'cancel') {
						if (!plr.queue.current) plr.destroy();
						return message.react(':thumbsup:'); //idk if it works like that.
					}

					var index = Number(first) - 1;
					if (index < 0 || index > max - 1)
						return message.reply(
							"Option `{}` doesn't exist!".replace(
								'{}',
								1 - max + '',
							), //f the rainbow extension, i will have to escpae it and all that. It originally was `Option \`${1-max}\` doesn't exist!`
						);

					var track = res.tracks[index];
					plr.queue.add(track);

					if (!plr.playing && !plr.paused && !plr.queue.length)
						plr.play();
					return message.util?.send(
						this.client.util
							.embed()
							.setAuthor(
								`Added Music`,
								'https://cdn.discordapp.com/attachments/713193780932771891/759022257669406800/yt.png',
							)
							.addField(
								'Title',
								`[${track.title}](${track.uri})`,
								true,
							)
							.addField(
								'Requesd by: ',
								`${track.requester}`,
								true,
							)
							.setImage(
								`https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`,
							),
					);
			}
		} else {
			if (player.textChannel) {
				if (message.channel.id != player.textChannel) return undefined; //this makes it ignore if the channel is not the one that the player is bound to.
			}
			if (player.voiceChannel) {
				if (message.member?.voice.channelID != player.voiceChannel)
					return message.util?.send(
						'You need to join the ' +
							(this.client.channels.cache.get(
								player.voiceChannel,
							) as VoiceChannel).name +
							' channel to play music.',
					);
			}
			let res;
			try {
				res = await player.search(
					search instanceof MessageAttachment ? search.url : search,
					message.author,
				);

				if (res.loadType === 'LOAD_FAILED') {
					if (!player.queue.current) player.destroy();
					throw new Error(res.exception?.message);
				}
			} catch (e) {
				return message.util?.send(
					'Error while searching: ' + e.message,
				);
			}

			switch (res.loadType) {
				case 'NO_MATCHES':
					if (!player.queue.current) player.destroy();
					return message.channel.send('No search results found.');

				case 'TRACK_LOADED':
					player.queue.add(res.tracks[0]);
					if (
						!player.playing &&
						!player.paused &&
						!player.queue.length
					)
						player.play();
					return message.channel.send(
						'Queued ' + res.tracks[0].title,
					);

				case 'PLAYLIST_LOADED':
					player.queue.add(res.tracks[0]);
					if (
						!player.playing &&
						!player.paused &&
						player.queue.size === res.tracks.length
					)
						player.play();
					let ttl = res.playlist?.name;
					let emb = this.client.util
						.embed()
						.setTitle('🎶 Playlist Loaded 🎶')
						.addField(
							'Title',
							`${
								(ttl?.length ? ttl.length > 10 : null)
									? `${ttl?.substring(0, 10)}...`
									: ttl
							}`,
							true,
						)
						.setImage(
							`https://img.youtube.com/vi/${res.tracks[0].identifier}/maxresdefault.jpg`,
						)
						.setFooter('Requested by: ' + res.tracks[0].requester);
					return message.channel.send(emb);

				case 'SEARCH_RESULT':
					let max = 5;
					let collected;
					let filter = (m: Message) =>
						m.author.id === message.author.id &&
						/^(\d+|cancel)$/i.test(m.content);
					if (res.tracks.length < max) max = res.tracks.length;

					let results = res.tracks
						.slice(0, max)
						.map(
							(track, index) => `${++index} - \`${track.title}\``,
						)
						.join('\n');

					let e = this.client.util
						.embed()
						.setAuthor(
							`🎶 Result of ${search} 🎶`,
							'https://cdn.discordapp.com/attachments/713193780932771891/759022257669406800/yt.png',
						) //Looks like a YT logo or smth to me
						.setDescription(results)
						.setFooter(
							`Requested by: ${message.author.tag} | Type "cancel" to cancel the selection`,
						);
					message.channel.send(e);
					try {
						collected = await message.channel.awaitMessages(
							filter,
							{ max: 1, time: 30e3, errors: ['time'] },
						);
					} catch (e) {
						if (!player.queue.current) player.destroy();
						return message.reply(
							'You fool you need to actually choose something!',
						);
					}
					let first = collected.first()?.content;

					if (first?.toLowerCase() === 'cancel') {
						if (!player.queue.current) player.destroy();
						return message.react(':thumbsup:'); //idk if it works like that.
					}

					var index = Number(first) - 1;
					if (index < 0 || index > max - 1)
						return message.reply(
							"Option `{}` doesn't exist!".replace(
								'{}',
								1 - max + '',
							), //f the rainbow extension, i will have to escpae it and all that. It originally was `Option \`${1-max}\` doesn't exist!`
						);

					var track = res.tracks[index];
					player.queue.add(track);

					if (
						!player.playing &&
						!player.paused &&
						!player.queue.length
					)
						player.play();
					return message.util?.send(
						this.client.util
							.embed()
							.setAuthor(
								`Added Music`,
								'https://cdn.discordapp.com/attachments/713193780932771891/759022257669406800/yt.png',
							)
							.addField(
								'Title',
								`[${track.title}](${track.uri})`,
								true,
							)
							.addField(
								'Requesd by: ',
								`${track.requester}`,
								true,
							)
							.setImage(
								`https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`,
							),
					);
			}
		}
	}
}
