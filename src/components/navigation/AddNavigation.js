/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

//adds navigation between data points of charts
export function addDataNavigation(ref, selectorType, selectedSeries, focusPoint) {
	if (ref.current) {
		let elements;
		//either the data points are set given their tag (element) or class (className)
		if (selectorType.element !== undefined) {
			elements = ref.current.querySelectorAll(selectorType.element); // e.g.<rect>
		} else if (selectorType.className !== undefined) {
			elements = ref.current.getElementsByClassName(selectorType.className); //e.g."device-group"
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
		for (var i = 0; i < elements.length; i++) {
			elements[i].setAttribute("tabindex", "0");
		}

		if (focusPoint) {
			focusPoint.focus();
		} else {
			elements[0].focus();
		}
	}
	return;
}
