/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";
import { getElements } from "../../utils/getElements";

interface SelectorType {
	element?: string;
	className?: string;
}
interface AddDataNavigationParams {
	chartRef: React.RefObject<HTMLElement>;
	selectorType?: SelectorType;
	selectedSeries?: string | string[];
	focusPoint?: HTMLElement | null;
}

/**
 * Adds navigation between data elements inside a chart.
 *
 * @param {Object} params - The parameters for adding data navigation.
 * @param {React.RefObject<HTMLElement>} params.chartRef - Reference to the chart container.
 * @param {SelectorType} [params.selectorType] - Type of selector to use for finding elements.
 * @param {string | string[]} [params.selectedSeries] - Selected series to filter elements.
 * @param {HTMLElement | null} [params.focusPoint] - Specific element to focus on.
 */
export function addDataNavigation({
	chartRef,
	selectorType,
	selectedSeries,
	focusPoint,
}: AddDataNavigationParams): void {
	if (!chartRef.current) {
		console.warn("Chart reference is not available");
		return;
	}

	const elements = getElements({ chartRef, selectorType, selectedSeries });

	if (!elements.length) {
		console.warn("No elements found for navigation");
		return;
	}

	addTabIndex(elements);
	focusFirstElement(elements, focusPoint);
}

/**
 * Adds a tabindex attribute to an array of HTML elements.
 *
 * @param {HTMLElement[]} elements - The elements to add tabindex to.
 */
function addTabIndex(elements: HTMLElement[]): void {
	elements.forEach((element) => {
		element.setAttribute("tabindex", "0");
	});
}

/**
 * Adds keyboard focus to a data element.
 *
 * @param {HTMLElement[]} elements - The array of elements to potentially focus.
 * @param {HTMLElement | null} [focusPoint] - Specific element to focus on.
 */
function focusFirstElement(elements: HTMLElement[], focusPoint?: HTMLElement | null): void {
	if (focusPoint) {
		focusPoint.focus();
	} else if (elements.length > 0) {
		elements[0].focus();
	} else {
		console.warn("No elements available to focus");
	}
}
