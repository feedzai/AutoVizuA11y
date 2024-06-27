/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { median, getOrdinalNumber } from "../../utils/maths";

/**
 * Handles the comparison between a value and all others from the same chart.
 *
 * @export
 * @param {React.KeyboardEvent} event
 * @param {HTMLDivElement} alertDiv
 * @param {string} insights
 * @param {number[]} arrayConverted
 * @param {(number | undefined)} focusedData
 * @return {void}
 */
export function overallComparer(
	event: React.KeyboardEvent,
	alertDiv: HTMLDivElement,
	insights: string,
	arrayConverted: number[],
	focusedData: number | undefined,
): void {
	const { altKey, code } = event;

	if (altKey && code === "KeyZ" && insights === "") {
		alertDiv.textContent = "That shortcut does not work in this chart";
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
		return;
	}
	if (altKey && code === "KeyZ" && insights !== "") {
		if (typeof focusedData === "undefined") {
			alertDiv.textContent = "This shortcut only works inside a chart";
			setTimeout(function () {
				alertDiv.textContent = "\u00A0";
			}, 1000);
			return;
		}
		alertDiv.textContent = comparer(arrayConverted, focusedData);
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
}

/**
 * Produces a message based on the comparison between a value and all others from the same chart.
 *
 * @param {number[]} arrayConverted
 * @param {number} focusedData
 * @return {string} The message as a string.
 */
function comparer(arrayConverted: number[], focusedData: number): string {
	const dataSuperConverted = trimSort(arrayConverted);
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
 *
 * @param {number[]} arrayConverted
 * @return {*}  {number[]} Array of trimmed and sorted numbers.
 */
function trimSort(arrayConverted: number[]): number[] {
	arrayConverted = [...new Set(arrayConverted)];
	arrayConverted.sort((a, b) => a - b);
	return arrayConverted;
}