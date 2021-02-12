/**
 * This is necessary.
 */
let devconfig;
try {
	devconfig = require('./config-dev');
	devconfig = devconfig.default;
} catch (e) {}

import safeconfig from './safe-config';

export default {
	bot: {
		token: process.env.TOKEN || devconfig.bot.token,
		owners: devconfig ? devconfig.bot.owners : safeconfig.bot.owners,
		prefix: devconfig ? devconfig.bot.prefix : safeconfig.bot.prefix,
		bsprefix: devconfig ? devconfig.bot.bsprefix : safeconfig.bot.bsprefix,
		color: devconfig ? devconfig.bot.color : safeconfig.bot.color,
		logchannels: {
			error: devconfig
				? devconfig.bot.logchannels.error
				: safeconfig.bot.logchannels.error,
			command: devconfig
				? devconfig.bot.logchannels.command
				: safeconfig.bot.logchannels.command,
			other: devconfig
				? devconfig.bot.logchannels.other
				: safeconfig.bot.logchannels.other,
		},
	},
	database: {
		user: process.env.USER_DB ? process.env.USER_DB : (devconfig ? devconfig.database.user : null),
		guild:
			process.env.GUILD_DB ? process.env.GUILD_DB : (devconfig ? devconfig.database.user : null),
	},
	keys: {
		supercell: {
			bs:
				process.env.BS_API_KEY || devconfig.keys.supercell.bs,
			coc:
				process.env.COC_API_KEY || devconfig.keys.supercell.coc,
			cr:
				process.env.CR_API_KEY || devconfig.keys.supercell.cr,
		},
		starlist:
			process.env.STARLIST_API_KEY ? process.env.STARLIST_API_KEY : (devconfig ? devconfig.keys.starlist : null),
		github:
			process.env.GITHUB_API_KEY || devconfig.keys.github,
	},
	lavalink: {
		host:
			process.env.LAVALINK_HOST ? process.env.LAVALINK_HOST : (devconfig ? devconfig.lavalink.host : null),
		port:
			process.env.LAVALINK_PORT ? Number(process.env.LAVALINK_PORT) : (devconfig ? devconfig.lavalink.port : null),
		password:
			process.env.LAVALINK_PW ? process.env.LAVALINK_PW : (devconfig ? devconfig.lavalink.password : null),
	},
	spotify: {
		clientID: process.env.SPOTIFY_ID ? process.env.SPOTIFY_ID : (devconfig ? devconfig.spotify.clientID : null),
		clientSecret: process.env.SPOTYIFY_SECRET ? process.env.SPOTIFY_SECRET : (devconfig ? devconfig.spotify.clientSecret : null),
	},
};

/**
 * Note: The arrangement has been done in such a way that i can keep the same repository for hosting and for dev build *
 * * * * The format (devconfig file) uses the same format. just fill in your values in the file named dev-config * * * *
 * * * * if process.env[<whatev>] is not there, the bot will use devconfig file and due to safeconfig and devconfig both
 * * * * being there in dev pc but not in host pc, we give priority to devconfig first so that there is no prefix clash
 * * * * or any such things. it is recommended not to change anything. * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * dev-config.ts is to be kept private at all times for the safety of your bot * * * * * * * * * * * * * * * * * *
 * * * * safe-config.ts need not be kept hidden as it has no confidential data * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * Starlist API key (new name Brawlify) is optional due to it being a private api. * * * * * * * * * * * * * * * *
 * * * * GitHub API key can be obtained failry easily. * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
