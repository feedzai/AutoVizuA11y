/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React, { useRef, useEffect } from "react";
import "./assets/style/ShortcutGuideStyle.css";

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
			<div className="shortcut-guide" data-testid="shortcut-guide">
				<div
					className="shortcut-guide__container"
					tabIndex={0}
					aria-label="AutoVizually shortcut guide. AutoVizually lets you navigate between
          charts and underlying data elements using just the keyboard. When focused on a chart,
          a description regarding the data will be provided — you might receive a notification
          indicating that the chart description was produced by an AI model. For JAWS and NVDA users, it is
          recommended to turn Focus mode before navigating the data using the arrow keys."
				>
					<div id="shortcut-guide__header">
						<h2 id="shortcut-guide__title">Shortcut Guide</h2>
						<p id="shortcut-guide__button-label">? or Esc</p>
						<button
							id="shortcut-guide__button"
							aria-label="Close shortcut guide"
							onClick={() => closeShortcutGuide()}
						>
							&times;
						</button>
					</div>
					<hr className="shortcut-guide__break" />
					<div className="shortcut-guide__content">
						<div className="shortcut-guide__column">
							<table className="shortcut-guide__table" role={"group"}>
								<tbody className="shortcut-guide__table-body">
									<div className="shortcut-guide__row shortcut-guide__row--empty"></div>
									<tr className="shortcut-guide__row" tabIndex={0}>
										<th className="shortcut-guide__cell shortcut-guide__cell--empty"></th>
										<th
											className="shortcut-guide__cell shortcut-guide__cell--title"
											aria-label="Section: Access the guide"
											role={"listitem"}
										>
											Access the guide
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Enter shortcut guide: Question mark"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">?</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Enter shortcut guide
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Leave shortcut guide: Question mark or Escape"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											? or Esc
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Leave shortcut guide
										</th>
									</tr>
									<div className="shortcut-guide__row shortcut-guide__row--empty"></div>

									<tr className="shortcut-guide__row" tabIndex={0}>
										<th className="shortcut-guide__cell shortcut-guide__cell--empty"></th>
										<th
											className="shortcut-guide__cell shortcut-guide__cell--title"
											aria-label="Section: Move between page elements"
											role={"listitem"}
										>
											Move between page elements
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Get into a chart: Down Arrow"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">↓</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Get into a chart
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Get out of a chart: Up Arrow"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">↑</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Get out of a chart
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Move forward in a page element: Right Arrow"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">→</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Move forward in a page element
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Move backward in a page element: Left Arrow"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">←</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Move backward in a page element
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Move between series of data inside the chart: Alt (option) + M"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + M
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Move between series of data inside the chart
										</th>
									</tr>
									<div className="shortcut-guide__row shortcut-guide__row--empty"></div>
									<tr className="shortcut-guide__row" tabIndex={0}>
										<th className="shortcut-guide__cell shortcut-guide__cell--empty"></th>
										<th
											className="shortcut-guide__cell shortcut-guide__cell--title"
											aria-label="Section: Chart navigation shortcuts"
											role={"listitem"}
										>
											Chart navigation shortcuts
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Jump to the beginning of a chart: Home or Alt (option) + Q "
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Home or Alt (option) + Q
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Jump to the beginning of a chart
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Jump to the end of a chart: End or Alt (option) + W "
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											End or Alt (option) + W
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Jump to the end of a chart
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Define the number of data points to be jumped at a time: Alt (option) + X"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + X
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Define the number of data points to be jumped at a time
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Add one number to the data points to be jumped at a time: Plus symbol"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">+</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Add one number to the data points to be jumped at a time
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Subtract one number to the data points to be jumped at a
                      time: Minus symbol"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">-</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Subtract one number to the data points to be jumped at a time
										</th>
									</tr>
									<div className="shortcut-guide__row shortcut-guide__row--empty"></div>
								</tbody>
							</table>
						</div>
						<div className="shortcut-guide__column">
							<table className="shortcut-guide__table" role={"group"}>
								<tbody className="shortcut-guide__table-body">
									<div className="shortcut-guide__row shortcut-guide__row--empty"></div>
									<tr className="shortcut-guide__row" tabIndex={0}>
										<th className="shortcut-guide__cell shortcut-guide__cell--empty"></th>
										<th
											className="shortcut-guide__cell shortcut-guide__cell--title"
											aria-label="Section: Statistical insights (works when navigating a chart)"
											role={"listitem"}
										>
											Statistical insights (works when navigating a chart)
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Minimum: Alt (option) + J"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + J
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Minimum
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Average: Alt (option) + K"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + K
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Average
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Maximum: Alt (option) + L"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + L
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Maximum
										</th>
									</tr>
									<div className="shortcut-guide__row shortcut-guide__row--empty"></div>
									<tr className="shortcut-guide__row" tabIndex={0}>
										<th className="shortcut-guide__cell shortcut-guide__cell--empty"></th>
										<th
											className="shortcut-guide__cell shortcut-guide__cell--title"
											aria-label="Section: Statistical insights (works when a chart element is
                      focused)"
											role={"listitem"}
										>
											Statistical insights (works when a chart element is focused)
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Compare current data element to minimum value: Alt (option) + Shift + J"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + Shift + J
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Compare current data element to minimum value
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Compare current data element to average value: Alt (option) + Shift + K"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + Shift + K
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Compare current data element to average value
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Compare current data element to maximum value: Alt (option) + Shift + L"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + Shift + L
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Compare current data element to maximum value
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Compare current data element to the rest of the chart: Alt (option) + Z"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + Z
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Compare current data element to the rest of the chart
										</th>
									</tr>
									<div className="shortcut-guide__row shortcut-guide__row--empty"></div>
									<tr className="shortcut-guide__row" tabIndex={0}>
										<th className="shortcut-guide__cell shortcut-guide__cell--empty"></th>
										<th
											className="shortcut-guide__cell shortcut-guide__cell--title"
											aria-label="Section: Change chart descriptions"
											role={"listitem"}
										>
											Change chart descriptions
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Set longer description of the chart: Alt (option) + B"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + B
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Set longer description of the chart
										</th>
									</tr>
									<tr
										className="shortcut-guide__row"
										tabIndex={0}
										aria-label="Set shorter description of the chart: Alt (option) + S"
										role={"listitem"}
									>
										<th className="shortcut-guide__cell shortcut-guide__cell--shortcut">
											Alt (option) + S
										</th>
										<th className="shortcut-guide__cell shortcut-guide__cell--explanation">
											Set shorter description of the chart (default)
										</th>
									</tr>
									<div className="shortcut-guide__row shortcut-guide__row--empty"></div>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShortcutGuide;
