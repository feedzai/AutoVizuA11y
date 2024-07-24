/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { wait, isUndefined } from "@feedzai/js-utilities";

import { InsightCode, messageInsights, messageOverall } from "./MessageGenerator";

import * as constants from "../../constants";

type InsightsKeyHandlerProps = {
	event: React.KeyboardEvent;
	elements: HTMLElement[];
	alertDivRef: React.RefObject<HTMLElement>;
	insights: string;
	insightsArray: number[];
	arrayConverted?: number[];
};

/**
 * Listens for keypresses and handles the outcomes.
 *
 * @export
 */
export function insightsKeyHandler({
	event,
	elements,
	alertDivRef,
	insights,
	insightsArray,
	arrayConverted,
}: InsightsKeyHandlerProps) {
	if (!arrayConverted || !alertDivRef.current) return;

	const { altKey, shiftKey, code } = event.nativeEvent;

	const focusedIndex = Array.prototype.findIndex.call(
		elements,
		(el: HTMLElement) => el === document.activeElement,
	);

	const focusedData = arrayConverted[focusedIndex];

	async function showMessage(message: string) {
		alertDivRef.current!.textContent = message;

		await wait(constants.TIMEOUT_DURATION);

		alertDivRef.current!.textContent = "\u00A0";
	}

	const handleInsightComparison = (type: InsightCode, value: number) => {
		if (typeof focusedData === "undefined") {
			showMessage("This shortcut only works inside a chart");
		} else {
			showMessage(messageInsights(type, value, focusedData));
		}
	};

	const handleStatisticalInsight = (message: string) => {
		showMessage(message);
	};

	if (insights === "") {
		showMessage("That shortcut does not work in this chart");
		return;
	}

	if (altKey && shiftKey) {
		switch (code) {
			case "KeyK":
				handleInsightComparison("average", insightsArray[1]);
				break;
			case "KeyL":
				handleInsightComparison("maximum value", insightsArray[2]);
				break;
			case "KeyJ":
				handleInsightComparison("minimum value", insightsArray[3]);
				break;
		}
	} else if (altKey) {
		switch (code) {
			case "KeyK":
				handleStatisticalInsight(`The average is ${insightsArray[1]}`);
				break;
			case "KeyL":
				handleStatisticalInsight(`The maximum is ${insightsArray[2]}`);
				break;
			case "KeyJ":
				handleStatisticalInsight(`The minimum is ${insightsArray[3]}`);
				break;
			case "KeyZ":
				isUndefined(focusedData)
					? showMessage("This shortcut only works inside a chart")
					: showMessage(messageOverall(arrayConverted, focusedData));
				break;
		}
	}

	return;
}
