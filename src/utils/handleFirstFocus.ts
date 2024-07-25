/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";
import { wait, getLSItem, setLSItem } from "@feedzai/js-utilities";

import * as constants from "./../constants";

interface HandleFirstFocusProps {
	alertDiv: React.ReactNode | null;
	chartRef: React.RefObject<HTMLDivElement>;
	alertDivRef: React.RefObject<HTMLElement>;
}

/**
 * Handles the first focus of an AutoVizuA11y chart.
 *
 * @export
 * @param {React.ReactNode | null} alertDiv - Div where the alerts are set.
 * @param {React.RefObject<HTMLDivElement>} chartRef - React reference of the chart.
 * @param {React.RefObject<HTMLElement>} alertDivRef - React reference of the alertDiv.
 */
export async function handleFirstFocus({ alertDiv, chartRef, alertDivRef }: HandleFirstFocusProps) {
	const chart = chartRef.current;
	const alertElement = alertDivRef.current;
	if (!chart || !alertElement) {
		console.warn("Chart or alert element not found");
		return;
	}
	chart.classList.add(constants.FOCUS_CLASS);
	const toolTutorial = getLSItem(constants.TOOL_TUTORIAL_KEY);
	if (toolTutorial === "true" && alertDiv) {
		alertElement.textContent = constants.ALERT_MESSAGE;
		await wait(constants.ALERT_DURATION);
		alertElement.textContent = "\u00A0";
		setLSItem(constants.TOOL_TUTORIAL_KEY, "false");
	}
}
