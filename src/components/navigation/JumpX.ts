/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Handles the navigation between X data elements inside a chart.
 *
 * @export
 */
export function jumpXelements({
	event,
	number,
	elements,
	selectedSeries,
	series,
}: {
	event: React.KeyboardEvent;
	number: number;
	elements: HTMLElement[];
	selectedSeries: string;
	series: string[];
}): void {
	const { key, nativeEvent } = event;

	// In case of having multiple series
	if (series.length !== 0 && selectedSeries.length !== 0) {
		const currentSeriesPos = series.indexOf(selectedSeries);
		const currentSeriesName = series[currentSeriesPos].replace(/ /g, "-");

		const currentSeries: HTMLElement[] = [];
		for (const element of elements) {
			const a = `series:${currentSeriesName}`;
			if (element.classList.contains(a)) {
				currentSeries.push(element);
			}
		}
		elements = currentSeries;
	}

	// Going backward
	if (key === "ArrowLeft" && document.activeElement && Array.isArray(elements)) {
		let currentPosition = elements.indexOf(document.activeElement as HTMLElement);

		// Returns to normal while on the first element
		if (currentPosition === 0 || currentPosition === -1) {
			nativeEvent.returnValue = true;
			return;
		}

		// Checks if it's possible to jump X number, otherwise stops at first
		nativeEvent.preventDefault();
		for (let index = 0; index < number; index++) {
			if (elements[currentPosition - 1] !== undefined) {
				currentPosition--;
			}
		}

		elements[currentPosition].focus();
		return;
	}

	// Going forward
	if (key === "ArrowRight" && document.activeElement && Array.isArray(elements)) {
		let currentPosition = elements.indexOf(document.activeElement as HTMLElement);

		// Returns to normal while on the last element
		if (currentPosition === elements.length - 1 || currentPosition === -1) {
			nativeEvent.returnValue = true;
			return;
		}

		// Checks if it's possible to jump X number, otherwise stops at last
		nativeEvent.preventDefault();
		for (let index = 0; index < number; index++) {
			if (elements[currentPosition + 1] !== undefined) {
				currentPosition++;
			}
		}

		elements[currentPosition].focus();
		return;
	}
}

/**
 * Handles the navigation between charts.
 *
 * @export
 */
export function jumpXcharts({
	event,
	charts,
	chart,
}: {
	event: React.KeyboardEvent;
	charts: Element[];
	chart: HTMLElement;
}): void {
	if (chart === document.activeElement && charts.includes(chart)) {
		const currentPosition = charts.indexOf(chart);

		const { key, nativeEvent } = event;

		if (key === "ArrowLeft") {
			nativeEvent.preventDefault();
			if (currentPosition === 0 || currentPosition === -1) {
				nativeEvent.returnValue = true;
				return;
			}
			if (charts[currentPosition - 1] !== null) {
				(charts[currentPosition - 1] as HTMLElement).focus();
			}
			return;
		}

		if (key === "ArrowRight") {
			nativeEvent.preventDefault();
			if (currentPosition === charts.length - 1) {
				nativeEvent.returnValue = true;
				return;
			}
			if (charts[currentPosition + 1] !== null) {
				(charts[currentPosition + 1] as HTMLElement).focus();
			}
			return;
		}
	}
}
