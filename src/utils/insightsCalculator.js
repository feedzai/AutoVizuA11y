/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

import { sum, avg, max, min } from "../utils/maths";

//calculates insights based on the array with only the values
export function insightsCalculator(arrayConverted, multiSeries) {
	if (arrayConverted === undefined) {
		return;
	}
	let insights = [];

	if (multiSeries) {
		const flattenedArray = arrayConverted.reduce((total, subArray) => {
			return total.concat(subArray);
		}, []);
		arrayConverted = flattenedArray;
	}

	let x = sum(arrayConverted);
	let y = avg(arrayConverted, x);
	let z = max(arrayConverted);
	let w = min(arrayConverted);
	insights = [x, y, z, w];

	return insights;
}
