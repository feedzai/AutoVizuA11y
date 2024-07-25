/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { getElements } from "../../utils/getElements";

type SelectorType = {
	element?: string;
	className?: string;
};

interface AddAriaLabelsProps {
	chartRef: React.RefObject<HTMLElement>;
	selectorType: SelectorType;
	data: Record<string, any>[];
	descriptor?: string;
	multiSeries?: string;
}

/**
 * Sets a series of attributes on the retrieved DOM elements.
 */
function setElementAttributes(
	element: HTMLElement,
	item: Record<string, any>,
	descriptor: string,
): void {
	const ariaLabel = Object.values(item).join(", ");
	element.setAttribute("aria-label", ariaLabel);
	element.setAttribute("role", "");
	element.setAttribute("aria-roledescription", descriptor);
}

function addSeriesClass(element: HTMLElement, seriesValue: string): void {
	const seriesClass = seriesValue.replace(/ /g, "-");
	element.classList.add(`series:${seriesClass}`);
}

/**
 * Adds aria-labels to data elements inside a chart.
 *
 * @export
 * @param {React.RefObject<HTMLElement>} chartRef - The React reference of the chart.
 * @param {SelectorType} selectorType - The selector to be used when retrieving the data elements.
 * @param {Record<string, any>[]} data - Chart data.
 * @param {string} descriptor - Data descriptor.
 * @param {string} multiSeries - Key in the data object that defines each series;.
 */
export function addAriaLabels({
	chartRef,
	selectorType,
	data,
	descriptor = "",
	multiSeries = "",
}: AddAriaLabelsProps): void {
	if (!chartRef.current) return;
	const elements = getElements({ chartRef, selectorType });

	data.forEach((item, i) => {
		const element = elements[i];
		if (!element) return;
		setElementAttributes(element, item, descriptor);

		if (multiSeries) {
			addSeriesClass(element, item[multiSeries]);
		}
	});
}
