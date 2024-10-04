/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

export interface ExtendedHTMLElement extends HTMLElement {
	pastFocus?: HTMLElement | null;
}

/**
 * Listens for shortcutGuide related keypresses and handles the outcomes.
 *
 * @param {React.KeyboardEvent} event - The keyboard event.
 * @param {React.RefObject<HTMLElement>} chartRef - Reference to the chart element.
 */
export function guideKeyHandler({
	event,
	shortcutGuideRef,
	setIsShortcutGuideOpen,
}: {
	event: React.KeyboardEvent;
	shortcutGuideRef: React.RefObject<HTMLDialogElement>;
	setIsShortcutGuideOpen: (bool: boolean) => void;
}): void {
	const { key } = event;

	const shouldHandleKey = shortcutGuideRef.current?.contains(document.activeElement);

	switch (key) {
		case "Escape":
		case "?":
			if (shouldHandleKey) {
				event.preventDefault();
				returnGuide(shortcutGuideRef, setIsShortcutGuideOpen);
			}
			break;
		default:
			break;
	}

	return;
}

/**
 * Hides the ShortcutGuide and gives keyboard focus to the previously focused element.
 *
 * @param {React.RefObject<HTMLElement>} chartRef - Reference to the chart element.
 */
export function returnGuide(
	shortcutGuideRef: React.RefObject<HTMLDialogElement>,
	setIsShortcutGuideOpen: (bool: boolean) => void,
): void {
	shortcutGuideRef.current!.close();
	setIsShortcutGuideOpen(false);
}
