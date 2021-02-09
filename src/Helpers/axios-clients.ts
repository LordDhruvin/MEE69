import axios from 'axios';

let clashofclans = axios.create({
	baseURL: 'some_url',
	timeout: 10 * 1000,
	headers: {
		F_i_need_to_add_this_here: 'f_go_get_the_token_here_lol',
	},
});

let clashroyale = axios.create({
	baseURL: 'some_url',
	timeout: 10 * 1000,
	headers: {
		F_i_need_to_add_this_here: 'f_go_get_the_token_here_lol',
	},
});

let brawlstars = axios.create({
	baseURL: 'some_url',
	timeout: 10 * 1000,
	headers: {
		F_i_need_to_add_this_here: 'f_go_get_the_token_here_lol',
	},
});

export default {
	clashofclans: clashofclans,
	brawlstars: brawlstars,
	clashroyale: clashroyale,
};
