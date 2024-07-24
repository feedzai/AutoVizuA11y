/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { getOrdinalNumber, median, rounding } from "../../utils";

/**
 * Creates the message regarding the insight requested.
 *
 * @export
 * @return {(string | null)}
 */
export function messageInsights(code: string, insight: number, focusedData: number): string {
	if (insight > focusedData)
		return "The value is " + rounding(insight - focusedData) + " below the " + code;
	if (insight < focusedData)
		return "The value is " + rounding(focusedData - insight) + " above the " + code;
	if (insight === focusedData) return "The value is the same as the " + code;

	return "";
}

/**
 * Creates the message regarding the comparison between a data element and all others.
 *
 * @export
 * @return {string}
 */
export function messageOverall(arrayConverted: number[], focusedData: number): string {
	const dataSuperConverted = trimAndSort(arrayConverted);
	const positionValue = dataSuperConverted.findIndex((item) => item === focusedData);
	const med = median(dataSuperConverted);

	if (focusedData === med) return "This is the median value";

	if (focusedData > med)
		return (
			"This is " + getOrdinalNumber(dataSuperConverted.length - positionValue) + " highest value."
		);

	if (focusedData < med) return "This is " + getOrdinalNumber(positionValue + 1) + " lowest value.";

	return "";
}

/**
 * Trims and sorts an array of numbers.
 */
function trimAndSort(arrayConverted: number[]): number[] {
	arrayConverted = [...new Set(arrayConverted)];
	arrayConverted.sort((a, b) => a - b);
	return arrayConverted;
}
