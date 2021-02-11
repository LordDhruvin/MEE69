import { Manager, Payload } from 'erela.js';
import SpotifyClient from 'erela.js-spotify';
import config from '../../Data/config';
import type MageClient from '../Discord Akairo/MageClient';
// Most of this is from "Neo-Akairo" (link_coming_soon_no_internet)
export default class ErelaClient {
	client: MageClient;
	public constructor(client: MageClient) {
		this.client = client;
	}

	async init() {
		if (config.spotify) {
			this.client.music = new Manager({
				nodes: [config.lavalink],
				autoPlay: true,
				send: (id: string, payload: Payload) => {
					const guild = this.client.guilds.cache.get(id);
					if (guild) guild.shard.send(payload);
				},
				plugins: [new SpotifyClient(config.spotify)],
			});
		} else {
			this.client.music = new Manager({
				nodes: [config.lavalink],
				autoPlay: true,
				send: (id: string, payload: Payload) => {
					const guild = this.client.guilds.cache.get(id);
					if (guild) guild.shard.send(payload);
				},
			});
		}
	}
}
