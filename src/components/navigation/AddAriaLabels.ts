/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Adds aria-labels to data elements inside a chart.
 *
 * @export
 * @param {React.RefObject<HTMLElement>} ref
 * @param {(string | undefined)} descriptor
 * @param {{ element?: string; className?: string }} selectorType
 * @param {object[]} data
 * @param {(string | undefined)} multiSeries
 * @return {*}  {void}
 */
export function addAriaLabels({
	ref,
	descriptor,
	selectorType,
	data,
	multiSeries,
}: {
	ref: React.RefObject<HTMLElement>;
	descriptor: string | undefined;
	selectorType: { element?: string; className?: string };
	data: object[];
	multiSeries: string | undefined;
}): void {
	if (!ref.current) return;

	let elements: HTMLElement[] = [];
	//either the data points are set given their tag (element) or class (className)
	if (selectorType.element !== undefined) {
		elements = Array.from(ref.current.querySelectorAll(selectorType.element)); // e.g.<rect>
	} else if (selectorType.className !== undefined) {
		elements = Array.from(
			ref.current.getElementsByClassName(selectorType.className),
		) as HTMLElement[]; //e.g."device-group"
	}

	data.forEach((item, i) => {
		const ariaLabel = Object.values(item).join(", "); // join all values with a comma and space
		const element = elements[i];
		if (element !== undefined) {
			element.setAttribute("aria-label", ariaLabel);
			element.setAttribute("role", "");
			element.setAttribute("aria-roledescription", descriptor ? descriptor : "");
			if (multiSeries && multiSeries !== "") {
				const seriesClass = (item as any)[multiSeries].replace(/ /g, "-");
				element.classList.add(`series:${seriesClass}`);
			}
		}
	});
}
