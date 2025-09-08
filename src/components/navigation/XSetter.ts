/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";
import { showAlert } from "../../utils/showAlert";
import { TFunction } from "i18next";

interface XSetterParams {
	event: React.KeyboardEvent;
	type: string;
	number: number;
	alertDivRef: React.RefObject<HTMLElement>;
	t: TFunction<"translation", undefined>;
}

/**
 * Handles the X number of data elements to be jumped inside a chart.
 *
 * @param {XSetterParams} params - The parameters for the xSetter function.
 * @return {Promise<number>} Number of points being jumped at a time inside the wrapped chart.
 */
export async function xSetter({
	event,
	type,
	number,
	alertDivRef,
	t,
}: XSetterParams): Promise<number> {
	try {
		const { nativeEvent } = event;

		if (nativeEvent instanceof KeyboardEvent) {
			if (nativeEvent.altKey && nativeEvent.code === "KeyX") {
				return await handleAltX(event, type, number, alertDivRef, t);
			}
			if (nativeEvent.key === "-") {
				return await handleMinus(type, number, alertDivRef, t);
			}
			if (nativeEvent.key === "+") {
				return await handlePlus(type, number, alertDivRef, t);
			}
		}

		return number;
	} catch (error) {
		console.error("Error in xSetter:", error);

		return number;
	}
}

/**
 * Handles the pressing of the Alt + X keys.
 */
async function handleAltX(
	event: React.KeyboardEvent,
	type: string,
	number: number,
	alertDivRef: React.RefObject<HTMLElement>,
	t: TFunction<"translation", undefined>,
): Promise<number> {
	try {
		event.preventDefault();
		const activeElement = document.activeElement as HTMLElement | null;
		const input = prompt(t("prompt_enter_number"));

		if (input !== null && input !== "") {
			const parsedInput = parseInt(input, 10);

			if (!isNaN(parsedInput) && parsedInput > 0) {
				showAlert(alertDivRef, t("alert_jumping_data_points", { count: parsedInput, type }));
				activeElement?.focus();
				return parsedInput;
			} else {
				showAlert(alertDivRef, t("alert_invalid_input_number"));
			}
		}

		activeElement?.focus();

		return number;
	} catch (error) {
		console.error("Error in handleAltX:", error);

		return number;
	}
}

/**
 * Handles the pressing of the - (minus) key.
 */
async function handleMinus(
	type: string,
	number: number,
	alertDivRef: React.RefObject<HTMLElement>,
	t: TFunction<"translation", undefined>,
): Promise<number> {
	if (number === 1) {
		return number;
	}

	showAlert(alertDivRef, t("alert_jumping_data_points", { count: number - 1, type }));

	return number - 1;
}

/**
 * Handles the pressing of the + (plus) key.
 */
async function handlePlus(
	type: string,
	number: number,
	alertDivRef: React.RefObject<HTMLElement>,
	t: TFunction<"translation", undefined>,
): Promise<number> {
	showAlert(alertDivRef, t("alert_jumping_data_points", { count: number + 1, type }));
	return number + 1;
}
