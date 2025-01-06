/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

interface SelectorType {
	element?: string;
	className?: string;
}

interface GetElementsParams {
	chartRef: React.RefObject<HTMLElement>;
	selectorType?: SelectorType;
	selectedSeries?: string | string[];
}

/**
 * Get elements based on selector type and selected series.
 *
 * @export
 * @param {Object} params - The parameters for getting elements.
 * @param {React.RefObject<HTMLElement>} params.chartRef - The container to search for elements.
 * @param {SelectorType} [params.selectorType] - Type of selector to use.
 * @param {string | string[]} [params.selectedSeries] - Selected series to filter elements.
 * @return {HTMLElement[]} Array with HTML elements representing the chart data.
 */
export function getElements({
	chartRef,
	selectorType,
	selectedSeries,
}: GetElementsParams): HTMLElement[] {
	if (!chartRef.current) return [];

	let elements: NodeListOf<HTMLElement> | HTMLCollectionOf<Element>;

	if (selectorType?.element) {
		elements = chartRef.current.querySelectorAll(selectorType.element);
	} else if (selectorType?.className) {
		elements = chartRef.current.getElementsByClassName(selectorType.className);
	} else {
		console.warn("No valid selector type provided");
		return [];
	}

	const elementsArray = Array.from(elements) as HTMLElement[];

	if (!selectedSeries || (Array.isArray(selectedSeries) && selectedSeries.length === 0)) {
		return elementsArray;
	}

	const seriesArray = Array.isArray(selectedSeries) ? selectedSeries : [selectedSeries];

	return elementsArray.filter((element) =>
		seriesArray.some((series) => element.classList.contains(series)),
	);
}
