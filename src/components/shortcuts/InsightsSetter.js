/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

//sets an alert on top of the chart depending on the insight asked
//insights = [sum, average, max, min];
export function insightsSetter(event, alertDiv, insights, insightsArray, series, selectedSeries) {
	if (
		event.altKey &&
		(event.code === "KeyK" || event.code === "KeyL" || event.code === "KeyJ") &&
		insights === false
	) {
		alertDiv.textContent = "That shortcut does not work in this chart";
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000); // 1000 milliseconds = 1 second
	}
	if (event.altKey && event.code === "KeyK" && insights !== false) {
		//average
		alertDiv.textContent = "The average is " + insightsArray[1];
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000); // 1000 milliseconds = 1 second
	}
	//max
	if (event.altKey && event.code === "KeyL" && insights !== false) {
		alertDiv.textContent = "The maximum is " + insightsArray[2];
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
	//min
	if (event.altKey && event.code === "KeyJ" && insights !== false) {
		alertDiv.textContent = "The minimum is " + insightsArray[3];
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
	}
}
