import { Schema } from 'mongoose';
import UserDataBaseConnection from '../Index/UserDataBaseConnection';

let DataBaseUser = new Schema({
	id: {
		type: String,
		required: true,
	},
	laser: {
		//Brawl stars player tag
		type: String,
		uppercase: true,
	},
	scroll: {
		//Clash royale player tag
		type: String,
		uppercase: true,
	},
	magic: {
		//Clash of clans player tag
		type: String,
		uppercase: true,
	},
	acceptedRules: {
		//Mage bot will have it's own rules
		//Every change to them, this will go false and there will be a prompt to accept these rules before using the bot.
		type: Boolean,
	},
});

export default UserDataBaseConnection.model('Guild', DataBaseUser);
