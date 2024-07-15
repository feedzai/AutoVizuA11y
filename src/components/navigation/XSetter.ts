/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Handles the X number of data elements to be jumped inside a chart.
 *
 * @export
 * @param {React.KeyboardEvent} event
 * @param {string} type
 * @param {number} number
 * @param {HTMLElement} alertDiv
 * @return {number} Number of points being jumped at a time inside the wrapped chart.
 */
export function xSetter({
	event,
	type,
	number,
	alertDiv,
}: {
	event: React.KeyboardEvent;
	type: string;
	number: number;
	alertDiv: HTMLElement;
}): number {
	const { nativeEvent } = event;

	// Show form for Alt (option) + X key combination
	if (nativeEvent.altKey && nativeEvent.code === "KeyX") {
		nativeEvent.preventDefault(); // Prevent default behavior of Alt (option) + X
		const activeElement = document.activeElement as HTMLElement; // Store reference to currently focused element
		const input = prompt("Enter a number above 0:");
		if (input !== null && input !== "") {
			const parsedInput = parseInt(input);
			if (!isNaN(parsedInput) && parsedInput > 0) {
				alertDiv.textContent =
					"You are now jumping " + parsedInput + " data points at a time inside the " + type;
				setTimeout(function () {
					alertDiv.textContent = "\u00A0";
				}, 1000);
				const newNumber = parsedInput;
				activeElement.focus(); // Re-focus the stored element
				return newNumber;
			} else {
				alertDiv.textContent = "Invalid input. Please enter a number.";
				setTimeout(function () {
					alertDiv.textContent = "\u00A0";
				}, 1000);
				activeElement.focus(); // Re-focus the stored element
			}
		} else {
			activeElement.focus(); // Re-focus the stored element
		}
		return number;
	}

	// Subtract one from X
	if (nativeEvent.key === "-") {
		if (number === 1) {
			return number;
		}
		alertDiv.textContent =
			"You are now jumping " + (number - 1) + " data points at a time inside the " + type;
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
		return number - 1;
	}

	// Add one to X
	if (nativeEvent.key === "+") {
		alertDiv.textContent =
			"You are now jumping " + (number + 1) + " data points at a time inside the " + type;
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
		return number + 1;
	}
	return number;
}
