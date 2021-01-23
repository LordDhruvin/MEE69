import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import config from '../Data/config';
import index from '../index';
import emojis from '../Data/emojis';

/**
 * Get's stats of the player from the api, makes an embed, and returns embed and status of the result.
 * @param playerTag Brawl Stars Player tag of the person
 */
async function getPlayerBrawlStarsStats(playerTag: string) {
	const res = await fetch(
		`https://bsproxy.royaleapi.dev/v1/players/%23${playerTag}`,
		{ headers: { Authorization: `Bearer ${config.keys.supercell.bs}` } }
	);
    const stats = await res.json();
    let embed = null
    if(res.status === 200) {
	let totalTrophies =
		stats.soloVictories + stats.duoVictories + stats['3vs3Victories'];
	let brawlers = index.starlistapicache?.data.get('brawlers');
	embed = new MessageEmbed()
		.addField(
			`${stats.name} | ${stats.tag}`,
			`**Trophies:** \`${stats.trophies || '-'}/${
				stats.highestTrophies || '-'
			}\`${emojis.bsem2.Trophy}` +
				`**Power Play:** \`${stats.powerPlayPoints || '-'}/${
					stats.highestPowerPlayPoints || '-'
				}\`${emojis.bsem2.PowerPlayPoints}` +
				`**Solo Victories:** \`${
					stats.soloVictories || '-'
				}/${totalTrophies}\`${emojis.bsem2.SoloShowdown}` +
				`**Duo Victories:** \`${
					stats.duoVictories || '-'
				}/${totalTrophies}\`${emojis.bsem2.DuoShowdown}` +
				`**3v3 Victories:** \`${
					stats['3v3Victories'] || '-'
				}/${totalTrophies}\`${emojis.bsem2['3v3Victories']}` +
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
		result: res,
		embed: embed,
	};
}

export default {
	getPlayerBrawlStarsStats,
};
