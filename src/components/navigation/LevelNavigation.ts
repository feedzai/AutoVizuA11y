/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { wiper } from "../../utils/wiper";
import { addDataNavigation } from "./AddNavigation";

// When an arrow key is pressed, changes levels
export function levelNav(
	event: React.KeyboardEvent<HTMLDivElement>,
	ref: React.RefObject<HTMLElement>,
	alertDiv?: HTMLElement,
	selectorType?: { element?: string; className?: string },
	multiSeries?: string | undefined,
	nextSeries?: () => void,
	series?: string[],
	selectedSeries?: string,
): void {
	const { altKey, code } = event.nativeEvent;

	if (altKey && code === "KeyM") {
		event.preventDefault();
		if (
			document.activeElement?.classList.contains("a11y_modal_content") ||
			document.activeElement?.classList.contains("a11y_row") ||
			document.activeElement?.id === "guide_close"
		) {
			return;
		}
		if (document.activeElement?.classList.contains("a11y_desc") && alertDiv) {
			alertDiv.textContent = "You can only change series while focused on a data point";
			setTimeout(() => {
				alertDiv.textContent = "\u00A0";
			}, 1000);
			return;
		}
		if (!multiSeries && alertDiv) {
			alertDiv.textContent = "This chart only has one series of data";
			setTimeout(() => {
				alertDiv.textContent = "\u00A0";
			}, 1000);
			return;
		} else if (nextSeries && selectorType && selectedSeries && series) {
			nextSeries();
			levelSeries(ref, selectorType, selectedSeries, series);
		}
	}

	switch (code) {
		case "ArrowDown":
			event.preventDefault();
			if (
				document.activeElement?.classList.contains("a11y_modal_content") ||
				document.activeElement?.classList.contains("a11y_row") ||
				document.activeElement?.id === "guide_close"
			) {
				break;
			}
			if (!document.activeElement?.classList.contains("a11y_desc") && alertDiv) {
				alertDiv.textContent = "You are already at the data level";
				setTimeout(() => {
					alertDiv.textContent = "\u00A0";
				}, 1000);
				break;
			}
			levelData(ref, selectorType, selectedSeries);
			break;
		case "ArrowUp":
			event.preventDefault();
			if (
				document.activeElement?.classList.contains("a11y_modal_content") ||
				document.activeElement?.classList.contains("a11y_row") ||
				document.activeElement?.id === "guide_close"
			) {
				break;
			}
			if (document.activeElement?.classList.contains("a11y_desc") && alertDiv) {
				alertDiv.textContent = "You are already at the chart level";
				setTimeout(() => {
					alertDiv.textContent = "\u00A0";
				}, 1000);
				break;
			}
			levelChart(ref);
			break;
		case "Escape":
			event.preventDefault();
			if (
				document.activeElement?.classList.contains("a11y_modal_content") ||
				document.activeElement?.classList.contains("a11y_row") ||
				document.activeElement?.id === "guide_close"
			) {
				returnGuide(ref);
				return;
			}
			break;
		default:
			break;
	}
	switch (event.key) {
		case "?":
			// eslint-disable-next-line no-case-declarations
			const modal = document.getElementsByClassName("a11y_modal")[0];

			if (modal !== undefined) {
				event.preventDefault();
				if (
					document.activeElement?.classList.contains("a11y_modal_content") ||
					document.activeElement?.classList.contains("a11y_row") ||
					document.activeElement?.id === "guide_close"
				) {
					returnGuide(ref);
					return;
				}
				levelGuide(ref);
				break;
			}
			break;

		default:
			break;
	}

	const span = document.getElementById("guide_close");
	if (span !== null) {
		span.onclick = () => {
			returnGuide(ref);
		};
	}

	return;
}

interface ExtendedHTMLElement extends HTMLElement {
	pastFocus?: HTMLElement | null;
}

// When the user enters the ShortcutGuide from a chart or data point
function levelGuide(ref: React.RefObject<HTMLElement>): void {
	const allCharts = document.getElementsByClassName("a11y_desc");
	wiper(ref);
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].removeAttribute("tabIndex");
	}
	const allShortcuts = document.getElementsByClassName("a11y_row");
	for (let i = 0; i < allShortcuts.length; i++) {
		allShortcuts[i].setAttribute("tabIndex", "0");
	}

	const shortcutGuide = document.getElementsByClassName(
		"a11y_modal_content",
	)[0] as ExtendedHTMLElement;
	const modal = document.getElementsByClassName("a11y_modal")[0] as HTMLElement;
	modal.style.display = "block";

	shortcutGuide.setAttribute("tabIndex", "0");
	shortcutGuide.pastFocus = ref?.current?.getElementsByClassName("a11y_desc")[0] as HTMLElement;
	document.body.classList.add("a11y_no_scroll");
	shortcutGuide.focus();
}

// When the user returns from the ShortcutGuide to the chart they were before
function returnGuide(ref: React.RefObject<HTMLElement>): void {
	const allShortcuts = document.getElementsByClassName("a11y_row");
	for (let i = 0; i < allShortcuts.length; i++) {
		allShortcuts[i].removeAttribute("tabIndex");
	}
	const shortcutGuide = document.getElementsByClassName(
		"a11y_modal_content",
	)[0] as ExtendedHTMLElement;
	shortcutGuide.removeAttribute("tabIndex");
	levelChart(ref);
	if (shortcutGuide.pastFocus) shortcutGuide.pastFocus.focus();
	const modal = document.getElementsByClassName("a11y_modal")[0] as HTMLElement;
	modal.style.display = "none";
}

// When the interface is created or the user goes to the chart level
export function levelChart(ref: React.RefObject<HTMLElement>, first?: boolean): void {
	const allCharts = document.getElementsByClassName("a11y_desc");
	if (ref) {
		wiper(ref, first);
	}
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].setAttribute("tabIndex", "0");
	}

	if (first) {
		wiper(ref, first);
		return;
	}

	document.body.classList.remove("a11y_no_scroll");

	const chart = ref?.current?.getElementsByClassName("a11y_desc")[0] as HTMLElement;
	chart.focus();
}

// When the user goes to the data level
function levelData(
	ref: React.RefObject<HTMLElement>,
	selectorType?: { element?: string; className?: string },
	selectedSeries?: string,
): void {
	const allCharts = document.getElementsByClassName("a11y_desc");
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].removeAttribute("tabIndex");
	}
	wiper(ref);
	// const defaultSelectorType = { element: "defaultElement", className: "defaultClassName" };
	addDataNavigation(ref, selectorType, selectedSeries);
}

function levelSeries(
	ref: React.RefObject<HTMLElement>,
	selectorType: { element?: string; className?: string },
	selectedSeries: string,
	series: string[],
): void {
	//what was the previously focused point?
	const previousPoint = document.activeElement as HTMLElement;

	//what is the index of previously focused point?
	let elements: NodeListOf<HTMLElement> | undefined;
	if (selectorType.element !== undefined) {
		elements = ref?.current?.querySelectorAll(selectorType.element) as NodeListOf<HTMLElement>;
	} else if (selectorType.className !== undefined) {
		elements = ref?.current?.getElementsByClassName(
			selectorType.className,
		) as unknown as NodeListOf<HTMLElement>;
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

	wiper(ref);

	addDataNavigation(ref, selectorType, currentSeriesName, currentSeries[previousIndex]);
}
