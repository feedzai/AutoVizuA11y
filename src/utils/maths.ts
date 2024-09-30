/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import * as constants from "./../constants";

/**
 * Rounds a given number to two decimal places.
 *
 * @param {number} number - The number to round.
 * @return {number} Rounded number.
 */
export function rounding(number: number): number {
	return Math.round(number * constants.ROUNDING_FACTOR) / constants.ROUNDING_FACTOR;
}

/**
 * Calculates the median value of an array of numbers.
 *
 * @param {number[]} arr - The array of numbers.
 * @return {number} Median value.
 */
export function median(arr: number[]): number {
	if (arr.length === 0) return 0;

	const sortedArr = [...arr].sort((a, b) => a - b);
	const mid = Math.floor(sortedArr.length / 2);

	return sortedArr.length % 2 === 0 ? (sortedArr[mid - 1] + sortedArr[mid]) / 2 : sortedArr[mid];
}

/**
 * Transforms number to ordinal.
 *
 * @param {number} number - The number to transform.
 * @return {string} Ordinal number.
 */
export function getOrdinalNumber(number: number): string {
	if (number === 1) return "the";

	const suffixes = ["th", "st", "nd", "rd"];
	const lastTwoDigits = number % 100;
	const suffix =
		lastTwoDigits >= 11 && lastTwoDigits <= 13 ? suffixes[0] : suffixes[number % 10] || suffixes[0];

	return `${number}${suffix}`;
}

/**
 * Calculates the sum of an array of numbers.
 *
 * @param {number[]} array - The array of numbers.
 * @return {number} Sum of values.
 */
export function sum(array: number[]): number {
	return rounding(array.reduce((a, b) => a + b, 0));
}

/**
 * Calculates the average of an array of numbers.
 *
 * @param {number[]} array - The array of numbers.
 * @return {number} Average value.
 */
export function avg(array: number[]): number {
	return array.length ? rounding(sum(array) / array.length) : 0;
}

/**
 * Calculates the max of an array of numbers.
 *
 * @param {number[]} array - The array of numbers.
 * @return {number} Maximum value.
 */
export function max(array: number[]): number {
	return array.length ? rounding(Math.max(...array)) : 0;
}

/**
 * Calculates the min of an array of numbers.
 *
 * @param {number[]} array - The array of numbers.
 * @return {number} Minimum value.
 */
export function min(array: number[]): number {
	return array.length ? rounding(Math.min(...array)) : 0;
}
