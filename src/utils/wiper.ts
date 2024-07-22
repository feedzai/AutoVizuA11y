/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";

/**
 * Wipes attributes from the chart and underlying data elements.
 *
 * @export
 */
export function wiper(ref: React.RefObject<HTMLElement>, first?: boolean): void {
	//wipes possible features not set by the tool (only the first time)
	if (first) {
		if (ref.current !== null) {
			const elementsWithAriaLabel = ref.current.querySelectorAll("[aria-label]");
			//wipes aria-labels
			elementsWithAriaLabel.forEach((element: Element) => {
				element.removeAttribute("aria-label");
			});

			const elementsWithAriaDesc = ref.current.querySelectorAll("[aria-describedby]");
			//wipes aria-describedby
			elementsWithAriaDesc.forEach((element: Element) => {
				element.removeAttribute("aria-describedby");
			});

			const elementsWithLabelBy = ref.current.querySelectorAll("[aria-labelledby]");
			//wipes aria-labelledby
			elementsWithLabelBy.forEach((element: Element) => {
				element.removeAttribute("aria-labelledby");
			});
			return;
		}
		return;
	}

	let buttons: NodeListOf<HTMLButtonElement> | null;
	if (ref.current !== null) {
		buttons = ref.current.querySelectorAll("button");
		//wipes the natural navigation of a button
		buttons.forEach((button: HTMLButtonElement) => {
			button.setAttribute("tabIndex", "-1");
		});

		//wipes everything with a tabindex
		const elementsWithTabIndex = ref.current.querySelectorAll('[tabindex="0"]');
		elementsWithTabIndex.forEach((element: Element) => {
			element.removeAttribute("tabindex");
		});
	}
}
