import { Listener } from "discord-akairo";

export default class extends Listener {
    public constructor() {
        super('listener_client_error', {
            emitter: 'Bot',
            event: 'error'
        })
    }

    public async exec(error: Error) {
        this.client.logger.error(error)
    }
}