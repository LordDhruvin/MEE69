import { Message } from 'discord.js';

export default {
	CLIENT: {
		PROMPT: {
			START: (str: string) =>
				`${str}\n\nType \`cancel\` to cancel command`,
			RETRY: (str: string) =>
				`${str}\n\nType \`cancel\` to cancel command`,
			TIMEOUT: `You took so long that the command got cancelled.`,
			ENDED: (message: Message) =>
				`${message.author}, you failed too many times.\nThe command has been cancelled`,
			CANCEL: `The command has been cancelled.`,
		},
	},
	LISTENERS: {
		CLIENT: {
			READY: "$VAR1: Let's Mage-Ic",
		},
	},
};
