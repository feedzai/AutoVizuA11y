/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

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

function getElements(chart: HTMLElement, selectorType: SelectorType): HTMLElement[] {
	if (selectorType.element) {
		return Array.from(chart.querySelectorAll(selectorType.element));
	} else if (selectorType.className) {
		return Array.from(chart.getElementsByClassName(selectorType.className)) as HTMLElement[];
	}
	return [];
}

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
 */
export function addAriaLabels({
	chartRef,
	selectorType,
	data,
	descriptor = "",
	multiSeries = "",
}: AddAriaLabelsProps): void {
	const chart = chartRef.current;
	if (!chart) return;
	const elements = getElements(chart, selectorType);

	data.forEach((item, i) => {
		const element = elements[i];
		if (!element) return;
		setElementAttributes(element, item, descriptor);

		if (multiSeries) {
			addSeriesClass(element, item[multiSeries]);
		}
	});
}
