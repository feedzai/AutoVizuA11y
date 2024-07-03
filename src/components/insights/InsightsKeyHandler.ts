/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { messageInsights, messageOverall } from "./MessageGenerator";

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
}: {
	event: React.KeyboardEvent;
	elements: HTMLElement[];
	alertDivRef: React.RefObject<HTMLElement>;
	insights: string;
	insightsArray: number[];
	arrayConverted: number[] | undefined;
}) {
	if (arrayConverted) {
		const focusedIndex = Array.prototype.findIndex.call(
			elements,
			(el: HTMLElement) => el === document.activeElement,
		);

		const focusedData = arrayConverted[focusedIndex];
		const { nativeEvent } = event;

		function showMessage(message) {
			alertDivRef.current!.textContent = message;
			setTimeout(() => {
				alertDivRef.current!.textContent = "\u00A0";
			}, 1000);
		}

		switch (true) {
			// Comparison between a data element and statistical insights
			case nativeEvent.altKey &&
				nativeEvent.shiftKey &&
				(nativeEvent.code === "KeyK" ||
					nativeEvent.code === "KeyL" ||
					nativeEvent.code === "KeyJ") &&
				insights === "":
				showMessage("That shortcut does not work in this chart");
				break;
			case nativeEvent.altKey &&
				nativeEvent.shiftKey &&
				nativeEvent.code === "KeyK" &&
				insights !== "":
				if (typeof focusedData === "undefined") {
					showMessage("This shortcut only works inside a chart");
				} else {
					showMessage(messageInsights("average", insightsArray[1], focusedData));
				}
				break;
			case nativeEvent.altKey &&
				nativeEvent.shiftKey &&
				nativeEvent.code === "KeyL" &&
				insights !== "":
				if (typeof focusedData === "undefined") {
					showMessage("This shortcut only works inside a chart");
				} else {
					showMessage(messageInsights("maximum value", insightsArray[2], focusedData));
				}
				break;
			case nativeEvent.altKey &&
				nativeEvent.shiftKey &&
				nativeEvent.code === "KeyJ" &&
				insights !== "":
				if (typeof focusedData === "undefined") {
					showMessage("This shortcut only works inside a chart");
				} else {
					showMessage(messageInsights("minimum value", insightsArray[3], focusedData));
				}
				break;
			// Statistical insights from chart
			case nativeEvent.altKey &&
				(nativeEvent.code === "KeyK" ||
					nativeEvent.code === "KeyL" ||
					nativeEvent.code === "KeyJ") &&
				insights === "":
				showMessage("That shortcut does not work in this chart");
				break;
			case nativeEvent.altKey && nativeEvent.code === "KeyK" && insights !== "":
				showMessage("The average is " + insightsArray[1]);
				break;
			case nativeEvent.altKey && nativeEvent.code === "KeyL" && insights !== "":
				showMessage("The maximum is " + insightsArray[2]);
				break;
			case nativeEvent.altKey && nativeEvent.code === "KeyJ" && insights !== "":
				showMessage("The minimum is " + insightsArray[3]);
				break;
			// Comparison between a data element and all others in a chart
			case nativeEvent.altKey && nativeEvent.code === "KeyZ" && insights === "":
				showMessage("That shortcut does not work in this chart");
				break;
			case nativeEvent.altKey && nativeEvent.code === "KeyZ" && insights !== "":
				if (typeof focusedData === "undefined") {
					showMessage("This shortcut only works inside a chart");
				} else {
					showMessage(messageOverall(arrayConverted, focusedData));
				}
				break;
		}
	}

	return;
}
