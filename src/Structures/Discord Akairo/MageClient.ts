import { Message } from 'discord.js';

import {
	AkairoClient,
	/*MongooseProvider,*/ CommandHandler,
	InhibitorHandler,
	ListenerHandler,
} from 'discord-akairo';
import { Intents } from 'discord.js';
import config from '../../Data/config';
import path from 'path';
import TEXT from '../../Data/text';
import MageLogger from '../../Helpers/Logger';
import { Manager } from 'erela.js';
import ErelaClient from '../Erela/ErelaClient';

////////////////////////////////////////////////////////
///                 Requiring Files                 ///
//////////////////////////////////////////////////////

//Discord.js
require('../Discord.js/MageGuild');
require('../Discord.js/MageGuildMember');
require('../Discord.js/MageRole');
require('../Discord.js/MageTextChannel');
require('../Discord.js/MageUser');

//JavaScript
require('../JavaScript/Array');

//Mongoose
//require('../Mongoose/Index/GuildDataBaseConnection');
//require('../Mongoose/Index/UserDataBaseConnection');
//Not setup yet.

////////////////////////////////////////////////////////
///                   Mage Client                   ///
//////////////////////////////////////////////////////

declare module 'discord-akairo' {
	interface AkairoClient {
		CommandHandler: CommandHandler;
		BrawlStarsCommandHandler: CommandHandler;
		MEE69CommandHandler: CommandHandler;
		meecolor: number | string;
		ListenerHandler: ListenerHandler;
		InhibitorHandler: InhibitorHandler;
		logger: MageLogger;
		text: typeof TEXT;
		baseColor: number | string;
		music: Manager;
		erela: ErelaClient;
	}
}

export default class MageClient extends AkairoClient {
	public text = TEXT;

	public CommandHandler: CommandHandler = new CommandHandler(this, {
		directory: path.join(__dirname, '..', '..', 'Base', 'Commands'), //'../../Base/Commands',
		//(message) => {
		prefix: config.bot.prefix,
		//message.guild ? this.gdb.get(message.guild.id, prefix, config.bot.prefix) : config.bot.prefix
		//},
		aliasReplacement: /-/g,
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		defaultCooldown: 5e3,
		ignoreCooldown: this.ownerID,
		ignorePermissions: this.ownerID,
		automateCategories: true,
		argumentDefaults: {
			prompt: {
				modifyStart: (_: Message, str: string) => {
					this.text.CLIENT.PROMPT.START(str);
				},
				modifyRetry: (_: Message, str: string) => {
					this.text.CLIENT.PROMPT.RETRY(str);
				},
				timeout: this.text.CLIENT.PROMPT.TIMEOUT,
				ended: (message: Message) => {
					this.text.CLIENT.PROMPT.ENDED(message);
				},
				cancel: this.text.CLIENT.PROMPT.CANCEL,
				time: 3 * 10 * 1000,
				retries: 3,
			},
			otherwise: '',
		},
	});

	public BrawlStarsCommandHandler: CommandHandler = new CommandHandler(this, {
		directory: path.join(
			__dirname,
			'..',
			'..',
			'Base',
			'Brawl Stars Commands',
		),
		//(message) => {
		prefix: config.bot.bsprefix,
		//message.guild ? this.gdb.get(message.guild.id, bsprefix, config.bot.bsprefix) : config.bot.bsprefix
		//},
		aliasReplacement: /-/g,
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		defaultCooldown: 5e3,
		ignoreCooldown: this.ownerID,
		ignorePermissions: this.ownerID,
		automateCategories: true,
		argumentDefaults: {
			prompt: {
				modifyStart: (_: Message, str: string) =>
					`${str}\n\nType \`cancel\` to cancel command`,
				modifyRetry: (_: Message, str: string) =>
					`${str}\n\nType \`cancel\` to cancel command`,
				timeout: `You took so long that the command got cancelled.`,
				ended: (message: Message) =>
					`${message.author}, you failed too many times.\nThe command has been cancelled`,
				cancel: `The command has been cancelled.`,
				time: 3 * 10 * 1000,
				retries: 3,
			},
			otherwise: '',
		},
	});

