/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";

interface JumpXElementsParams {
	event: React.KeyboardEvent;
	number: number;
	elements: HTMLElement[];
	selectedSeries: string;
	series: string[];
}
interface JumpXChartsParams {
	event: React.KeyboardEvent;
	charts: HTMLElement[];
	chart: HTMLElement;
}
/**
 * Handles the navigation between X data elements inside a chart.
 *
 * @param {JumpXElementsParams} params - The parameters for jumping between elements.
 */
export async function jumpXElements({
	event,
	number,
	elements,
	selectedSeries,
	series,
}: JumpXElementsParams): Promise<void> {
	const { key, nativeEvent } = event;

	// Filter elements for the selected series
	if (series.length > 0 && selectedSeries) {
		const currentSeriesName = selectedSeries.replace(/ /g, "-");
		elements = elements.filter((element) => element.classList.contains(currentSeriesName));
	}

	const activeElement = document.activeElement as HTMLElement;

	if (!activeElement || !Array.isArray(elements)) return;

	const currentPosition = elements.indexOf(activeElement);

	if (currentPosition === -1) return;

	let newPosition = currentPosition;

	switch (key) {
		case "ArrowLeft":
			if (currentPosition === 0) return;
			nativeEvent.preventDefault();
			newPosition = Math.max(0, currentPosition - number);
			break;
		case "ArrowRight":
			if (currentPosition === elements.length - 1) return;
			nativeEvent.preventDefault();
			newPosition = Math.min(elements.length - 1, currentPosition + number);
			break;
		default:
			return;
	}
	elements[newPosition].focus();
}
/**
 * Handles the navigation between charts.
 *
 * @param {JumpXChartsParams} params - The parameters for jumping between charts.
 */
export function jumpXCharts({ event, charts, chart }: JumpXChartsParams): void {
	if (chart !== document.activeElement || !charts.includes(chart)) return;

	const currentPosition = charts.indexOf(chart);
	const { key, nativeEvent } = event;
	let newPosition = currentPosition;

	switch (key) {
		case "ArrowLeft":
			if (currentPosition === 0) return;
			nativeEvent.preventDefault();
			newPosition = currentPosition - 1;
			break;
		case "ArrowRight":
			if (currentPosition === charts.length - 1) return;
			nativeEvent.preventDefault();
			newPosition = currentPosition + 1;
			break;
		default:
			return;
	}
	charts[newPosition].focus();
}
