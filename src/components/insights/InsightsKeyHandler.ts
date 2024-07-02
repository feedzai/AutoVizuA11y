/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { insightsComparer } from "./InsightsComparer";
import { insightsSetter } from "./InsightsSetter";
import { overallComparer } from "./OverallComparer";
import { descriptionsChanger } from "../descriptions/DescriptionsChanger";

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
 * @param {HTMLElement[]} elements
 * @param {Function} setTextContent
 * @param {React.RefObject<HTMLElement>} ref
 * @param {string} insights
 * @param {number[]} insightsArray
 * @param {(number[] | undefined)} arrayConverted
 * @param {string} title
 * @param {string[]} descs
 * @param {AutoDescriptionsProps} [autoDescOptions]
 * @return {void}
 */
export function insightsKeyHandler(
	type: string,
	event: React.KeyboardEvent,
	elements: HTMLElement[],
	setTextContent: Function,
	ref: React.RefObject<HTMLElement>,
	insights: string,
	insightsArray: number[],
	arrayConverted: number[] | undefined,
	title: string,
	descs: string[],
	autoDescOptions?: AutoDescriptionsProps,
) {
	if (arrayConverted) {
		const focusedIndex = Array.prototype.findIndex.call(
			elements,
			(el: HTMLElement) => el === document.activeElement,
		);

		const focusedData = arrayConverted[focusedIndex];

		insightsSetter(event, setTextContent, insights, insightsArray);
		insightsComparer(event, setTextContent, insights, insightsArray, focusedData);
		overallComparer(event, setTextContent, insights, arrayConverted, focusedData);
		descriptionsChanger(ref, type, descs, title, autoDescOptions, event);
	}

	return;
}
