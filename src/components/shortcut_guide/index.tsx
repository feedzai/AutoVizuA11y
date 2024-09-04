/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { cloneElement, isValidElement } from "react";
import { guideKeyHandler } from "../navigation";
import * as constants from "../../constants";
import NativeShortcutGuide from "./components/NativeShortcutGuide";

interface ShortcutGuideContainerProps {
	shortcutGuide: JSX.Element | undefined;
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
	const dialogRef = { shortcutGuideRef }; // Add any other props you might want to pass
	return (
		<dialog
			id="dialog"
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
			{isValidElement(shortcutGuide) ? (
				cloneElement(shortcutGuide, dialogRef)
			) : (
				<NativeShortcutGuide dialogRef={shortcutGuideRef} />
			)}
		</dialog>
	);
};
