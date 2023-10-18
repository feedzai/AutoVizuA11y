/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { wiper } from "../../utils/wiper";
import { addDataNavigation } from "./AddNavigation";

//when a arrow key is pressed, changes levels
export function levelNav(
	event,
	ref,
	alertDiv,
	selectorType,
	multiSeries,
	nextSeries,
	series,
	selectedSeries,
) {
	if (event.nativeEvent.altKey && event.nativeEvent.code === "KeyM") {
		event.nativeEvent.preventDefault();
		if (
			document.activeElement.classList.contains("a11y_modal_content") ||
			document.activeElement.classList.contains("a11y_row") ||
			document.activeElement.id === "guide_close"
		) {
			return;
		}
		if (document.activeElement.classList.contains("a11y_desc")) {
			alertDiv.textContent = "You can only change series while focused on a data point";
			setTimeout(function () {
				alertDiv.textContent = "\u00A0";
			}, 1000);
			return;
		}
		if (!multiSeries) {
			//if it not a multiseries chart, it should not work anywhere
			alertDiv.textContent = "This chart only has one series of data";
			setTimeout(function () {
				alertDiv.textContent = "\u00A0";
			}, 1000);
			return;
		} else {
			nextSeries();
			levelSeries(ref, selectorType, selectedSeries, series);
		}
	}

	switch (event.nativeEvent.code) {
		//the user moved to the lower level - data
		case "ArrowDown":
			event.nativeEvent.preventDefault();
			if (
				document.activeElement.classList.contains("a11y_modal_content") ||
				document.activeElement.classList.contains("a11y_row") ||
				document.activeElement.id === "guide_close"
			) {
				break;
			}
			if (!document.activeElement.classList.contains("a11y_desc")) {
				alertDiv.textContent = "You are already at the data level";
				setTimeout(function () {
					alertDiv.textContent = "\u00A0";
				}, 1000);
				break;
			}
			levelData(ref, selectorType, selectedSeries);
			break;
		//the user moved to the upper level - charts
		case "ArrowUp":
			event.nativeEvent.preventDefault();
			if (
				document.activeElement.classList.contains("a11y_modal_content") ||
				document.activeElement.classList.contains("a11y_row") ||
				document.activeElement.id === "guide_close"
			) {
				break;
			}
			if (document.activeElement.classList.contains("a11y_desc")) {
				alertDiv.textContent = "You are already at the chart level";
				setTimeout(function () {
					alertDiv.textContent = "\u00A0";
				}, 1000);
				break;
			}
			levelChart(ref);
			break;
		//the user moved out of the shortcut guide
		case "Escape":
			event.nativeEvent.preventDefault();
			if (
				document.activeElement.classList.contains("a11y_modal_content") ||
				document.activeElement.classList.contains("a11y_row") ||
				document.activeElement.id === "guide_close"
			) {
				returnGuide(ref);
				return;
			}
			break;
		default:
			break;
	}
	switch (event.nativeEvent.key) {
		case "?":
			var modal = document.getElementsByClassName("a11y_modal")[0];
			if (modal !== undefined) {
				event.nativeEvent.preventDefault();
				if (
					document.activeElement.classList.contains("a11y_modal_content") ||
					document.activeElement.classList.contains("a11y_row") ||
					document.activeElement.id === "guide_close"
				) {
					returnGuide(ref);
					return;
				}
				levelGuide(ref);
				break;
			}
		default:
			break;
	}
	var span = document.getElementById("guide_close");
	if (span !== null) {
		span.onclick = function () {
			returnGuide(ref);
		};
	}

	return;
}

//when the user enters the ShortcutGuide from a chart or data point
function levelGuide(ref) {
	let allCharts = document.getElementsByClassName("a11y_desc");
	wiper(ref);
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].removeAttribute("tabIndex");
	}
	let allShortcuts = document.getElementsByClassName("a11y_row");
	for (let i = 0; i < allShortcuts.length; i++) {
		allShortcuts[i].setAttribute("tabIndex", "0");
	}

	let shortcutGuide = document.getElementsByClassName("a11y_modal_content")[0];
	// Get the modal
	var modal = document.getElementsByClassName("a11y_modal")[0];
	modal.style.display = "block";

	shortcutGuide.setAttribute("tabIndex", "0");
	shortcutGuide.pastFocus = ref.current.getElementsByClassName("a11y_desc")[0];

	document.body.classList.add("a11y_no_scroll");
	shortcutGuide.focus();
}

//when the user returns from the shortcutGuide to the chart they were before
function returnGuide(ref) {
	let allShortcuts = document.getElementsByClassName("a11y_row");
	for (let i = 0; i < allShortcuts.length; i++) {
		allShortcuts[i].removeAttribute("tabIndex");
	}
	let shortcutGuide = document.getElementsByClassName("a11y_modal_content")[0];
	shortcutGuide.removeAttribute("tabIndex");
	levelChart(ref);
	shortcutGuide.pastFocus.focus();
	var modal = document.getElementsByClassName("a11y_modal")[0];
	modal.style.display = "none";
	return;
}

//when the interface is created or the user goes to the chart level
export function levelChart(ref, first) {
	let allCharts = document.getElementsByClassName("a11y_desc");
	if (ref) {
		wiper(ref);
	}
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].setAttribute("tabIndex", "0");
	}

	if (first) {
		wiper(ref, first);
		return;
	}

	document.body.classList.remove("a11y_no_scroll");

	let chart = ref.current.getElementsByClassName("a11y_desc")[0];
	chart.focus();
}

//when the user goes to the data level
function levelData(ref, selectorType, selectedSeries) {
	let allCharts = document.getElementsByClassName("a11y_desc");
	for (let i = 0; i < allCharts.length; i++) {
		allCharts[i].removeAttribute("tabIndex");
	}
	wiper(ref);
	addDataNavigation(ref, selectorType, selectedSeries);
}

function levelSeries(ref, selectorType, selectedSeries, series) {
	//what was the previously focused point?
	let previousPoint = document.activeElement;

	//what is the index of previously focused point?
	let elements;
	//either the data points are set given their tag (element) or class (className)
	if (selectorType.element !== undefined) {
		elements = ref.current.querySelectorAll(selectorType.element); // e.g.<rect>
	} else if (selectorType.className !== undefined) {
		elements = ref.current.getElementsByClassName(selectorType.className); //e.g."device-group"
	}

	const previousSeries = [];
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const a = `series:${selectedSeries}`;
		if (element.classList.contains(a)) {
			previousSeries.push(element);
		}
	}

	let previousIndex = previousSeries.indexOf(previousPoint);

	//what is the point in the new series with that index?
	let previousSeriesPos = series.indexOf(selectedSeries);
	let currentSeriesPos = (previousSeriesPos + 1) % series.length;
	let currentSeriesName = series[currentSeriesPos];

	const currentSeries = [];
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const a = `series:${currentSeriesName}`;
		if (element.classList.contains(a)) {
			currentSeries.push(element);
		}
	}

	wiper(ref);
	addDataNavigation(ref, selectorType, currentSeriesName, currentSeries[previousIndex]);

	return;
}
