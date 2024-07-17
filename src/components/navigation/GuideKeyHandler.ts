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
 */
export function guideKeyHandler({
	event,
	chartRef,
	closeShortcutGuide,
	visibleShortcutGuide,
}: {
	event: React.KeyboardEvent;
	chartRef: React.RefObject<HTMLElement>;
	closeShortcutGuide: any;
	visibleShortcutGuide: any;
}): void {
	const { key } = event;

	switch (key) {
		case "Escape":
			event.preventDefault();
			if (
				document.activeElement?.classList.contains("a11y_modal_content") ||
				document.activeElement?.classList.contains("a11y_row") ||
				document.activeElement?.id === "guide_close"
			) {
				returnGuide(chartRef, closeShortcutGuide);
				break;
			}
			break;

		case "?":
			event.preventDefault();
			if (
				document.activeElement?.classList.contains("a11y_modal_content") ||
				document.activeElement?.classList.contains("a11y_row") ||
				document.activeElement?.id === "guide_close"
			) {
				returnGuide(chartRef, closeShortcutGuide);
				break;
			}

		default:
			break;
	}

	const span = document.getElementById("guide_close");
	if (span !== null) {
		span.onclick = () => {
			returnGuide(chartRef, closeShortcutGuide);
		};
	}

	return;
}

interface ExtendedHTMLElement extends HTMLElement {
	pastFocus?: HTMLElement | null;
}

/**
 * Hides the ShortcutGuide and gives keyboard focus to the previously focused element.
 */
function returnGuide(chartRef: React.RefObject<HTMLElement>, closeShortcutGuide: any): void {
	switchToChartLevel(chartRef);
	closeShortcutGuide();
}
