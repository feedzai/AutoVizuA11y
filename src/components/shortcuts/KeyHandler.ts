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

type AutoDescriptionsProps = {
	dynamicDescriptions?: boolean;
	apiKey: string;
	model?: string;
	temperature?: number;
};

/**
 * Listens for keypresses and handles the outcomes.
 *
 * @export
 * @param {string} type
 * @param {React.KeyboardEvent} event
 * @param {number} number
 * @param {React.RefObject<HTMLElement>} ref
 * @param {SelectorType} selectorType
 * @param {string} insights
 * @param {number[]} insightsArray
 * @param {(number[] | undefined)} arrayConverted
 * @param {string} title
 * @param {string[]} descs
 * @param {string[]} series
 * @param {string} selectedSeries
 * @param {AutoDescriptionsProps} [autoDescOptions]
 * @return {number} Number of points being jumped at a time inside the wrapped chart.
 */
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
	autoDescOptions?: AutoDescriptionsProps,
): number {
	let elements: HTMLElement[] = [];
	let alertDiv: HTMLDivElement;

	if (ref.current) {
		if (selectorType.element !== undefined) {
			elements = Array.from(ref.current.querySelectorAll(selectorType.element));
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

	const charts = Array.from(document.getElementsByClassName("a11y_desc"));
	const chart = ref.current?.getElementsByClassName("a11y_desc")[0] as HTMLElement;
	if (chart === document.activeElement && charts.includes(chart)) {
		jumpXcharts(event, charts, chart);
	} else {
		jumpXpoints(event, number, elements as HTMLElement[], selectedSeries, series);
	}

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
