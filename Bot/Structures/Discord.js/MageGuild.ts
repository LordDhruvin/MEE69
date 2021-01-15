import { Structures }  from 'discord.js'
import blacklist from '../../Data/blacklist'

declare module 'discord.js' {
    interface Guild {
    banned: boolean
    }
}

export default Structures.extend('Guild', Guild => {

    ////////////////////////////////////////////////////////
    ///                   Mage Guild                    ///
    //////////////////////////////////////////////////////

    class MageGuild extends Guild {
        public constructor(...args: any) {
            // @ts-ignore
            super(...args)
        }

        public get banned(): boolean {
            if(blacklist.guilds.includes(this.id)) return true
            else return false
        }
    }

    return MageGuild
})