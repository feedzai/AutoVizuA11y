/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { rounding } from "../../utils/maths";

/**
 * Compares the value of the focused data element against various statistical insights.
 *
 * @export
 */
export function insightsComparer({
	event,
	alertDiv,
	insights,
	insightsArray,
	focusedData,
}: {
	event: React.KeyboardEvent;
	alertDiv: HTMLElement;
	insights: string;
	insightsArray: number[];
	focusedData?: number;
}): void {
	const { nativeEvent } = event;

	if (
		nativeEvent.altKey &&
		nativeEvent.shiftKey &&
		(nativeEvent.code === "KeyK" || nativeEvent.code === "KeyL" || nativeEvent.code === "KeyJ") &&
		insights === ""
	) {
		alertDiv.textContent = "That shortcut does not work in this chart";
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000); // 1000 milliseconds = 1 second
	}

	// Data point vs average
	if (
		nativeEvent.altKey &&
		nativeEvent.shiftKey &&
		nativeEvent.code === "KeyK" &&
		insights !== ""
	) {
		if (typeof focusedData === "undefined") {
			alertDiv.textContent = `This shortcut only works inside a chart`;
			return;
		}
		alertDiv.textContent = messageCreator("average", insightsArray[1], focusedData);
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
	// Data point vs max
	if (
		nativeEvent.altKey &&
		nativeEvent.shiftKey &&
		nativeEvent.code === "KeyL" &&
		insights !== ""
	) {
		if (typeof focusedData === "undefined") {
			alertDiv.textContent = "This shortcut only works inside a chart";
			return;
		}
		alertDiv.textContent = messageCreator("maximum value", insightsArray[2], focusedData);
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
	// Data point vs min
	if (
		nativeEvent.altKey &&
		nativeEvent.shiftKey &&
		nativeEvent.code === "KeyJ" &&
		insights !== ""
	) {
		if (typeof focusedData === "undefined") {
			alertDiv.textContent = "This shortcut only works inside a chart";
			return;
		}
		alertDiv.textContent = messageCreator("minimum value", insightsArray[3], focusedData);
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
}

/**
 * Produces a message based on the comparison between a value and a statistical insight.
 *
 * @return The message as a string.
 */
function messageCreator(code: string, insight: number, focusedData: number): string | null {
	if (insight > focusedData)
		return "The value is " + rounding(insight - focusedData) + " below the " + code;
	if (insight < focusedData)
		return "The value is " + rounding(focusedData - insight) + " above the " + code;
	if (insight === focusedData) return "The value is the same as the " + code;

	return null;
}
