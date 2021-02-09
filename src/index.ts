/*
    An Open Source discord bot to fulfil my needs
    Copyright (C) 2021  Dhruvin Purohit

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import MageClient from './Structures/Discord Akairo/MageClient';
import StarlistAPICacher from './Helpers/Starlist-api-cacher';
import config from './Data/config';

const client = new MageClient();

/**
 * Note: If key is not found, this will return null and the other checks for everthing that uses this data * * * *
 * * * * will just return an undefined output (nothing will happen really) * * * * * * * * * * * * * * * * * * * *
 */
var starlist;

if (config.keys.starlist) {
	starlist = new StarlistAPICacher(config.keys.starlist);
	starlist.init();
	starlist.on('ready', (data: Map<any, any>) => {
		client.logger.success(`Cached data successfully\nSize: ${data.size}`, 'Star List API Cacher');
	});
}
export default {
	client: client,
	starlistapicache: starlist,
};
client.start();
