/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { guideKeyHandler } from "../navigation";
import * as constants from "../../constants";
import { NativeShortcutGuide } from "./components/NativeShortcutGuide";
import { cloneValidElement } from "@feedzai/js-utilities";

interface ShortcutGuideContainerProps {
	shortcutGuide: React.ReactElement | undefined;
	shortcutGuideRef: React.RefObject<HTMLDialogElement>;
	setIsShortcutGuideOpen: (bool: boolean) => void;
}

/**
 * Component that renders the a ShortcutGuide.
 *
 * @export
 * @param {JSX.Element | undefined} shortcutGuide - A custom ShortcutGuide.
 * @param {React.RefObject<HTMLDialogElement>} shortcutGuideRef - The React reference to this shortcut guide.
 * @param {(bool: boolean) => void} setIsShortcutGuideOpen - Setter function that deals with the logic of opening the guide.
 * @return Either the native ShortcutGuide or a custom one.
 */
export const ShortcutGuideContainer = ({
	shortcutGuide,
	shortcutGuideRef,
	setIsShortcutGuideOpen,
}: ShortcutGuideContainerProps): JSX.Element => {
	return (
		<dialog
			ref={shortcutGuideRef}
			onKeyDown={(event) => {
				guideKeyHandler({ event, shortcutGuideRef, setIsShortcutGuideOpen });
			}}
			aria-describedby={constants.SHORTCUTGUIDE_ID.shortcutGuideDescription}
			aria-labelledby={constants.SHORTCUTGUIDE_ID.shortcutGuideTitle}
			className={constants.AUTOVIZUA11Y_CLASSES.a11yNavGuide}
			onClose={() => {
				setIsShortcutGuideOpen(false);
			}}
		>
			{cloneValidElement(shortcutGuide, { dialogRef: shortcutGuideRef }) ?? (
				<NativeShortcutGuide dialogRef={shortcutGuideRef} />
			)}
		</dialog>
	);
};
