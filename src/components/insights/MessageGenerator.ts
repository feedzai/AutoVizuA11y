/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { getOrdinalNumber, median, rounding } from "../../utils";

export type InsightCode = "average" | "maximum value" | "minimum value";

/**
 * Creates the message regarding the insight requested.
 */
export function messageInsights(code: InsightCode, insight: number, focusedData: number): string {
	const difference = Math.abs(insight - focusedData);
	const roundedDifference = rounding(difference);
	if (insight > focusedData) {
		return `The value is ${roundedDifference} below the ${code}`;
	}
	if (insight < focusedData) {
		return `The value is ${roundedDifference} above the ${code}`;
	}
	return `The value is the same as the ${code}`;
}
/**
 * Creates the message regarding the comparison between a data element and all others.
 */
export function messageOverall(arrayConverted: number[], focusedData: number): string {
	const dataSuperConverted = trimAndSort(arrayConverted);
	const positionValue = dataSuperConverted.indexOf(focusedData);
	const med = median(dataSuperConverted);
	if (focusedData === med) {
		return "This is the median value";
	}
	if (focusedData > med) {
		const rank = dataSuperConverted.length - positionValue;
		return `This is ${getOrdinalNumber(rank)} highest value.`;
	}
	if (focusedData < med) {
		const rank = positionValue + 1;
		return `This is ${getOrdinalNumber(rank)} lowest value.`;
	}
	return "";
}
/**
 * Trims and sorts an array of numbers.
 */
function trimAndSort(arrayConverted: number[]): number[] {
	return Array.from(new Set(arrayConverted)).sort((a, b) => a - b);
}
