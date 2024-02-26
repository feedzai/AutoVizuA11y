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

type SelectorType = {
	element?: string;
	className?: string;
};

// Handles the functions related to keypresses
export function keyHandler(
	type: string,
	event: React.KeyboardEvent,
	number: number,
	ref: React.RefObject<HTMLElement>,
	selectorType: SelectorType,
	insights: string,
	insightsArray: number[],
	arrayConverted: number[] | undefined,
	title: string,
	descs: string[],
	series: string[],
	selectedSeries: string,
	autoDescOptions: boolean,
): number {
	let elements: HTMLElement[] | NodeListOf<HTMLElement> = [];
	let alertDiv: HTMLDivElement;

	if (ref.current) {
		if (selectorType.element !== undefined) {
			elements = ref.current.querySelectorAll(selectorType.element);
		} else {
			elements = Array.from(
				ref.current.getElementsByClassName(selectorType.className || ""),
			) as HTMLElement[];
		}
		alertDiv = ref.current.getElementsByClassName("a11y_alert")[0] as HTMLDivElement;
	} else {
		alertDiv = document.createElement("div"); // Dummy alert div
	}

	number = xSetter(event, type, number, alertDiv);
	jumpXpoints(event, number, elements as HTMLElement[], selectedSeries, series);
	jumpXcharts(event, ref);

	if (arrayConverted) {
		const focusedIndex = Array.prototype.findIndex.call(
			elements,
			(el: HTMLElement) => el === document.activeElement,
		);

		const focusedData = arrayConverted[focusedIndex];

		insightsSetter(event, alertDiv, insights, insightsArray);
		insightsComparer(event, alertDiv, insights, insightsArray, focusedData);
		overallComparer(event, alertDiv, insights, arrayConverted, focusedData);
		descriptionsChanger(ref, type, descs, title, autoDescOptions, event);
		skip(event, ref, selectorType, selectedSeries);
	}

	return number;
}
