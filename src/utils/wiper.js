/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

//helps wipe both information and navigation from inside the chart
export function wiper(ref, first) {
	//wipes possible features not set by the tool (only the first time)
	if (first) {
		if (ref.current !== null) {
			const elementsWithAriaLabel = ref.current.querySelectorAll("[aria-label]");
			//wipes aria-labels
			for (let i = 0; i < elementsWithAriaLabel.length; i++) {
				elementsWithAriaLabel[i].removeAttribute("aria-label");
			}
			const elementsWithAriaDesc = ref.current.querySelectorAll("[aria-describedby]");
			//wipes aria-describedby
			for (let i = 0; i < elementsWithAriaDesc.length; i++) {
				elementsWithAriaDesc[i].removeAttribute("aria-describedby");
			}

			const elementsWithLabelBy = ref.current.querySelectorAll("[aria-labelledby]");
			//wipes aria-labelledby
			for (let i = 0; i < elementsWithLabelBy.length; i++) {
				elementsWithLabelBy[i].removeAttribute("aria-labelledby");
			}
			return;
		}
		return;
	}

	let buttons;
	if (ref.current !== null) {
		buttons = ref.current.querySelectorAll("button");
		//wipes the natural navigation of a button
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].setAttribute("tabIndex", "-1");
		}

		//wipes everything with a tabindex
		const elementsWithTabIndex = ref.current.querySelectorAll('[tabindex="0"]');
		for (let i = 0; i < elementsWithTabIndex.length; i++) {
			elementsWithTabIndex[i].removeAttribute("tabindex");
		}
	}
}
