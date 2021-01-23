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
 * @param brawler Brawler
 */
function getBrawlerEmoteByName(brawler: string) {
	return emojis.bsem1[brawler] || emojis.other[404];
}

/**
 * @param brawlerId Brawler's Brawl stars player id.
 */
function getBrawlerEmoteById(brawlerId: number) {
	return emojis.bsem01[brawlerId] || emojis.other[404];
}

export default {
	getProgressBar,
	getBrawlerEmoteByName,
	getBrawlerEmoteById,
};
