/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

//adds aria-labels to various data points
export function addsAriaLabels(ref, descriptor, selectorType, data, multiSeries) {
	let elements = [];

	//either the data points are set given their tag (element) or class (className)
	if (selectorType.element !== undefined && ref.current !== null) {
		elements = ref.current.querySelectorAll(selectorType.element); // e.g.<rect>
	} else if (selectorType.className !== undefined && ref.current !== null) {
		elements = ref.current.getElementsByClassName(selectorType.className); //e.g."device-group"
	}

	data.forEach((item, i) => {
		const ariaLabel = Object.values(item).join(", "); // join all values with a comma and space
		if (elements[i] !== undefined) {
			elements[i].setAttribute("aria-label", ariaLabel);
			elements[i].setAttribute("role", "");
			elements[i].setAttribute("aria-roledescription", descriptor ? descriptor : "");
			if (multiSeries && multiSeries != "") {
				const seriesClass = item[multiSeries].replace(/ /g, "-");
				elements[i].setAttribute("class", `series:${seriesClass}`);
			}
		}
	});
}
