/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";

import * as constants from "./../constants";

/**
 * Wipes attributes from the chart and underlying data elements.
 *
 * @export
 * @param {React.RefObject<HTMLElement>} chartRef - Reference to the chart element.
 * @param {boolean} [first=false] - Whether this is the first run.
 */
export function wiper(chartRef: React.RefObject<HTMLElement>, first: boolean = false): void {
	const chart = chartRef.current;
	if (!chart) return;
	if (first) {
		constants.ATTRIBUTES_TO_REMOVE.forEach((attr) => {
			chart.querySelectorAll(`[${attr}]`).forEach((element) => {
				element.removeAttribute(attr);
			});
		});
	} else {
		chart.querySelectorAll(constants.TABINDEX_ZERO).forEach((element) => {
			element.removeAttribute("tabindex");
		});
	}
}
