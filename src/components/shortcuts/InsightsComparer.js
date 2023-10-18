/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { rounding } from "../../utils/maths";

//compares the focusedData against various insights
//insights = [sum, average, max, min];
export function insightsComparer(event, alertDiv, insights, insightsArray, focusedData) {
	if (
		event.nativeEvent.altKey &&
		event.nativeEvent.shiftKey &&
		(event.nativeEvent.code === "KeyK" ||
			event.nativeEvent.code === "KeyL" ||
			event.nativeEvent.code === "KeyJ") &&
		insights === false
	) {
		alertDiv.textContent = "That shortcut does not work in this chart";
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000); // 1000 milliseconds = 1 second
	}

	//data point vs average
	if (
		event.nativeEvent.altKey &&
		event.nativeEvent.shiftKey &&
		event.nativeEvent.code === "KeyK" &&
		insights !== false
	) {
		if (typeof focusedData === "undefined") {
			alertDiv.textContent = `This shortcut only works inside a chart`;
			return;
		}
		alertDiv.textContent = comparer("average", insightsArray[1], focusedData);
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
	//data point vs max
	if (
		event.nativeEvent.altKey &&
		event.nativeEvent.shiftKey &&
		event.nativeEvent.code === "KeyL" &&
		insights !== false
	) {
		if (typeof focusedData === "undefined") {
			alertDiv.textContent = "This shortcut only works inside a chart";
			return;
		}
		alertDiv.textContent = comparer("maximum value", insightsArray[2], focusedData);
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
	//data point vs min
	if (
		event.nativeEvent.altKey &&
		event.nativeEvent.shiftKey &&
		event.nativeEvent.code === "KeyJ" &&
		insights !== false
	) {
		if (typeof focusedData === "undefined") {
			alertDiv.textContent = "This shortcut only works inside a chart";
			return;
		}
		alertDiv.textContent = comparer("minimum value", insightsArray[3], focusedData);
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
}

//produces the message based on the comparison
function comparer(code, insight, focusedData) {
	if (insight > focusedData)
		return "The value is " + rounding(insight - focusedData) + " bellow the " + code;
	if (insight < focusedData)
		return "The value is " + rounding(focusedData - insight) + " above the " + code;
	if (insight === focusedData) return "The value is the same as the " + code;
}
