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
 * Listens for navigation related keypresses and handles the outcomes.
 *
 * @export
 * @return Number of points being jumped at a time inside the wrapped chart.
 */
export function navigationKeyHandler({
	type,
	event,
	number,
	ref,
	elements,
	setTextContent,
	selectedSeries,
	series,
	selectorType,
	multiSeries,
	nextSeries,
}: {
	type: string;
	event: React.KeyboardEvent;
	number: number;
	ref: React.RefObject<HTMLElement>;
	elements: any;
	setTextContent: Function;
	selectedSeries: string;
	series: string[];
	selectorType: { element?: string; className?: string };
	multiSeries?: string | undefined;
	nextSeries?: () => void;
}): number {
	const { altKey, code } = event.nativeEvent;
	number = xSetter({ event, type, number, setTextContent });
	skip({ event, ref, selectorType, selectedSeries });

	const charts = Array.from(document.getElementsByClassName("a11y_desc"));
	const chart = ref.current?.getElementsByClassName("a11y_desc")[0] as HTMLElement;
	if (chart === document.activeElement && charts.includes(chart)) {
		jumpXCharts({ event, charts, chart });
	} else {
		jumpXElements({ event, number, elements, selectedSeries, series });
	}

	if (altKey && code === "KeyM") {
		event.preventDefault();
		if (
			document.activeElement?.classList.contains("a11y_modal_content") ||
			document.activeElement?.classList.contains("a11y_row") ||
			document.activeElement?.id === "guide_close"
		) {
			return number;
		}
		if (document.activeElement?.classList.contains("a11y_desc")) {
			setTextContent("You can only change series while focused on a data point");
			setTimeout(() => {
				setTextContent("\u00A0");
			}, 1000);
			return number;
		}
		if (!multiSeries) {
			setTextContent("This chart only has one series of data");
			setTimeout(() => {
				setTextContent("\u00A0");
			}, 1000);
			return number;
		} else if (nextSeries && selectorType && selectedSeries && series) {
			nextSeries();
			switchSeries({ ref, selectorType, selectedSeries, series });
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
			if (!document.activeElement?.classList.contains("a11y_desc")) {
				setTextContent("You are already at the data level");
				setTimeout(() => {
					setTextContent("\u00A0");
				}, 1000);
				break;
			}
			switchToDataLevel({ ref, selectorType, selectedSeries });
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
			if (document.activeElement?.classList.contains("a11y_desc")) {
				setTextContent("You are already at the chart level");
				setTimeout(() => {
					setTextContent("\u00A0");
				}, 1000);
				break;
			}
			switchToChartLevel(ref);
			break;
		case "Escape":
			event.preventDefault();
			if (
				document.activeElement?.classList.contains("a11y_modal_content") ||
				document.activeElement?.classList.contains("a11y_row") ||
				document.activeElement?.id === "guide_close"
			) {
				returnGuide(ref);
				return number;
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
					return number;
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

	return number;
}

interface ExtendedHTMLElement extends HTMLElement {
	pastFocus?: HTMLElement | null;
}

/**
 * Displays the ShortcutGuide and gives it keyboard focus.
 */
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

/**
 * Hides the ShortcutGuide and gives keyboard focus to the previously focused element.
 */
function returnGuide(ref: React.RefObject<HTMLElement>): void {
	const allShortcuts = document.getElementsByClassName("a11y_row");
	for (let i = 0; i < allShortcuts.length; i++) {
		allShortcuts[i].removeAttribute("tabIndex");
	}
	const shortcutGuide = document.getElementsByClassName(
		"a11y_modal_content",
	)[0] as ExtendedHTMLElement;
	shortcutGuide.removeAttribute("tabIndex");
	switchToChartLevel(ref);
	if (shortcutGuide.pastFocus) shortcutGuide.pastFocus.focus();
	const modal = document.getElementsByClassName("a11y_modal")[0] as HTMLElement;
	modal.style.display = "none";
}

/**
 * Enables navigation on the chart level.
 *
 * @export
 */
export function switchToChartLevel(ref: React.RefObject<HTMLElement>, first?: boolean): void {
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

/**
 * Enables navigation on the data level.
 */
function switchToDataLevel({
	ref,
	selectorType,
	selectedSeries,
}: {
	ref: React.RefObject<HTMLElement>;
	selectorType?: { element?: string; className?: string };
	selectedSeries?: string;
}): void {
	const allCharts = document.getElementsByClassName("a11y_desc");
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].removeAttribute("tabIndex");
	}
	wiper(ref);
	// const defaultSelectorType = { element: "defaultElement", className: "defaultClassName" };
	addDataNavigation({ ref, selectorType, selectedSeries });
}

/**
 * Enables navigation between data series.
 */
function switchSeries({
	ref,
	selectorType,
	selectedSeries,
	series,
}: {
	ref: React.RefObject<HTMLElement>;
	selectorType: { element?: string; className?: string };
	selectedSeries: string;
	series: string[];
}): void {
	//what was the previously focused point?
	const previousPoint = document.activeElement as HTMLElement;

	//what is the index of previously focused point?
	let elements: NodeListOf<HTMLElement> | undefined;
	if (selectorType.element !== undefined) {
		elements = ref?.current?.querySelectorAll(selectorType.element) as NodeListOf<HTMLElement>;
	} else if (selectorType.className !== undefined) {
		elements = ref?.current?.getElementsByClassName(selectorType.className) as
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

	wiper(ref);

	addDataNavigation({
		ref,
		selectorType,
		selectedSeries: currentSeriesName,
		focusPoint: currentSeries[previousIndex],
	});
}