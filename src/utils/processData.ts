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
	setArrayConverted: Function;
	setInsightsArray: Function;
}

/**
 * Processes the data, by setting the values of the calculated insights
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
		let insightsArrayAux = insightsCalculator(dataConverted);
		setInsightsArray(insightsArrayAux);

		average = insightsArrayAux[1];
	}

	return average;
}
