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
import { showAlert } from "../../utils/showAlert";

import * as constants from "../../constants";
import { getElements } from "../../utils/getElements";

interface NavigationKeyHandlerParams {
	type: string;
	event: React.KeyboardEvent;
	number: number;
	chartRef: React.RefObject<HTMLElement>;
	elements: HTMLElement[];
	alertDivRef: React.RefObject<HTMLElement>;
	selectedSeries: string;
	series: string[];
	selectorType: { element?: string; className?: string };
	setVisibleShortcutGuide?: Function;
	shortcutGuideRef?: React.RefObject<HTMLElement>;
	isShorcutGuide?: boolean;
	multiSeries?: string;
	setSelectedSeries?: (series: string) => void;
}
interface SwitchSeriesParams {
	chartRef: React.RefObject<HTMLElement>;
	selectorType: { element?: string; className?: string };
	selectedSeries: string;
	series: string[];
}

/**
 * Handles navigation key events for chart interaction.
 * @param {NavigationKeyHandlerParams} params - The parameters for navigation key handling.
 * @returns {number} The updated number of points to jump.
 */
export async function navigationKeyHandler(params: NavigationKeyHandlerParams): Promise<number> {
	const {
		type,
		event,
		number,
		chartRef,
		elements,
		alertDivRef,
		selectedSeries,
		series,
		selectorType,
		multiSeries,
		setVisibleShortcutGuide,
		setSelectedSeries,
		shortcutGuideRef,
	} = params;

	const isShorcutGuide = shortcutGuideRef?.current
		? shortcutGuideRef.current.contains(document.activeElement)
		: false;

	console.log(isShorcutGuide);

	const { altKey, key, code } = event.nativeEvent;

	try {
		const updatedNumber = await xSetter({ event, type, number, alertDivRef });
		skip({ event, chartRef, selectorType, selectedSeries });

		const charts = Array.from(
			document.getElementsByClassName(constants.DESC_CLASS),
		) as HTMLElement[];
		const chart = chartRef.current?.getElementsByClassName(constants.DESC_CLASS)[0] as HTMLElement;

		if (chart === document.activeElement && charts.includes(chart)) {
			jumpXCharts({ event, charts, chart });
		} else {
			jumpXElements({
				event,
				number: updatedNumber,
				elements,
				selectedSeries,
				series,
			});
		}

		if (altKey && code === "KeyM") {
			event.preventDefault();
			return handleAltM({
				number: updatedNumber,
				selectedSeries,
				series,
				selectorType,
				setSelectedSeries,
				chartRef,
				multiSeries,
				alertDivRef,
				isShorcutGuide,
			});
		}

		switch (key) {
			case "ArrowDown":
				handleArrowDown(event, chartRef, selectorType, selectedSeries, alertDivRef, isShorcutGuide);
				break;
			case "ArrowUp":
				handleArrowUp(event, chartRef, alertDivRef, isShorcutGuide);
				break;
			case "?":
				handleQuestionMark(event, chartRef, setVisibleShortcutGuide!, isShorcutGuide);
				break;
		}

		return updatedNumber;
	} catch (error) {
		console.error("Error in navigationKeyHandler:", error);
		return number;
	}
}

/**
 * Handles the pressing of the Alt + M keys.
 */
function handleAltM(
	params: Omit<NavigationKeyHandlerParams, "type" | "event" | "elements">,
): number {
	const {
		number,
		selectedSeries,
		series,
		selectorType,
		setSelectedSeries,
		chartRef,
		multiSeries,
		alertDivRef,
		isShorcutGuide,
	} = params;

	if (isShorcutGuide) return number;

	if (document.activeElement?.classList.contains(constants.DESC_CLASS)) {
		showAlert(alertDivRef, "You can only change series while focused on a data point");
		return number;
	}

	if (!multiSeries) {
		showAlert(alertDivRef, "This chart only has one series of data");
		return number;
	}

	if (setSelectedSeries && selectorType && selectedSeries && series.length > 0) {
		const currentPos = series.indexOf(selectedSeries);
		const nextPos = (currentPos + 1) % series.length;
		setSelectedSeries(series[nextPos]);
		switchSeries({ chartRef, selectorType, selectedSeries, series });
	}

	return number;
}

/**
 * Handles the pressing of down arrow key.
 */
function handleArrowDown(
	event: React.KeyboardEvent,
	chartRef: React.RefObject<HTMLElement>,
	selectorType: { element?: string; className?: string },
	selectedSeries: string,
	alertDivRef: React.RefObject<HTMLElement>,
	isShorcutGuide: boolean,
): void {
	event.preventDefault();

	if (isShorcutGuide) return;

	if (!document.activeElement?.classList.contains(constants.DESC_CLASS)) {
		showAlert(alertDivRef, "You are already at the data level");
		return;
	}
	switchToDataLevel({ chartRef, selectorType, selectedSeries });
}

/**
 * Handles the pressing of up arrow key.
 */
function handleArrowUp(
	event: React.KeyboardEvent,
	chartRef: React.RefObject<HTMLElement>,
	alertDivRef: React.RefObject<HTMLElement>,
	isShorcutGuide: boolean,
): void {
	event.preventDefault();

	if (isShorcutGuide) return;
	if (document.activeElement?.classList.contains(constants.DESC_CLASS)) {
		showAlert(alertDivRef, "You are already at the chart level");
		return;
	}
	switchToChartLevel(chartRef);
}

/**
 * Handles the pressing of the question mark key.
 */
function handleQuestionMark(
	event: React.KeyboardEvent,
	chartRef: React.RefObject<HTMLElement>,
	setVisibleShortcutGuide: Function,
	isShorcutGuide: boolean,
): void {
	if (!isShorcutGuide) {
		event.preventDefault();
		levelGuide(chartRef, setVisibleShortcutGuide);
	}
}

/**
 * Switches series of data.
 */
function switchSeries({
	chartRef,
	selectorType,
	selectedSeries,
	series,
}: SwitchSeriesParams): void {
	const previousPoint = document.activeElement as HTMLElement;
	const elements = getElements({ chartRef, selectorType });

	const previousSeries =
		elements?.filter((element) => element.classList.contains(`series:${selectedSeries}`)) ?? [];
	const previousIndex = previousSeries.indexOf(previousPoint);
	const previousSeriesPos = series.indexOf(selectedSeries);

	const currentSeriesPos = (previousSeriesPos + 1) % series.length;
	const currentSeriesName = series[currentSeriesPos].replace(/ /g, "-");
	const currentSeries =
		elements?.filter((element) => element.classList.contains(`series:${currentSeriesName}`)) ?? [];

	wiper(chartRef);

	addDataNavigation({
		chartRef,
		selectorType,
		selectedSeries: currentSeriesName,
		focusPoint: currentSeries[previousIndex],
	});
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

	addDataNavigation({ chartRef, selectorType, selectedSeries });
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

	document.body.classList.remove("a11y_no_scroll");

	if (first) {
		return;
	}

	const chart = chartRef?.current?.getElementsByClassName("a11y_desc")[0] as HTMLElement;
	chart.focus();
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
