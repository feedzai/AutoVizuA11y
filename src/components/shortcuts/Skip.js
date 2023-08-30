/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

//adds the option to skip to the end/beginning of chart
export function skip(event, ref, selectorType, selectedSeries) {
	let elements = [];
	let activeElement = document.activeElement;

	if (selectorType.element !== undefined) {
		elements = ref.current.querySelectorAll(selectorType.element);
	} else {
		elements = ref.current.getElementsByClassName(selectorType.className);
	}

	if (selectedSeries.length !== 0) {
		const filteredElements = [];
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			const a = `series:${selectedSeries}`;
			if (element.classList.contains(a)) {
				filteredElements.push(element);
			}
		}
		elements = filteredElements;
	}

	//if the elements are focusable (eg buttons) it would work in chart level
	let aux = Array.from(elements);
	if (!aux.includes(activeElement)) {
		return;
	}

	//skips to the beggining
	if ((event.altKey && event.code === "KeyQ") || event.code === "Home") {
		event.preventDefault();
		elements[0].focus();
	}

	//skips to the end
	if ((event.altKey && event.code === "KeyW") || event.code === "End") {
		event.preventDefault();
		elements[elements.length - 1].focus();
	}
	return;
}
