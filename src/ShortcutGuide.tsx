/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React, { useRef, useEffect } from "react";
import "./assets/style/ShortcutGuideStyle.css";
import { GUIDE_DATA } from "./assets/data/GuideData";

import * as constants from "./constants";

export interface ShortcutGuideProps {}

/**
 * Component that renders the list of all AutoVizuA11y shortcuts.
 *
 * @return Shortcut guide.
 */
const ShortcutGuide: React.FC<ShortcutGuideProps> = ({}) => {
	const refNav = useRef(null);

	useEffect(() => {
		//needs a slight delay since some elements take time to load
		setTimeout(() => {}, 500);
	}, [refNav]);

	return (
		<form className="shortcut-guide" method="dialog">
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
					<h2 className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideTitle}>Shortcut Guide</h2>
					<p className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideActionLabel}>? or Esc</p>
					<button
						className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideButtonClose}
						aria-label="Close shortcut guide"
						type="submit"
						formMethod="dialog"
					>
						&times;
					</button>
				</div>
				<hr className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideBreak} />
				{[GUIDE_DATA].map((sectionGroup, groupIndex) => (
					<div
						className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideBody}
						tabIndex={-1}
						key={groupIndex}
					>
						{sectionGroup.map((section) => (
							<>
								<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideSection}>
									<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideRow} tabIndex={0}>
										<h3
											className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideCellTitle}
											aria-label={`Section: ${section.title}`}
										>
											{section.title}
										</h3>
									</div>
									{section.shortcuts.map((shortcut, shortcutIndex) => (
										<div
											key={shortcutIndex}
											className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideRow}
											tabIndex={0}
											aria-label={`${shortcut.description}: ${shortcut.keys}`}
											role="listitem"
										>
											<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideCellShortcut}>
												{shortcut.keys}
											</div>
											<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideCellExplanation}>
												{shortcut.description}
											</div>
										</div>
									))}
								</div>
							</>
						))}
					</div>
				))}
			</div>
		</form>
	);
};

export default ShortcutGuide;
