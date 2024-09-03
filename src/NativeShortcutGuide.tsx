/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { useRef, useEffect } from "react";
import "./assets/style/NativeShortcutGuide.css";
import { GUIDE_DATA } from "./assets/data/GuideData";

import * as constants from "./constants";

interface NativeShortcutGuideProps {
	dialogRef: React.RefObject<HTMLDialogElement>;
}

/**
 * Component that renders the list of all AutoVizuA11y shortcuts.
 *
 * @return Shortcut guide.
 */
const NativeShortcutGuide = ({ dialogRef }: NativeShortcutGuideProps): JSX.Element => {
	const refNav = useRef(null);

	useEffect(() => {
		//needs a slight delay since some elements take time to load
		setTimeout(() => {}, 500);
	}, [refNav]);

	const handleCloseDialog = () => {
		const dialog = dialogRef.current;
		if (dialog) {
			dialog.close();
		}
	};

	return (
		<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuide}>
			<p
				className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideDescription}
				id={constants.SHORTCUTGUIDE_ID.shortcutGuideDescription}
			>
				AutoVizually shortcut guide. AutoVizually lets you navigate between charts and underlying
				data elements using just the keyboard. When focused on a chart, a description regarding the
				data will be provided — you might receive a notification indicating that the chart
				description was produced by an AI model. For JAWS and NVDA users, it is recommended to turn
				Focus mode before navigating the data using the arrow keys.
			</p>
			<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideContainer}>
				<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideHeader}>
					<h2
						className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideTitle}
						id={constants.SHORTCUTGUIDE_ID.shortcutGuideTitle}
					>
						Shortcut Guide
					</h2>
					<p className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideActionLabel}>? or Esc</p>
					<button
						className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideButtonClose}
						aria-label="Close shortcut guide"
						onClick={handleCloseDialog}
					>
						&times;
					</button>
				</div>
				<hr className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideBreak} />
				{[GUIDE_DATA].map((sectionGroup, groupIndex) => (
					<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideBody} key={groupIndex}>
						{sectionGroup.map((section, sectionIndex) => (
							<>
								<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideSection}>
									<h3
										className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideListTitle}
										id={`listHeader${sectionIndex}`}
										aria-label={`Section: ${section.title}`}
									>
										{section.title}
									</h3>
									<dl
										className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideList}
										aria-labelledby={`listHeader${sectionIndex}`}
									>
										{section.shortcuts.map((shortcut, shortcutIndex) => (
											<div
												key={shortcutIndex}
												className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideRow}
												aria-label={`${shortcut.description}: ${shortcut.keys}`}
												role="listitem"
											>
												<dt className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideCellShortcut}>
													{shortcut.keys}
												</dt>
												<dd
													className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideCellExplanation}
												>
													{shortcut.description}
												</dd>
											</div>
										))}
									</dl>
								</div>
							</>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default NativeShortcutGuide;
