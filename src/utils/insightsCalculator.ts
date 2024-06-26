/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { sum, avg, max, min } from "./maths";

//calculates insights based on the array with only the values
export function insightsCalculator<T extends number>(arrayConverted: T[]): number[] {
	if (arrayConverted === undefined) {
		return [];
	}
	let insights = [];

	const x = sum(arrayConverted);
	const y = avg(arrayConverted, x);
	const z = max(arrayConverted);
	const w = min(arrayConverted);
	insights = [x, y, z, w];

	return insights;
}
