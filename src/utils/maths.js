/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

//rounds the numbers
export function rounding(number) {
	return Math.round(number * 100) / 100;
}

//calculates the median value
export function median(arr) {
	const sortedArr = arr.sort((a, b) => a - b);
	const mid = Math.floor(sortedArr.length / 2);
	if (sortedArr.length % 2 === 0) {
		return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
	} else {
		return sortedArr[mid];
	}
}

//returns the ordinal number based on a number
export function getOrdinalNumber(number) {
	// 1 would return "1st lowest" or "1st highest"
	if (number === 1) {
		return "";
	}
	const suffixes = ["th", "st", "nd", "rd"];
	const lastDigit = number % 10;
	const suffix = suffixes[lastDigit] || suffixes[0];
	return number + suffix;
}

export function sum(array) {
	return Math.round(array.reduce((a, b) => a + b, 0) * 100) / 100;
}

export function avg(array, sum) {
	return Math.round((sum / array.length || 0) * 100) / 100;
}

export function max(array) {
	return Math.round(Math.max(...array) * 100) / 100;
}

export function min(array) {
	return Math.round(Math.min(...array) * 100) / 100;
}
