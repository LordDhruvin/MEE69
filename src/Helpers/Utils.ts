import emojis from '../Data/emojis';

/**
 * Get progress bar in ascii form
 * @param current Current progress
 * @param maximum Maximum progress
 * @param size size of bar to return
 * @returns progress bar in string-ascii form
 */
function getProgressBar(current: number, maximum: number, size = 10) {
	let percent = current / maximum;
	let progressed = Math.round(size * percent);
	if (progressed === 0) return '▱'.repeat(size);
	let remain = size - progressed;
	let completed = '▰'.repeat(progressed);
	let remaining = '▱'.repeat(remain);
	return `${completed}${remaining}`;
}

/**
 * Get a brawler's resembling discord emote
 * @param brawlerId Brawler's Brawl stars id.
 */
function getBrawlerEmoteById(brawlerId: number) {
	return emojis.bsem1[brawlerId] || emojis.other[404];
}

/**
 * Get a club's Badge's resembling discord emote
 * @param badgeId Brawl stars club's badge ID
 */
function getClubBadgeEmoteById(badgeId: number) {
	return emojis.bsem3[badgeId] || emojis.other[404];
}

/**
 * Get a players Badge's resembling discord emote
 * @param badgeId Brawl stars Player's badge ID
 */
function getPlayerBadgeEmoteById(badgeId: number) {
	return emojis.bsem45[badgeId] || emojis.other[404];
}
export default {
	getProgressBar,
	getBrawlerEmoteById,
	getClubBadgeEmoteById,
	getPlayerBadgeEmoteById,
};
