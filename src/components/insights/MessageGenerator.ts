/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { TFunction } from "i18next";
import { getOrdinalNumber, median, rounding } from "../../utils";

/**
 * Creates the message regarding the insight requested.
 */
export function messageInsights(
	code: string,
	insight: number,
	focusedData: number,
	t: TFunction<"translation", undefined>,
): string {
	const difference = Math.abs(insight - focusedData);
	const roundedDifference = rounding(difference);
	if (insight > focusedData) {
		return t("difference_below", { difference: roundedDifference, code: code });
	}
	if (insight < focusedData) {
		return t("difference_above", { difference: roundedDifference, code: code });
	}
	return t("difference_same");
}
/**
 * Creates the message regarding the comparison between a data element and all others.
 */
export function messageOverall(
	arrayConverted: number[],
	focusedData: number,
	t: TFunction<"translation", undefined>,
): string {
	const dataSuperConverted = trimAndSort(arrayConverted);
	const positionValue = dataSuperConverted.indexOf(focusedData);
	const med = median(dataSuperConverted);
	const median_message = t("median_message");
	if (focusedData === med) {
		return median_message;
	}
	if (focusedData > med) {
		const rank = dataSuperConverted.length - positionValue;
		return t("highest_message", { ordinalNumber: getOrdinalNumber(rank) });
	}
	if (focusedData < med) {
		const rank = positionValue + 1;
		return t("lowest_message", { ordinalNumber: getOrdinalNumber(rank) });
	}
	return "";
}
/**
 * Trims and sorts an array of numbers.
 */
function trimAndSort(arrayConverted: number[]): number[] {
	return Array.from(new Set(arrayConverted)).sort((a, b) => a - b);
}
