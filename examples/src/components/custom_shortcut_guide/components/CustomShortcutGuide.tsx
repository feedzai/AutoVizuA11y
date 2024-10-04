/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import * as constants from "../../../../../src/constants";
import React from "react";
import { CustomShortcutGuideDescription } from "./CustomGuideDescription";
import { CustomShortcutGuideHeader } from "./CustomGuideHeader";
import { CustomShortcutGuideBody } from "./CustomShortcutGuideBody";

interface CustomShortcutGuideProps {
	dialogRef: React.RefObject<HTMLDialogElement>;
}

/**
 * Component that renders the list of all AutoVizuA11y shortcuts.
 *
 * @return Shortcut guide.
 */
const CustomShortcutGuide = ({ dialogRef }: CustomShortcutGuideProps): JSX.Element => {
	const handleCloseDialog = () => {
		const dialog = dialogRef.current;
		if (dialog) {
			dialog.close();
		}
	};

	return (
		<div
			className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuide}
			data-testid={"a11y-custom-shortcut-guide"}
		>
			<CustomShortcutGuideDescription />
			<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideContainer}>
				<CustomShortcutGuideHeader onClose={handleCloseDialog} />
				<hr className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideBreak} />
				<CustomShortcutGuideBody />
			</div>
		</div>
	);
};

export default CustomShortcutGuide;
