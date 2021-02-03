import { Schema } from 'mongoose';
import GuildDataBaseConnection from '../Index/GuildDataBaseConnection';

let DataBaseGuild = new Schema({
	id: {
		type: String,
		required: true,
	},
	prefix: {
		type: String,
	},
	logs: {
		msg: String, //Message Logs
		mmb: String, //Member Logs
		gld: String, //Guild Logs
	} /*
    disabledCommands: {
        type: Array
    },
    disabledCategories: {
        type: Array
    },*/, //I don't think needed for now, will add if someone asks me to allow this functionality
	laser: {
		//Brawl stars club tag.
		type: String,
		uppercase: true,
	},
	scroll: {
		//Clash royale clan tag
		type: String,
		uppercase: true,
	},
	magic: {
		//Clash of clans clan tag
		type: String,
		uppercase: true,
	},
	premiumTier: {
		//No you cannot pay to use this, i might give them to you if i wish to.
		type: Number,
		max: 3,
		min: 1,
	},
	//never worked with schema inside schema before. let's see how this goes
	members: new Schema({
		id: {
			type: String,
			required: true,
		},
		xp: {
			type: Number,
		},
		warns: new Schema({
			//Schema inside Schema inside Schema
			rsn: {
				type: String,
				maxlength: 64,
			},
		}),
	}),
	rr: {
		//Reaction roles
		type: Map, //I didn't know this exists or if this will even work.
		//If it does, messageId will be key and value will be an array of [0] = reactionEmojiID & [1] = Role id
	},
	sb: {
		//Starboard
		type: String,
	},
	//ToDO: Add more. this bot should be feature rich.
});

export default GuildDataBaseConnection.model('Guild', DataBaseGuild);
