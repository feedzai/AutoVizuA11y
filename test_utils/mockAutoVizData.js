/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { mockChartData } from "./mockChartData";
import { ascending, descending } from "d3-array";

const intValuesCountryData = mockChartData.map((country) => {
	return {
		...country,
		Value: parseFloat(country.Value),
	};
});

export const mockAutoVizData = intValuesCountryData
	.slice()
	.filter(
		(country) =>
			country.Series === "Population mid-year estimates (millions)" && country.Year === 2022,
	)
	.sort((a, b) => descending(a.Value, b.Value))
	.filter((country, i) => i < 10)
	.sort((a, b) => ascending(a.Value, b.Value))
	.map((item, i) => {
		return {
			"Region/Country/Area": item["Region/Country/Area"],
			"Population, density and surface area": item["Population, density and surface area"],
			Year: item.Year,
			Series: item.Series,
			Value: item.Value,
		};
	})
	.filter(Boolean); // Remove null entries;

// export const mockAutoVizData = Object.fromEntries(
// 	sortedCountryData.map((country, i) => [
// 		country["Population, density and surface area"],
// 		country.Value,
// 	]),
// );
