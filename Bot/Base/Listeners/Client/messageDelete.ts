import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Listener {
public constructor() {
super('listener_client_messageDelete', {
emitter: 'Bot',
event: 'messageDelete',
});
}
public async exec(message: Message) {
    if(message.partial) await message.fetch()
    //will do message logs later on.
}
}
