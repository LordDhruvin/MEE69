import { GuildMember } from 'discord.js';
import { Structures } from 'discord.js';

export interface MageGuildMember extends GuildMember {
	manageableBy(member?: GuildMember): boolean;
}

export default Structures.extend('GuildMember', (GuildMember) => {
	////////////////////////////////////////////////////////
	///               Mage Guild Member                 ///
	//////////////////////////////////////////////////////

	class MageGuildMember extends GuildMember {
		public constructor(...args: any) {
			// @ts-ignore
			super(...args);
		}

		/**
		 * Checks if the given member is managable by this member according to Discord's Role Hierarchy
		 * @param {GuildMember} [member=this.guild.me] The member to test this with
		 */
		public manageableBy(member = this.guild.me): boolean {
			if (member?.guild !== this.guild) return false;
			if (this.id === member.id) return false;
			if (this.guild.ownerID === this.id) return false;
			if (this.guild.ownerID === member.id) return true;
			else
				return !(
					this.roles.highest.position -
						member.roles.highest.position >
					0
				);
		}
	}

	return MageGuildMember;
});
