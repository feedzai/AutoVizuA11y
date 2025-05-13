/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { wait, isUndefined } from "@feedzai/js-utilities";

import { messageInsights, messageOverall } from "./MessageGenerator";

import * as constants from "../../constants";
import { TFunction } from "i18next";

type InsightsKeyHandlerProps = {
	event: React.KeyboardEvent;
	elements: HTMLElement[];
	alertDivRef: React.RefObject<HTMLElement>;
	insights: string;
	insightsArray: number[];
	arrayConverted?: number[];
	t: TFunction<"translation", undefined>;
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
	t,
}: InsightsKeyHandlerProps) {
	const shortcut_error = t("shortcut_error");
	const shortcut_error2 = t("shortcut_error2");
	const average_word = t("average");
	const maximum_word = t("maximum");
	const minimum_word = t("minimum");
	const average_message = t("average_message");
	const maximum_message = t("maximum_message");
	const minimum_message = t("minimum_message");

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

	const handleInsightComparison = (type: string, value: number) => {
		if (insights === "") {
			showMessage(shortcut_error2);
			return;
		} else if (typeof focusedData === "undefined") {
			showMessage(shortcut_error);
		} else {
			showMessage(messageInsights(type, value, focusedData, t));
		}
	};

	const handleStatisticalInsight = (message: string) => {
		if (insights === "") {
			showMessage(shortcut_error2);
			return;
		} else {
			showMessage(message);
		}
	};

	if (altKey && shiftKey) {
		switch (code) {
			case "KeyK":
				handleInsightComparison(average_word, insightsArray[1]);
				break;
			case "KeyL":
				handleInsightComparison(maximum_word, insightsArray[2]);
				break;
			case "KeyJ":
				handleInsightComparison(minimum_word, insightsArray[3]);
				break;
		}
	} else if (altKey) {
		switch (code) {
			case "KeyK":
				handleStatisticalInsight(`${average_message} ${insightsArray[1]}`);
				break;
			case "KeyL":
				handleStatisticalInsight(`${maximum_message} ${insightsArray[2]}`);
				break;
			case "KeyJ":
				handleStatisticalInsight(`${minimum_message} ${insightsArray[3]}`);
				break;
			case "KeyZ":
				if (insights === "") {
					showMessage(shortcut_error2);
					break;
				}

				showMessage(
					isUndefined(focusedData)
						? shortcut_error
						: messageOverall(arrayConverted, focusedData, t),
				);
				break;
		}
	}

	return;
}
