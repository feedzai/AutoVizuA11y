/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

//adds the option to skip to the end/beginning of chart
export function skip(event, ref, selectorType, selectedSeries) {
	let elements = [];
	let activeElement = document.activeElement;
	const { nativeEvent } = event;

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
	if ((nativeEvent.altKey && nativeEvent.code === "KeyQ") || nativeEvent.code === "Home") {
		nativeEvent.preventDefault();
		elements[0].focus();
	}

	//skips to the end
	if ((nativeEvent.altKey && nativeEvent.code === "KeyW") || nativeEvent.code === "End") {
		nativeEvent.preventDefault();
		elements[elements.length - 1].focus();
	}
	return;
}
