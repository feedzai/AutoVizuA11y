/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { wiper } from "../../utils/wiper";
import { addDataNavigation } from "./AddNavigation";
import { jumpXCharts, jumpXElements } from "./JumpX";
import { skip } from "./Skip";
import { xSetter } from "./XSetter";

/**
 * Listens for navigation related keypresses in charts/data elements and handles the outcomes.
 *
 * @export
 * @return Number of points being jumped at a time inside the wrapped chart.
 */
export function navigationKeyHandler({
	type,
	event,
	number,
	chartRef,
	elements,
	alertDivRef,
	selectedSeries,
	series,
	setVisibleShortcutGuide,
	selectorType,
	multiSeries,
	setSelectedSeries,
}: {
	type: string;
	event: React.KeyboardEvent;
	number: number;
	chartRef: React.RefObject<HTMLElement>;
	elements: HTMLElement[];
	alertDivRef: React.RefObject<HTMLElement>;
	selectedSeries: string;
	series: string[];
	selectorType: { element?: string; className?: string };
	setVisibleShortcutGuide: Function;
	multiSeries?: string | undefined;
	setSelectedSeries?: Function;
}): number {
	const { altKey, key, code } = event.nativeEvent;
	number = xSetter({ event, type, number, alertDivRef });
	skip({ event, chartRef, selectorType, selectedSeries });

	const charts = Array.from(document.getElementsByClassName("a11y_desc"));
	const chart = chartRef.current?.getElementsByClassName("a11y_desc")[0] as HTMLElement;
	if (chart === document.activeElement && charts.includes(chart)) {
		jumpXCharts({ event, charts, chart });
	} else {
		jumpXElements({ event, number, elements, selectedSeries, series });
	}

	if (altKey && code === "KeyM") {
		event.preventDefault();

		if (document.activeElement?.classList.contains("a11y_desc")) {
			alertDivRef.current!.textContent = "You can only change series while focused on a data point";
			setTimeout(() => {
				alertDivRef.current!.textContent = "\u00A0";
			}, 1000);
			return number;
		}
		if (!multiSeries) {
			alertDivRef.current!.textContent = "This chart only has one series of data";
			setTimeout(() => {
				alertDivRef.current!.textContent = "\u00A0";
			}, 1000);
			return number;
		} else if (setSelectedSeries && selectorType && selectedSeries && series) {
			let currentPos = series.indexOf(selectedSeries);
			let nextPos = (currentPos + 1) % series.length;
			setSelectedSeries(series[nextPos]);
			switchSeries({ chartRef, selectorType, selectedSeries, series });
		}
		return number;
	}

	switch (key) {
		case "ArrowDown":
			event.preventDefault();

			if (!document.activeElement?.classList.contains("a11y_desc")) {
				alertDivRef.current!.textContent = "You are already at the data level";
				setTimeout(() => {
					alertDivRef.current!.textContent = "\u00A0";
					alertDivRef.current!.textContent = "\u00A0";
				}, 1000);
				break;
			}
			switchToDataLevel({ chartRef, selectorType, selectedSeries });
			break;

		case "ArrowUp":
			event.preventDefault();

			if (document.activeElement?.classList.contains("a11y_desc")) {
				alertDivRef.current!.textContent = "You are already at the chart level";
				setTimeout(() => {
					alertDivRef.current!.textContent = "\u00A0";
				}, 1000);
				break;
			}
			switchToChartLevel(chartRef);
			break;

		case "?":
			event.preventDefault();
			levelGuide(chartRef, setVisibleShortcutGuide);
			break;

		default:
			break;
	}

	return number;
}

interface ExtendedHTMLElement extends HTMLElement {
	pastFocus?: HTMLElement | null;
}

/**
 * Displays the ShortcutGuide and gives it keyboard focus.
 */
function levelGuide(
	chartRef: React.RefObject<HTMLElement>,
	setVisibleShortcutGuide: Function,
): void {
	const allCharts = document.getElementsByClassName("a11y_desc");
	wiper(chartRef);
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].removeAttribute("tabIndex");
	}
	setVisibleShortcutGuide(true);
}

/**
 * Enables navigation on the chart level.
 *
 * @export
 */
export function switchToChartLevel(chartRef: React.RefObject<HTMLElement>, first?: boolean): void {
	const allCharts = document.getElementsByClassName("a11y_desc");
	if (chartRef) {
		wiper(chartRef, first);
	}
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].setAttribute("tabIndex", "0");
	}

	if (first) {
		wiper(chartRef, first);
	}

	document.body.classList.remove("a11y_no_scroll");

	const chart = chartRef?.current?.getElementsByClassName("a11y_desc")[0] as HTMLElement;
	chart.focus();
}

/**
 * Enables navigation on the data level.
 */
function switchToDataLevel({
	chartRef,
	selectorType,
	selectedSeries,
}: {
	chartRef: React.RefObject<HTMLElement>;
	selectorType?: { element?: string; className?: string };
	selectedSeries?: string;
}): void {
	const allCharts = document.getElementsByClassName("a11y_desc");
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].removeAttribute("tabIndex");
	}
	wiper(chartRef);
	// const defaultSelectorType = { element: "defaultElement", className: "defaultClassName" };
	addDataNavigation({ chartRef, selectorType, selectedSeries });
}

/**
 * Enables navigation between data series.
 */
function switchSeries({
	chartRef,
	selectorType,
	selectedSeries,
	series,
}: {
	chartRef: React.RefObject<HTMLElement>;
	selectorType: { element?: string; className?: string };
	selectedSeries: string;
	series: string[];
}): void {
	//what was the previously focused point?
	const previousPoint = document.activeElement as HTMLElement;

	//what is the index of previously focused point?
	let elements: NodeListOf<HTMLElement> | undefined;
	if (selectorType.element !== undefined) {
		elements = chartRef?.current?.querySelectorAll(selectorType.element) as NodeListOf<HTMLElement>;
	} else if (selectorType.className !== undefined) {
		elements = chartRef?.current?.getElementsByClassName(selectorType.className) as
			| NodeListOf<HTMLElement>
			| undefined;
	}

	const previousSeries: HTMLElement[] = [];
	if (elements) {
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i] as HTMLElement;
			const a = `series:${selectedSeries}`;
			if (element.classList.contains(a)) {
				previousSeries.push(element);
			}
		}
	}

	const previousIndex = previousSeries.indexOf(previousPoint);

	//what is the point in the new series with that index?
	const previousSeriesPos = series.indexOf(selectedSeries);
	const currentSeriesPos = (previousSeriesPos + 1) % series.length;
	const currentSeriesName = series[currentSeriesPos].replace(/ /g, "-");

	const currentSeries: HTMLElement[] = [];
	if (elements) {
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i] as HTMLElement;
			const a = `series:${currentSeriesName}`;
			if (element.classList.contains(a)) {
				currentSeries.push(element);
			}
		}
	}

	wiper(chartRef);

	addDataNavigation({
		chartRef,
		selectorType,
		selectedSeries: currentSeriesName,
		focusPoint: currentSeries[previousIndex],
	});
}
