import { Role } from 'discord.js';
import { Structures } from 'discord.js';

export interface MageRole extends Role {
	higherThan(role?: Role): boolean;
}

export default Structures.extend('Role', (Role) => {
	////////////////////////////////////////////////////////
	///                   Mage Role                     ///
	//////////////////////////////////////////////////////

	class MageRole extends Role {
		public constructor(...args: any) {
			// @ts-ignore
			super(...args);
		}

		/**
		 * Checks if the given role is higher than this role or not
		 * @param {Role} role The role to compare this role with
		 */
		public higherThan(role = this.guild.me?.roles.highest): boolean {
			if (!role) return false;
			if (role.guild !== this.guild) return false;
			else return this.position - role.position > 0;
		}
	}

	return MageRole;
});
