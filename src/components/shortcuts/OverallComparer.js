/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { median } from "../../utils/maths";
import { getOrdinalNumber } from "../../utils/maths";

//makes the comparison between the focusedData and the overall data
export function overallComparer(event, alertDiv, insights, arrayConverted, focusedData) {
	const { nativeEvent } = event;

	if (nativeEvent.altKey && nativeEvent.code === "KeyZ" && insights === "") {
		alertDiv.textContent = "That shortcut does not work in this chart";
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
		return;
	}
	if (nativeEvent.altKey && nativeEvent.code === "KeyZ" && insights !== "") {
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

//actually compares both values
function comparer(arrayConverted, focusedData) {
	let dataSuperConverted = trimSort(arrayConverted);
	let positionValue = dataSuperConverted.findIndex((item) => item === focusedData);
	let med = median(dataSuperConverted);

	if (focusedData === med) return "This is the median value";

	if (focusedData > med)
		return (
			"This is " + getOrdinalNumber(dataSuperConverted.length - positionValue) + " highest value."
		);

	if (focusedData < med) return "This is " + getOrdinalNumber(positionValue + 1) + " lowest value.";
}

//trims and sorts the data array
function trimSort(arrayConverted) {
	arrayConverted = [...new Set(arrayConverted)];
	arrayConverted.sort((a, b) => a - b);
	return arrayConverted;
}
