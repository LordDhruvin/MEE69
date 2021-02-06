import chalk from 'chalk';

////////////////////////////////////////////////////////
///                  Mage Logger                    ///
//////////////////////////////////////////////////////

/**
 * Logger for Mage Bot
 */
export default class MageLogger {
	constructor() {}
	/**
	 * Pads a single number for unified looks in the console
	 * @param {number} number The number that should be force-padded
	 * @returns {number} The padded number
	 */
	private _forcePadding(number: number): string {
		return (number < 10 ? '0' : '') + number;
	}

	/**
	 * Format the time to basic logger format
	 * @param {Date} now The time in Date() form.
	 * @private
	 * @returns {string} The formatted time
	 */
	private _getFormattedTime(now: Date = new Date()): string {
		const day = this._forcePadding(now.getDate());
		const month = this._forcePadding(now.getMonth() + 1);
		const year = this._forcePadding(now.getFullYear());
		const hour = this._forcePadding(now.getHours());
		const minute = this._forcePadding(now.getMinutes());
		const second = this._forcePadding(now.getSeconds());

		return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
	}

	/**
	 * Logs something related to debugging
	 * @param {string} body body
	 * @param {string} title optional title
	 * @returns {void}
	 */
	public debug(body: string, title: string = 'Debug'): void {
		console.log(
			`${chalk.bold.rgb(
				186,
				85,
				211
			)`[ ${this._getFormattedTime()} ]`} - ${chalk.bold.rgb(
				255,
				69,
				0
			)`[ ${title} ]`}\n${body}`
		);
	}

	/**
	 * Logs something related to error
	 * @param {Error} err The error we want to log
	 * @returns {void}
	 */
	public error(err: Error): void {
		console.log(
			`${chalk.bold.rgb(
				186,
				85,
				211
			)`[ ${this._getFormattedTime()} ]`} - ${chalk.bold.rgb(
				255,
				0,
				0
			)`[ ${err.name} ]`}\n${err.stack}`
		);
	}

	/**
	 * Logs something related to warnings to console
	 * @param {string} body body
	 * @param {string} title optional title
	 */
	public warn(body: string, title: string = 'Warning') {
		console.log(
			`${chalk.bold.rgb(
				186,
				85,
				211
			)`[ ${this._getFormattedTime()} ]`} - ${chalk.bold.rgb(
				255,
				255,
				0
			)`[ ${title} ]`}\n${body}`
		);
	}

	/**
	 * Logs everything else to the console
	 * @param {string} body body
	 * @param {string} title optional title
	 */
	public other(body: string, title: string = 'Other') {
		console.log(
			`${chalk.bold.rgb(
				186,
				85,
				211
			)`[ ${this._getFormattedTime()} ]`} - ${chalk.bold.rgb(
				112,
				128,
				144
			)`[ ${title} ]`}\n${body}`
		);
	}

	/**
	 * Logs success related thing to console
	 * @param {string} body body
	 * @param {string} title optional title
	 */
	public success(body: string, title: string = 'Success') {
		console.log(
			`${chalk.bold.rgb(
				186,
				85,
				211
			)`[ ${this._getFormattedTime()} ]`} - ${chalk.bold.rgb(
				0,
				255,
				0
			)`[ ${title} ]`}\n${body}`
		);
	}

	/**
	 * Logs something to the console
	 * @param {string} type type of log to send
	 * @param {string} body body
	 * @param {string} title Optional title
	 */
	public log(type: string, body: string, title?: string) {
		switch (type.toLowerCase()) {
			case 'command':
				if (!title) title = 'Command';
				console.log(
					`${chalk.bold.rgb(
						186,
						85,
						211
					)`[ ${this._getFormattedTime()} ]`} - ${chalk.bold.rgb(
						0,
						206,
						209
					)`[ ${title} ]`}\n${body}`
				);
				break;

			case 'listener':
				if (!title) title = 'Listener';
				console.log(
					`${chalk.bold.rgb(
						186,
						85,
						211
					)`[ ${this._getFormattedTime()} ]`} - ${chalk.bold.rgb(
						153,
						50,
						204
					)`[ ${title} ]`}\n${body}`
				);
				break;

			case 'inhibitor':
				if (!title) title = 'Inhibitor';
				console.log(
					`${chalk.bold.rgb(
						186,
						85,
						211
					)`[ ${this._getFormattedTime()} ]`} - ${chalk.bold.rgb(
						233,
						150,
						122
					)`[ ${title} ]`}\n${body}`
				);
				break;

			default:
				this.other(body, title);
				break;
		}
	}
}
