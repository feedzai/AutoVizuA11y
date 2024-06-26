/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

//adds navigation between data points of charts
export function addDataNavigation(
	ref: React.RefObject<HTMLElement>,
	selectorType?: { element?: string; className?: string },
	selectedSeries?: string | string[],
	focusPoint?: HTMLElement | null,
): void {
	if (!ref.current) return;

	const elements = getElements(ref.current, selectorType, selectedSeries);
	if (!elements.length) return;

	addTabIndex(elements);
	focusFirstElement(elements, focusPoint);
}

// Get elements based on selector type and selected series
function getElements(
	container: HTMLElement,
	selectorType?: { element?: string; className?: string },
	selectedSeries?: string | string[],
): HTMLElement[] {
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

// Add tabindex attribute to elements
function addTabIndex(elements: HTMLElement[]): void {
	elements.forEach((element) => {
		element.setAttribute("tabindex", "0");
	});
}

// Focus on the first element or the provided focus point
function focusFirstElement(elements: HTMLElement[], focusPoint?: HTMLElement | null): void {
	if (focusPoint) {
		focusPoint.focus();
	} else {
		elements[0].focus();
	}
}