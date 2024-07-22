/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Rounds a given number to two decimal places.
 *
 * @export
 * @return Rounded number.
 */
export function rounding(number: number) {
	return Math.round(number * 100) / 100;
}

/**
 * Calculates the median value of an array of numbers.
 *
 * @export
 * @return Median value.
 */
export function median(arr: number[]) {
	const sortedArr = arr.sort((a, b) => a - b);
	const mid = Math.floor(sortedArr.length / 2);
	if (sortedArr.length % 2 === 0) {
		return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
	} else {
		return sortedArr[mid];
	}
}

/**
 * Transforms number to ordinal.
 *
 * @export
 * @return Ordinal number.
 */
export function getOrdinalNumber(number: number) {
	// 1 would return "1st lowest" or "1st highest"
	if (number === 1) {
		return "";
	}
	const suffixes = ["th", "st", "nd", "rd"];
	const lastDigit = number % 10;
	const suffix = suffixes[lastDigit] || suffixes[0];
	return number + suffix;
}

/**
 * Calculates the sum of an array of numbers.
 *
 * @export
 * @return Sum of values.
 */
export function sum(array: number[]) {
	return Math.round(array.reduce((a, b) => a + b, 0) * 100) / 100;
}

/**
 * Calculates the average of an array of numbers.
 *
 * @export
 * @return Average value.
 */
export function avg(array: number[], sum: number) {
	return Math.round((sum / array.length || 0) * 100) / 100;
}

/**
 * Calculates the max of an array of numbers.
 *
 * @export
 * @return Maximum value.
 */
export function max(array: number[]) {
	return Math.round(Math.max(...array) * 100) / 100;
}

/**
 * Calculates the min of an array of numbers.
 *
 * @export
 * @return Minimum value.
 */
export function min(array: number[]) {
	return Math.round(Math.min(...array) * 100) / 100;
}
