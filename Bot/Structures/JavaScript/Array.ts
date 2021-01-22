/**
 * Note: The followinng method is not a suggested method and hence I do not recommend doing so.
 */
/**
 * Better JavaScript Array
 */
interface Array<T> {
	random(): void;
	drop(element: any): void;
	shuffle(): void;
}
/**
 * Gets a random element from the array
 */
Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};

/**
 * Drops a given element from the array
 * @param {*} element The element to be dropped
 */
Array.prototype.drop = function (element: any) {
	if (this.indexOf(element) > -1) {
		this.splice(this.indexOf(element), 1);
	}
	return this;
};

/**
 * Shuffles the array
 */
Array.prototype.shuffle = function () {
	let arr = this.slice(0);
	for (let i = arr.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * i + 1);
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
};
