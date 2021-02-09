import { Structures } from 'discord.js';
import blacklist from '../../Data/blacklist';
import MageClient from '../Discord Akairo/MageClient';
import { Player } from 'erela.js';

declare module 'discord.js' {
	interface Guild {
		banned: boolean;
		player(): Promise<Player | undefined>;
	}
}

export default Structures.extend('Guild', (Guild) => {
	////////////////////////////////////////////////////////
	///                   Mage Guild                    ///
	//////////////////////////////////////////////////////

	class MageGuild extends Guild {
		public constructor(...args: any) {
			// @ts-ignore
			super(...args);
		}

		public get banned(): boolean {
			if (blacklist.guilds.includes(this.id)) return true;
			else return false;
		}

		public async player() {
			let player = await (this.client as MageClient).music.players?.get(this.id)
			if(player) return player
			else return undefined
		}
	}

	return MageGuild;
});
