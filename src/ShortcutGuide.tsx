/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React, { useRef, useEffect } from "react";
import "./assets/style/ShortcutGuideStyle.css";
import { guideData } from "./assets/data/GuideData";

export interface ShortcutGuideProps {
	closeShortcutGuide: () => void;
}

/**
 * Component that renders the list of all AutoVizuA11y shortcuts.
 *
 * @return Shortcut guide.
 */
const ShortcutGuide: React.FC<ShortcutGuideProps> = ({ closeShortcutGuide }) => {
	const refNav = useRef(null);
	useEffect(() => {
		//needs a slight delay since some elements take time to load
		setTimeout(() => {}, 500);
	}, [refNav]);

	return (
		<>
			<div className="shortcut-guide__background" data-testid="shortcut-guide">
				<div
					className="shortcut-guide__container"
					tabIndex={0}
					aria-label="AutoVizually shortcut guide. AutoVizually lets you navigate between
          charts and underlying data elements using just the keyboard. When focused on a chart,
          a description regarding the data will be provided — you might receive a notification
          indicating that the chart description was produced by an AI model. For JAWS and NVDA users, it is
          recommended to turn Focus mode before navigating the data using the arrow keys."
				>
					<div className="shortcut-guide__header">
						<h2 className="shortcut-guide__title">Shortcut Guide</h2>
						<p className="shortcut-guide__action-label">? or Esc</p>
						<button
							className="shortcut-guide__button-close"
							aria-label="Close shortcut guide"
							onClick={() => closeShortcutGuide()}
						>
							&times;
						</button>
					</div>
					<hr className="shortcut-guide__break" />
					{[guideData].map((sectionGroup, groupIndex) => (
						<div className="shortcut-guide__body" key={groupIndex}>
							{sectionGroup.map((section) => (
								<>
									<div className="shortcut-guide__section">
										<div className="shortcut-guide__row" tabIndex={0}>
											<div
												className="shortcut-guide__cell shortcut-guide__cell--title"
												aria-label={`Section: ${section.title}`}
												role="listitem"
											>
												{section.title}
											</div>
										</div>
										{section.shortcuts.map((shortcut, shortcutIndex) => (
											<div
												key={shortcutIndex}
												className="shortcut-guide__row"
												tabIndex={0}
												aria-label={`${shortcut.description}: ${shortcut.keys}`}
												role="listitem"
											>
												<div className="shortcut-guide__cell shortcut-guide__cell--shortcut">
													{shortcut.keys}
												</div>
												<div className="shortcut-guide__cell shortcut-guide__cell--explanation">
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
			</div>
		</>
	);
};

export default ShortcutGuide;
