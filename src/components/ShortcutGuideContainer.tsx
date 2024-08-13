/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { isValidElement } from "react";

interface ShortcutGuideContainerProps {
	shortcutGuide: JSX.Element | undefined;
	nativeShortcutGuide: JSX.Element;
}

/**
 * Component that renders the a ShortcutGuide.
 *
 * @export
 * @param {string} shortcutGuide - A custom ShortcutGuide.
 * @param {Function} nativeShortcutGuide - The native ShortcutGuide.
 * @return Either the native ShortcutGuide or a custom one.
 */
export const ShortcutGuideContainer = ({
	shortcutGuide,
	nativeShortcutGuide,
}: ShortcutGuideContainerProps): JSX.Element => {
	return isValidElement(shortcutGuide) ? shortcutGuide : nativeShortcutGuide;
};