	public MEE69CommandHandler: CommandHandler = new CommandHandler(this, {
		directory: path.join(__dirname, '..', '..', 'Base', 'MEE69 Commands'),
		//(message) => {
		prefix: '!', //to lazy to add this to config
		//message.guild ? this.gdb.get(message.guild.id, bsprefix, config.bot.bsprefix) : config.bot.bsprefix
		//},
		aliasReplacement: /-/g,
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		defaultCooldown: 5e3,
		ignoreCooldown: this.ownerID,
		ignorePermissions: this.ownerID,
		automateCategories: true,
		argumentDefaults: {
			//won't be used as there will be no prompts
			prompt: {
				modifyStart: (_: Message, str: string) =>
					`${str}\n\nType \`cancel\` to cancel command`,
				modifyRetry: (_: Message, str: string) =>
					`${str}\n\nType \`cancel\` to cancel command`,
				timeout: `You took so long that the command got cancelled.`,
				ended: (message: Message) =>
					`${message.author}, you failed too many times.\nThe command has been cancelled`,
				cancel: `The command has been cancelled.`,
				time: 3 * 10 * 1000,
				retries: 3,
			},
			otherwise: '',
		},
	});

	public erela = new ErelaClient(this);
	public meecolor = '#ccff00'; //no i won't save this anywhere

	public baseColor = config.bot.color;

	public InhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: path.join(__dirname, '..', '..', 'Base', 'Inhibitors'),
		automateCategories: true,
	});

	public ListenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: path.join(__dirname, '..', '..', 'Base', 'Listeners'),
		automateCategories: true,
	});

	public logger = new MageLogger();
	//public udb = new MongooseProvider()//UserDataBase
	//public gdb = new MongooseProvider()//GuildDataBase

	public constructor() {
		super(
			{
				ownerID: config.bot.owners,
			},
			{
				partials: [
					'MESSAGE',
					'REACTION',
					'USER',
					'CHANNEL',
					'GUILD_MEMBER',
				],
				presence: {
					afk: true,
				},
				ws: {
					intents: Intents.ALL,
				},
			},
		);
	}

	/**
	 * Initialise the client.
	 * @private
	 */
	private async _init() {
		this.CommandHandler.useListenerHandler(this.ListenerHandler);
		this.CommandHandler.useInhibitorHandler(this.InhibitorHandler);
		this.BrawlStarsCommandHandler.useInhibitorHandler(
			this.InhibitorHandler,
		);
		this.BrawlStarsCommandHandler.useListenerHandler(this.ListenerHandler);
		this.MEE69CommandHandler.useInhibitorHandler(this.InhibitorHandler);
		this.MEE69CommandHandler.useListenerHandler(this.ListenerHandler);
		this.ListenerHandler.setEmitters({
			Bot: this,
			CommandHandler: this.CommandHandler,
			BrawlStarsCommandHandler: this.BrawlStarsCommandHandler,
			MEE69: this.MEE69CommandHandler,
			ListenerHandler: this.ListenerHandler,
			process: process,
			music: this.music,
		}),
			this.CommandHandler.loadAll();
		this.logger.log('Command', 'All commands loaded', 'Command Handler'),
			this.BrawlStarsCommandHandler.loadAll();
		this.logger.log(
			'Command',
			'All Brawl Stars Commands loaded',
			'Brawl Stars Command Handler',
		);
		this.MEE69CommandHandler.loadAll();
		this.logger.log('Command', 'All Commands Loaded', 'MEE69');
		this.ListenerHandler.loadAll();
		this.logger.log('Listener', 'All listeners Loaded', 'Listener Handler'),
			this.InhibitorHandler.loadAll();
		this.logger.log(
			'Inhibitor',
			'All Inhibitors Loaded',
			'Inhibitor Handler',
		);
		//await this.udb.init()
		//await this.gdb.init()
	}

	/**
	 * Start the client and initialize everything
	 * @function
	 */
	async start() {
		await this.erela.init();
		await this._init();
		return this.login(config.bot.token);
	}
}
