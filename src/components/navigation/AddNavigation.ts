/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Adds navigation between data elements inside a chart.
 *
 * @export
 */
export function addDataNavigation({
	ref,
	selectorType,
	selectedSeries,
	focusPoint,
}: {
	ref: React.RefObject<HTMLElement>;
	selectorType?: { element?: string; className?: string };
	selectedSeries?: string | string[];
	focusPoint?: HTMLElement | null;
}): void {
	if (!ref.current) return;

	const elements = getElements({ container: ref.current, selectorType, selectedSeries });
	if (!elements.length) return;

	addTabIndex(elements);
	focusFirstElement(elements, focusPoint);
}

/**
 * Get elements based on selector type and selected series.
 *
 * @return Array with HTML elements representing the chart data.
 */
function getElements({
	container,
	selectorType,
	selectedSeries,
}: {
	container: HTMLElement;
	selectorType?: { element?: string; className?: string };
	selectedSeries?: string | string[];
}): HTMLElement[] {
	let elements: NodeListOf<HTMLElement> | HTMLCollectionOf<Element>;
	if (selectorType?.element !== undefined) {
		elements = container.querySelectorAll(selectorType.element);
	} else if (selectorType?.className !== undefined) {
		elements = container.getElementsByClassName(selectorType.className);
	} else {
		return [];
	}

	if (selectedSeries?.length === 0) {
		return Array.from(elements) as HTMLElement[];
	}

	return Array.from(elements).filter((element) =>
		element.classList.contains(`series:${selectedSeries}`),
	) as HTMLElement[];
}

/**
 * Adds a tabindex attribute to an array of HTML elements.
 */
function addTabIndex(elements: HTMLElement[]): void {
	elements.forEach((element) => {
		element.setAttribute("tabindex", "0");
	});
}

/**
 * Adds keyboard focus to a data element.
 */
function focusFirstElement(elements: HTMLElement[], focusPoint?: HTMLElement | null): void {
	if (focusPoint) {
		focusPoint.focus();
	} else {
		elements[0].focus();
	}
}
