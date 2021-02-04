import { EventEmitter } from 'events';
import fetch from 'node-fetch';

export default class StarlistAPICacher extends EventEmitter {
	public constructor(key: string, cachingTime: number = 2 * 60 * 1000) {
		super();
		this._starlist_key = key;
		this._cachingTime = cachingTime;
		this._data = new Map()
		this.is_ready = false;
	}
	//I love ts :)
	private _starlist_key: string;
	private _cachingTime: number;

	public is_ready: boolean;

	private _data: Map<string, any>;

	public get data() {
		return this._data;
	}

	private _sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	private async _fetch(path: string) {
		let temp = await fetch(`https://api.brawlify.com/${path}`, {
			headers: {
				Authorization: `Bearer ${this._starlist_key}`,
			},
		});
		return await temp.json();
	}

	private async _cacher() {
		let events = await this._fetch('events');
		this.data.set('events', events);

		await this._sleep(1 * 1000);

		let brawlers = await this._fetch('brawlers');
		this.data.set('brawlers', brawlers);

		/*
		await this._sleep(1 * 1000);

		let icons = await this._fetch('icons');
		this.data.set('icons', icons);
		*/
		await this._sleep(1 * 1000);

		let maps = await this._fetch('maps');
		this.data.set('maps', maps);

		await this._sleep(1 * 1000);

		let gamemodes = await this._fetch('gamemodes');
		this.data.set('gamemodes', gamemodes);

		await this._sleep(1 * 1000);

		if (!this.is_ready) {
			this.is_ready = true;
			this.emit('ready', this.data);
		}

		await this._sleep(this._cachingTime);

		this._cacher();
		if (!this.is_ready) {
			this.is_ready = true;
			this.emit('ready', this.data);
		}
	}

	public async init(): Promise<void> {
		this._cacher();
	}
}
