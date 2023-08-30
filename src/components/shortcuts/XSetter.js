/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

export function xSetter(event, type, number, alertDiv) {
	// show form for Alt+X key combination
	if (event.altKey && event.code === "KeyX") {
		event.preventDefault(); // prevent default behavior of Alt+X
		const activeElement = document.activeElement; // store reference to currently focused element
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
				activeElement.focus(); // re-focus the stored element
				return newNumber;
			} else {
				alertDiv.textContent = "Invalid input. Please enter a number.";
				setTimeout(function () {
					alertDiv.textContent = "\u00A0";
				}, 1000);
				activeElement.focus(); // re-focus the stored element
			}
		} else {
			activeElement.focus(); // re-focus the stored element
		}
		return number;
	}

	// subtract one from X
	if (event.key === "-") {
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

	// add one to X
	if (event.key === "+") {
		alertDiv.textContent =
			"You are now jumping " + (number + 1) + " data points at a time inside the " + type;
		setTimeout(function () {
			alertDiv.textContent = "\u00A0";
		}, 1000);
		return number + 1;
	}
	return number;
}
