/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import "../../../assets/style/NativeShortcutGuide.css";

import * as constants from "../../../constants";
import { ShortcutGuideDescription } from "./NativeGuideDescription";
import { ShortcutGuideHeader } from "./NativeGuideHeader";
import { ShortcutGuideBody } from "./NativeShortcutGuideBody";
import type { TFunction } from "i18next";

interface NativeShortcutGuideProps {
	dialogRef: React.RefObject<HTMLDialogElement>;
	t: TFunction;
}

/**
 * Component that renders the list of all AutoVizuA11y shortcuts.
 *
 * @return Shortcut guide.
 */
export const NativeShortcutGuide = ({ dialogRef, t }: NativeShortcutGuideProps): JSX.Element => {
	const handleCloseDialog = () => {
		const dialog = dialogRef.current;
		if (dialog) {
			dialog.close();
		}
	};

	return (
		<div
			className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuide}
			data-testid={"a11y-native-shortcut-guide"}
			aria-label={t("sg_title")}
		>
			<ShortcutGuideDescription t={t} />
			<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideContainer}>
				<ShortcutGuideHeader t={t} />
				<hr className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideBreak} />
				<ShortcutGuideBody t={t} />
				<button
					className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideButtonClose}
					aria-label={t("close_shortcut_guide_label")}
					onClick={handleCloseDialog}
				>
					&times;
				</button>
			</div>
		</div>
	);
};
