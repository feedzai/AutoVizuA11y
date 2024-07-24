/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { sum, avg, max, min } from "./maths";
/**
 * Calculates insights based on the array with only the values.
 *
 * @export
 * @param {number[]} arrayConverted - The array of numbers to calculate insights from.
 * @return {number[]} Array with the sum, average, maximum and minimum values.
 */
export function insightsCalculator(arrayConverted: number[]): number[] {
	if (!arrayConverted || arrayConverted.length === 0) {
		return [];
	}
	const total = sum(arrayConverted);
	const average = avg(arrayConverted);
	const maximum = max(arrayConverted);
	const minimum = min(arrayConverted);
	return [total, average, maximum, minimum];
}
