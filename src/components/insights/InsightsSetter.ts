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
 */
export function insightsSetter({
	event,
	setTextContent,
	insights,
	insightsArray,
}: {
	event: React.KeyboardEvent;
	setTextContent: Function;
	insights: string;
	insightsArray: number[];
}): void {
	const { nativeEvent } = event;

	if (
		nativeEvent.altKey &&
		(nativeEvent.code === "KeyK" || nativeEvent.code === "KeyL" || nativeEvent.code === "KeyJ") &&
		insights === ""
	) {
		setTextContent("That shortcut does not work in this chart");
		setTimeout(function () {
			setTextContent("\u00A0");
		}, 1000); // 1000 milliseconds = 1 second
	}
	if (nativeEvent.altKey && nativeEvent.code === "KeyK" && insights !== "") {
		// Average
		setTextContent("The average is " + insightsArray[1]);
		setTimeout(function () {
			setTextContent("\u00A0");
		}, 1000); // 1000 milliseconds = 1 second
	}
	// Max
	if (nativeEvent.altKey && nativeEvent.code === "KeyL" && insights !== "") {
		setTextContent("The maximum is " + insightsArray[2]);
		setTimeout(function () {
			setTextContent("\u00A0");
		}, 1000);
	}
	// Min
	if (nativeEvent.altKey && nativeEvent.code === "KeyJ" && insights !== "") {
		setTextContent("The minimum is " + insightsArray[3]);
		setTimeout(function () {
			setTextContent("\u00A0");
		}, 1000);
	}
}
