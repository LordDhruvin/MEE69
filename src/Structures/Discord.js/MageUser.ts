import { Structures } from 'discord.js';
import blacklist from '../../Data/blacklist';

declare module 'discord.js' {
	interface User {
		banned: boolean;
	}
}

export default Structures.extend('User', (User) => {
	////////////////////////////////////////////////////////
	///                   Mage User                     ///
	//////////////////////////////////////////////////////

	class MageUser extends User {
		public constructor(...args: any) {
			// @ts-ignore
			super(...args);
		}

		/**
		 * Check if a User is banned or not
		 */
		public get banned(): boolean {
			if (blacklist.users.includes(this.id)) return true;
			else return false;
		}
	}

	return MageUser;
});
