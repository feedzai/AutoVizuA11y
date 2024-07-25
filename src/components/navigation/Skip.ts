/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";

interface SkipParams {
	event: React.KeyboardEvent;
	chartRef: React.RefObject<HTMLElement>;
	selectorType: {
		element?: string;
		className?: string;
	};
	selectedSeries: string;
}

/**
 * Enables the navigation to the end/beginning of a chart.
 *
 * @param {SkipParams} params - The parameters for the skip function.
 */
export function skip({ event, chartRef, selectorType, selectedSeries }: SkipParams): void {
	const elements = getElements(chartRef, selectorType, selectedSeries);
	const activeElement = document.activeElement as HTMLElement | null;

	if (!activeElement || !elements.includes(activeElement)) {
		return;
	}
	const { nativeEvent } = event;

	if (isSkipToBeginning(nativeEvent)) {
		nativeEvent.preventDefault();
		elements[0]?.focus();
	} else if (isSkipToEnd(nativeEvent)) {
		nativeEvent.preventDefault();
		elements[elements.length - 1]?.focus();
	}
}

/**
 * Retrieves the DOM elements corresponding to the data elements.
 */
function getElements(
	chartRef: React.RefObject<HTMLElement>,
	selectorType: { element?: string; className?: string },
	selectedSeries: string,
): HTMLElement[] {
	let elements: HTMLElement[] = [];

	if (selectorType.element && chartRef.current) {
		elements = Array.from(chartRef.current.querySelectorAll<HTMLElement>(selectorType.element));
	} else if (selectorType.className && chartRef.current) {
		elements = Array.from(
			chartRef.current.getElementsByClassName(selectorType.className),
		) as HTMLElement[];
	}

	if (selectedSeries) {
		elements = elements.filter((element) => element.classList.contains(`series:${selectedSeries}`));
	}
	return elements;
}

/**
 * Checks if the Q or Home keys are being pressed.
 */
function isSkipToBeginning(nativeEvent: Event): boolean {
	return (
		nativeEvent instanceof KeyboardEvent &&
		((nativeEvent.altKey && nativeEvent.code === "KeyQ") || nativeEvent.code === "Home")
	);
}

/**
 * Checks if the W or End keys are being pressed.
 */
function isSkipToEnd(nativeEvent: Event): boolean {
	return (
		nativeEvent instanceof KeyboardEvent &&
		((nativeEvent.altKey && nativeEvent.code === "KeyW") || nativeEvent.code === "End")
	);
}
