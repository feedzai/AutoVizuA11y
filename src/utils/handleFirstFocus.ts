/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";

/**
 * Handles the first focus of an AutoVizuA11y chart.
 *
 * @param {(React.ReactNode | null)} alertDiv
 * @param {React.RefObject<HTMLDivElement>} ref
 * @param {React.Dispatch<React.SetStateAction<string>>} setTextContent
 */
export const handleFirstFocus = (
	alertDiv: React.ReactNode | null,
	ref: React.RefObject<HTMLDivElement>,
	setTextContent: React.Dispatch<React.SetStateAction<string>>,
) => {
	ref.current!.classList.add("focused");

	let toolTutorial = localStorage.getItem("toolTutorial");
	if (toolTutorial === "true") {
		if (alertDiv) {
			setTextContent(
				"You just entered an AutoVizually chart." +
					" For information on how to interact with it, press the question mark key" +
					" to open the shortcut guide",
			);
		}
		setTimeout(function () {
			if (alertDiv) {
				setTextContent("\u00A0");
			}
		}, 1000);
		localStorage.setItem("toolTutorial", "false");
		toolTutorial = "false";
	}
};
