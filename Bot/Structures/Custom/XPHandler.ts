import { MongooseProvider } from 'discord-akairo';
import { Message } from 'discord.js';
import { EventEmitter } from 'events';

//This ain't being used atm because it is under progress + it saves directly by user id which isn't what we want.
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
			let lvl = this._getLevelFromXP(xp)
			xp += px
			this.mdb.set(member!.user.id, 'xp', xp)
			let newlvl = this._getLevelFromXP(xp)
			if(newlvl != lvl) {//This ensures that newlvl is > lvl
				this.emit('levelup', message)
			}
		}
	}

	private _getLevelUpXP(n: number) {
		return 100*(1.2**n)
	}

	private _getLevelFromXP(n: number) {
		let lvl = 0
		while (n >= this._getLevelUpXP(lvl)) {
			n -= this._getLevelUpXP(lvl)
			lvl += 1
		}
		return lvl
	}

	//@ts-ignore Will use later, so just ignore
	private _getRemainingXP(n: number) {
		let x = 0
		let lvl = this._getLevelFromXP(n)
		for (let l = 0; l <= lvl; l++) {
			x += this._getLevelUpXP(l)			
		}//idk what am i doing.
		return x
	}
}
