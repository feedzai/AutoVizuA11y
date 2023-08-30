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
