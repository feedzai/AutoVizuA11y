/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { insightsComparer } from "./InsightsComparer";
import { insightsSetter } from "./InsightsSetter";
import { jumpXcharts, jumpXpoints } from "./JumpX";
import { xSetter } from "./XSetter";
import { overallComparer } from "./OverallComparer";
import { descriptionsChanger } from "../descriptions/Descriptions";
import { skip } from "./Skip";

// Handles the functions related to keypresses
export function keyHandler(
	type,
	event,
	number,
	ref,
	selectorType,
	insights,
	insightsArray,
	arrayConverted,
	title,
	descs,
	series,
	selectedSeries,
	autoDescOptions,
) {
	let elements;
	let alertDiv = ref.current.getElementsByClassName("a11y_alert")[0];

	if (ref.current) {
		if (selectorType.element !== undefined) {
			elements = ref.current.querySelectorAll(selectorType.element);
		} else {
			elements = ref.current.getElementsByClassName(selectorType.className);
		}
	}

	number = xSetter(event, type, number, alertDiv);
	jumpXpoints(event, number, elements, selectedSeries, series);
	jumpXcharts(event, ref);

	if (arrayConverted) {
		let oldArrayConverted = arrayConverted;

		// if (series.length !== 0 && selectedSeries.length !== 0) {
		// 	let currentSeriesPos = series.indexOf(selectedSeries);
		// 	let currentSeriesName = series[currentSeriesPos];

		// 	const currentSeries = [];
		// 	for (let i = 0; i < elements.length; i++) {
		// 		const element = elements[i];
		// 		const a = `series:${currentSeriesName}`;
		// 		if (element.classList.contains(a)) {
		// 			currentSeries.push(element);
		// 		}
		// 	}
		// 	elements = currentSeries;
		// }

		let focusedIndex = Array.prototype.findIndex.call(
			elements,
			(el) => el === document.activeElement,
		);

		// if (series.length !== 0 && selectedSeries.length !== 0) {
		// 	let currentSeriesPos = series.indexOf(selectedSeries);
		// 	focusedIndex = focusedIndex * series.length;
		// }

		let focusedData = arrayConverted[focusedIndex];

		// if (series.length !== 0 && selectedSeries) {
		// 	console.log("oi");
		// 	const flattenedOAC = oldArrayConverted.reduce((total, subArray) => {
		// 		return total.concat(subArray);
		// 	}, []);
		// 	//squash oldArrayConverted;
		// 	console.log("flattenedOAC: " + flattenedOAC);
		// 	arrayConverted = flattenedOAC;
		// }

		insightsSetter(event, alertDiv, insights, insightsArray);
		insightsComparer(event, alertDiv, insights, insightsArray, focusedData);
		overallComparer(event, alertDiv, insights, arrayConverted, focusedData);
		descriptionsChanger(ref, type, descs, title, autoDescOptions, event);
		skip(event, ref, selectorType, selectedSeries);
	}

	return number;
}
