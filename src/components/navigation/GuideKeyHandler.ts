/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { switchToChartLevel } from "./NavigationKeyHandler";

export interface ExtendedHTMLElement extends HTMLElement {
	pastFocus?: HTMLElement | null;
}

/**
 * Listens for shortcutGuide related keypresses and handles the outcomes.
 *
 * @param {React.KeyboardEvent} event - The keyboard event.
 * @param {React.RefObject<HTMLElement>} chartRef - Reference to the chart element.
 */
export function guideKeyHandler(
	event: React.KeyboardEvent,
	chartRef: React.RefObject<HTMLElement>,
): void {
	const { key } = event;
	const activeElement = document.activeElement as HTMLElement;

	const shouldHandleKey =
		activeElement?.classList.contains("a11y_modal_content") ||
		activeElement?.classList.contains("a11y_row") ||
		activeElement?.id === "guide_close";

	switch (key) {
		case "Escape":
		case "?":
			if (shouldHandleKey) {
				event.preventDefault();
				returnGuide(chartRef);
			}
			break;
		default:
			break;
	}

	const closeButton = document.getElementById("guide_close");
	if (closeButton) {
		closeButton.onclick = () => returnGuide(chartRef);
	}
}

/**
 * Hides the ShortcutGuide and gives keyboard focus to the previously focused element.
 *
 * @param {React.RefObject<HTMLElement>} chartRef - Reference to the chart element.
 */
function returnGuide(chartRef: React.RefObject<HTMLElement>): void {
	const allShortcuts = document.getElementsByClassName("a11y_row");
	Array.from(allShortcuts).forEach((element) => element.removeAttribute("tabIndex"));
	const shortcutGuide = document.querySelector(".a11y_modal_content") as ExtendedHTMLElement;

	if (shortcutGuide) {
		shortcutGuide.removeAttribute("tabIndex");
		if (shortcutGuide.pastFocus) {
			shortcutGuide.pastFocus.focus();
		}
	}

	switchToChartLevel(chartRef);
	const modal = document.querySelector(".a11y_modal") as HTMLElement;
	if (modal) {
		modal.style.display = "none";
	}
}
