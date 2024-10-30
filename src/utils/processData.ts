/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { arrayConverter } from "./arrayConverter";
import { insightsCalculator } from "./insightsCalculator";

interface ProcessDataProps {
	data: Record<string, unknown>[];
	validatedInsights: string;
	setArrayConverted: (data: number[]) => void;
	setInsightsArray: (data: number[]) => void;
}

/**
 * Processes the data, by setting the values of the calculated insights
 *
 * @export
 * @param {Record<string, unknown>[]} data - Chart data.
 * @param {string} validatedInsights - Data key from which insights should be calculated.
 * @param {Function} setArrayConverted - Setter function for the converted array of values.
 * @param {Function} setInsightsArray - Setter function for the converted array of insights.
 * @return {number} Average of the data values.
 */

export function processData({
	data,
	validatedInsights,
	setArrayConverted,
	setInsightsArray,
}: ProcessDataProps) {
	const dataConverted = arrayConverter(data, validatedInsights);
	setArrayConverted(dataConverted);

	let average = 0;
	if (validatedInsights !== "") {
		const insightsArrayAux = insightsCalculator(dataConverted);
		setInsightsArray(insightsArrayAux);

		average = insightsArrayAux[1];
	}

	return average;
}
