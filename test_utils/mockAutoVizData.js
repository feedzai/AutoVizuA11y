/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

import { mockChartData } from "./mockChartData";
import { ascending, descending } from "d3-array";

const intValuesCountryData = mockChartData.map((country) => {
	return {
		...country,
		Value: parseFloat(country.Value),
	};
});

const sortedCountryData = intValuesCountryData
	.slice()
	.filter(
		(country) =>
			country.Series === "Population mid-year estimates (millions)" && country.Year === 2022,
	)
	.sort((a, b) => descending(a.Value, b.Value))
	.filter((country, i) => i < 10)
	.sort((a, b) => ascending(a.Value, b.Value));

export const mockAutoVizData = Object.fromEntries(
	sortedCountryData.map((country, i) => [
		country["Population, density and surface area"],
		country.Value,
	]),
);
