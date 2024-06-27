/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Sets an alert with the statistical insight requested.
 *
 * @export
 * @param {React.KeyboardEvent} event
 * @param {HTMLElement} alertDiv
 * @param {string} insights
 * @param {number[]} insightsArray
 */
export function insightsSetter(
	event: React.KeyboardEvent,
	alertDiv: HTMLElement,
	insights: string,
	insightsArray: number[],
): void {
	const { nativeEvent } = event;

	if (
		nativeEvent.altKey &&
		(nativeEvent.code === "KeyK" || nativeEvent.code === "KeyL" || nativeEvent.code === "KeyJ") &&
		insights === ""
	) {
		alertDiv.textContent = "That shortcut does not work in this chart";
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000); // 1000 milliseconds = 1 second
	}
	if (nativeEvent.altKey && nativeEvent.code === "KeyK" && insights !== "") {
		// Average
		alertDiv.textContent = "The average is " + insightsArray[1];
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000); // 1000 milliseconds = 1 second
	}
	// Max
	if (nativeEvent.altKey && nativeEvent.code === "KeyL" && insights !== "") {
		alertDiv.textContent = "The maximum is " + insightsArray[2];
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
	// Min
	if (nativeEvent.altKey && nativeEvent.code === "KeyJ" && insights !== "") {
		alertDiv.textContent = "The minimum is " + insightsArray[3];
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
}
