import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import config from '../Data/config';
import index from '../index';
import emojis from '../Data/emojis';
import Utils from './Utils';

/**
 * Get's stats of the player from the api, makes an embed, and returns embed and status of the result.
 * @param playerTag Brawl Stars Player tag of the person
 */
async function getPlayerBrawlStarsStatsById(playerTag: string) {
	const res = await fetch(
		`https://bsproxy.royaleapi.dev/v1/players/%23${playerTag}`,
		{ headers: { Authorization: `Bearer ${config.keys.supercell.bs}` } }
	);
	const stats = await res.json();
	let embed = null;
	if (res.status === 200) {
		let totalTrophies =
			stats.soloVictories + stats.duoVictories + stats['3vs3Victories'];
		let brawlers = index.starlistapicache?.data.get('brawlers');
		embed = new MessageEmbed()
			.addField(
				`${Utils.getPlayerBadgeEmoteById(stats.icon.id)}${
					stats.name
				} | ${stats.tag}`,
				`**Trophies:** \`${stats.trophies || '-'}/${
					stats.highestTrophies || '-'
				}\`${emojis.bsem2.Trophy}\n` +
					`**Power Play:** \`${stats.powerPlayPoints || '-'}/${
						stats.highestPowerPlayPoints || '-'
					}\`${emojis.bsem2.PowerPlayPoints}\n` +
					`**Solo Victories:** \`${
						stats.soloVictories || '-'
					}/${totalTrophies}\`${emojis.bsem2.SoloShowdown}\n` +
					`**Duo Victories:** \`${
						stats.duoVictories || '-'
					}/${totalTrophies}\`${emojis.bsem2.DuoShowdown}\n` +
					`**3v3 Victories:** \`${
						stats['3vs3Victories'] || '-'
					}/${totalTrophies}\`${emojis.bsem2['3v3Victories']}\n` +
					`**Brawlers:** \`${stats.brawlers.length}/${
						brawlers.list.length || '-'
					}\``,
				true
			)
			.addField(`Club`, `${stats.club.name} | ${stats.club.tag}`)
			.setColor('#' + stats.nameColor.slice(4));
	}
	return {
		status: res.status,
		result: stats,
		embed: embed,
	};
}

/**
 * Retrieves club information from the supercell api and returns a beautifed embed, status & the result itself.
 * @param clubTag Brawl Stars club tag of the brawl stars Club
 */
async function getClubBrawlStarsStatsById(clubTag: string) {
	const res = await fetch(
		`https://bsproxy.royaleapi.dev/v1/clubs/%23${clubTag}`,
		{ headers: { Authorization: `Bearer ${config.keys.supercell.bs}` } }
	);
	const stats = await res.json();
	let embed = null;
	if (res.status === 200) {
		let president = stats.members.find((m: any) => m.role === 'president');
		let presidents = stats.members.filter(
			(m: any) => m.role === 'president'
		);
		let vicePresidents = stats.members.filter(
			(m: any) => m.role === 'vicePresident'
		);
		embed = new MessageEmbed()
			.setAuthor(
				`${Utils.getClubBadgeEmoteById(stats.badgeId)}${stats.name} | ${
					stats.tag
				}`
			) //No idea if that will work if it doesn't will use some emote url method
			.setDescription(`\`\`\`\n${stats.description}\n\`\`\``)
			.addField(
				`**Club Stats**`,
				`**Trophies:** \`${stats.trophies || '-'}\`${
					emojis.bsem2.Trophy
				}\n` +
					`**Type:** \`${stats.type || '-'}\`\n` +
					`**Required Trophies:** \`${
						stats.requiredTrophies || '-'
					}\`\n` +
					`**Members:** \`${stats.members.length || '-'}/100\``
			) //I guess that's the limit?
			.addField(
				`**Member's Stats**`,
				`**President**\n` +
					`${presidents
						.map(
							(m: any) =>
								`${Utils.getPlayerBadgeEmoteById(m.icon.id)}${
									m.name
								} \`${m.trophies || '-'}\`${
									emojis.bsem2.Trophy
								}`
						)
						.join(`\n`)}\n` +
					`**Vice Presidents**\n` +
					`${vicePresidents
						.map(
							(m: any) =>
								`${Utils.getPlayerBadgeEmoteById(m.icon.id)}${
									m.name
								} \`${m.trophies || '-'}\`${
									emojis.bsem2.Trophy
								}`
						)
						.join(`\n`)}\n`
			) //Will add more once i come to know what actually are the roles.
			.setColor(stats.members.find('#' + president.nameColor.slice(4)));
	}

	return {
		status: res.status,
		result: stats,
		embed: embed,
	};
}

/**
 * Gets players brawlers and makes them into a beautiful embed form.
 * @param playerTag Player's Brawl stars player tag.
 */
async function getPlayerBrawlersById(playerTag: string) {
	const res = await fetch(
		`https://bsproxy.royaleapi.dev/v1/players/%23${playerTag}`,
		{ headers: { Authorization: `Bearer ${config.keys.supercell.bs}` } }
	);
	const stats = await res.json();
	let embed = null;
	if (res.status === 200) {
		embed = new MessageEmbed()
			.setAuthor(
				`${Utils.getPlayerBadgeEmoteById(stats.icon.id)}${
					stats.name
				} | ${stats.tag}`
			)
			.setDescription(
				`${stats.brawlers
					.map(
						(b: any) =>
							`${Utils.getBrawlerEmoteById(b.id)}\`${b.power} | ${
								b.rank
							} | ${b.trophies}/${b.highestTrophies}\`${
								emojis.bsem2.Trophy
							}`
					)
					.join(`  `)}`
			); //Will add starpower and gadgets soon, will need their corresponding emotes which is :person_facepalming: just a pain
	}

	return {
		status: res.status,
		result: stats,
		embed: embed,
	};
}
export default {
	getPlayerBrawlStarsStatsById,
	getClubBrawlStarsStatsById,
	getPlayerBrawlersById,
};
