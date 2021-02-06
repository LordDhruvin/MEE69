import { MongooseProvider } from 'discord-akairo';
import { Message } from 'discord.js';
import { EventEmitter } from 'events';

//This ain't being used atm because it is under progress + it saves directly by user id which isn't what we want.
//I think i will just keep xp a global property, will require whitelisting of guild or soemthing to protect against xp farming
//idk if global then level roles will be hard AF
export default class XPHandler extends EventEmitter {
	//Will do the rest later.

	/**
	 * The class XP handler.
	 * @param mdb Member Database.
	 */
	public constructor(mdb: MongooseProvider) {
		super();

		this.mdb = mdb;
	}

	private mdb: MongooseProvider;

	//@ts-ignore will use this later so just ignore
	private cd: Map<any, any> = new Map()

	/**
	 * Gimme Gimme
	 * @param message - The message that triggered this event.
	 * @param perMessageMinXP - The min amt of xp to be given each message. Better not keep this negative.
	 * @param perMessageMaxXP - The max amt of xp to be given each message. Better not keep this negative.
	 * @param multi - Multiplier
	 */
	public async giveXP(
		message: Message,
		perMessageMinXP: number = 15,
		perMessageMaxXP: number = 25,
		multi: number = 1
	) {
		if(!message.guild) return;
		else {
			let member = message.member;
			let px = Math.ceil(//["x", "p"].reverse()
				(Math.floor(
					Math.random() * (perMessageMaxXP - perMessageMinXP + 1)
				) +
					perMessageMinXP) *
					multi
			);
			let xp = this.mdb.get(member!.user.id, 'xp', 0);
			let lvl = await this.getLevelFromXP(xp)
			xp += px
			this.mdb.set(member!.user.id, 'xp', xp)
			let newlvl = await this.getLevelFromXP(xp)
			if(newlvl != lvl) {//This ensures that newlvl is > lvl
				this.emit('levelup', message)
			}
		}
	}

	public async getLevelUpXP(n: number) {
		return Math.ceil(5 / 6 * n * (2 * n * n + 27 * n + 91))
	}

	public async getLevelFromXP(n: number) {
		let lvl = 1//0 makes no sense.
		//Nvm loop isn't that slow, tested till level 80.
		while (n >= await this.getLevelUpXP(lvl)) {
			lvl += 1
		}
		return lvl
	}

	//@ts-ignore Will use later, so just ignore
	public async getRemainingXP(n: number) {
		let lvl = await this.getLevelFromXP(n)
		let lvlUp = await this.getLevelUpXP(lvl)
		return lvlUp - n
	}
}
