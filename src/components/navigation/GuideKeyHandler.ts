/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { switchToChartLevel } from "./NavigationKeyHandler";
import { skip } from "./Skip";
import { xSetter } from "./XSetter";

/**
 * Listens for shortcutGuide related keypresses and handles the outcomes.
 *
 * @export
 * @param {string} type
 * @param {React.KeyboardEvent} event
 * @param {number} number
 * @param {React.RefObject<HTMLElement>} ref
 * @param {Function} setTextContent
 * @param {string} selectedSeries
 * @param {{ element?: string; className?: string }} selectorType
 * @return {void}
 */
export function guideKeyHandler(
	event: React.KeyboardEvent,
	ref: React.RefObject<HTMLElement>,
): void {
	const { key } = event;

	switch (key) {
		case "Escape":
			event.preventDefault();
			if (
				document.activeElement?.classList.contains("a11y_modal_content") ||
				document.activeElement?.classList.contains("a11y_row") ||
				document.activeElement?.id === "guide_close"
			) {
				returnGuide(ref);
				break;
			}
			break;

		case "?":
			const modal = document.getElementsByClassName("a11y_modal")[0];
			if (modal !== undefined) {
				event.preventDefault();
				if (
					document.activeElement?.classList.contains("a11y_modal_content") ||
					document.activeElement?.classList.contains("a11y_row") ||
					document.activeElement?.id === "guide_close"
				) {
					returnGuide(ref);
					break;
				}
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

/**
 * Hides the ShortcutGuide and gives keyboard focus to the previously focused element.
 *
 * @param {React.RefObject<HTMLElement>} ref
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
