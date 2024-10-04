import { Group } from "@visx/group";
import countryData from "../../data/country_data.json";
import { chartDimensions } from "./chart.constants.js";
import genBins from "@visx/mock-data/lib/generators/genBins";
import { ascending, descending } from "d3-array";
import { scaleLinear, scaleBand } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";
import { Axis } from "@visx/axis";
import { AutoVizuA11y } from "@feedzai/autovizua11y";
import transformJSON from "../../data/transformJSON.js";

function HeatmapManual({ longDesc, shortDesc }) {
	const intValuesCountryData = countryData.map((country) => {
		return {
			...country, //copies all countrys first...
			Value: parseFloat(country.Value), //...then overwrites pippo
		};
	});
	const sortedCountryData2022 = intValuesCountryData
		.slice()
		.filter(
			(country) =>
				country.Series === "Population mid-year estimates (millions)" && country.Year === 2022,
		)
		.map((elem) => {
			delete elem.Year;
			return elem;
		});

	const sortedCountryData2015 = intValuesCountryData
		.slice()
		.filter(
			(country) =>
				country.Series === "Population mid-year estimates (millions)" && country.Year === 2015,
		)
		.map((elem) => {
			elem.Value2015 = elem.Value;
			delete elem.Series;
			delete elem.Value;
			delete elem.Year;
			return elem;
		});
	const sortedCountryData2010 = intValuesCountryData
		.slice()
		.filter(
			(country) =>
				country.Series === "Population mid-year estimates (millions)" && country.Year === 2010,
		)
		.map((elem) => {
			elem["2010"] = elem.Value;
			delete elem.Series;
			delete elem.Value;
			delete elem.Year;
			return elem;
		});

	let mergedCountryData = sortedCountryData2022.map((item, i) =>
		Object.assign({}, item, sortedCountryData2015[i], sortedCountryData2010[i]),
	);
	let filteredCountryData = mergedCountryData
		.sort((a, b) => descending(a.Value, b.Value))
		.filter((country, i) => i < 10)
		.sort((a, b) => ascending(a.Value, b.Value))
		.map((elem) => {
			elem.change2010_2015 = (elem.Value2015 - elem["2010"]) / elem.Value2015;
			elem.change2015_2022 = (elem.Value - elem.Value2015) / elem.Value2015;
			return elem;
		});

	function generator(year) {
		return genBins(
			/* length = */ 1,
			/* height = */ 10,
			/** binFunc */ (idx) => idx,
			/** countFunc */ (i) => filteredCountryData[i][year],
		);
	}
	let binData = [];
	binData.push(generator("2010")[0], generator("Value2015")[0], generator("Value")[0]);
	binData.map((bin, i) => {
		bin.bin = i;
		return bin;
	});

	const xMax = chartDimensions.width - chartDimensions.marginLeft - 70;
	const yMax = chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom;

	function max(data, value) {
		return Math.max(...data.map(value));
	}

	// accessors
	const bins = (d) => d.bins;

	const bucketSizeMax = max(binData, (d) => bins(d).length);

	// scales
	const xScale = scaleLinear({
		domain: [0, binData.length],
		range: [0, xMax],
	});
	const yScale = scaleLinear({
		domain: [bucketSizeMax, 0],
		range: [yMax, 0],
	});

	const xaxisScale = scaleBand({
		range: [0, xMax],
		domain: ["2010", "2015", "2022"],
	});
	const yaxisScale = scaleBand({
		range: [0, yMax],
		domain: filteredCountryData.map((country) => country["Population, density and surface area"]),
	});

	const binWidth = xMax / binData.length;
	const binHeight = yMax / bucketSizeMax;

	const autovizData_0 = Object.fromEntries(
		filteredCountryData.map((country) => [
			country["Population, density and surface area"] + "_2010",
			country[2010],
		]),
	);
	const autovizData_1 = Object.fromEntries(
		filteredCountryData.map((country) => [
			country["Population, density and surface area"] + "_2015",
			country.Value2015,
		]),
	);
	const autovizData_2 = Object.fromEntries(
		filteredCountryData.map((country) => [
			country["Population, density and surface area"] + "_2022",
			country.Value,
		]),
	);
	let autovizData = [];
	autovizData.push(autovizData_0, autovizData_1, autovizData_2);
	const final = Object.assign({}, ...autovizData);

	const bottomLabelProps = () => ({
		"aria-hidden": "true",
		fontSize: 12,
		textAnchor: "middle",
	});
	const leftTickLabelProps = () => ({
		"aria-hidden": "true",
		fontSize: 12,
		x: -10,
		dy: 5,
		textAnchor: "end",
	});

	// Initialize an empty array to store the min and max combinations
	const minMaxCombinations = [];

	// Assuming the number of bins is fixed (e.g., 8 bins)
	const numBins = 10;

	// Iterate through each bin index (0 to 7)
	for (let binIndex = 0; binIndex < numBins; binIndex++) {
		let min = Number.MAX_VALUE;
		let max = Number.MIN_VALUE;

		// Iterate through each level to find the min and max values for the current bin index
		for (const obj of binData) {
			const bins = obj.bins;

			// Check if the current level has the bin index
			if (binIndex < bins.length) {
				const count = bins[binIndex].count;
				if (count < min) {
					min = count;
				}
				if (count > max) {
					max = count;
				}
			}
		}
		// Store the min and max combinations for the current bin index
		minMaxCombinations.push({ binIndex, min, max });
	}

	const dataTransformed = transformJSON(final);

	console.log(dataTransformed);

	return (
		<div style={{ textAlign: "left" }}>
			<h2 className={"a11y-examples-title"} style={{ marginBottom: 2 }}>
				Population is growing in the more populated countries
			</h2>
			<p
				style={{
					marginBottom: 4,
					marginTop: 4,
					fontSize: 12,
					fontStyle: "italic",
				}}
			>
				millions
			</p>
			<AutoVizuA11y
				data={dataTransformed}
				type="Heatmap"
				insights="y"
				selectorType={{ element: "rect" }}
				descriptor="millions"
				title="Population evolution between 2010 and 2022"
				context={
					"In the countries with most population, the number of inhabitants is increasing consistently"
				}
				manualDescriptions={{
					longer: longDesc,
					shorter: shortDesc,
				}}
			>
				<svg width={chartDimensions.width} height={chartDimensions.height}>
					<Group top={chartDimensions.marginTop + 20} left={chartDimensions.marginLeft + 70}>
						<HeatmapRect
							data={binData}
							xScale={(d) => xScale(d) ?? 0}
							yScale={(d) => yScale(d) ?? 0}
							binWidth={binWidth}
							binHeight={binHeight}
							gap={2}
						>
							{(heatmap) =>
								heatmap.map((heatmapBins) => {
									return heatmapBins.map((bin) => {
										const rectColorScale = scaleLinear({
											range: ["white", "#808080"],
											domain: [
												minMaxCombinations[bin.row].min - 10,
												minMaxCombinations[bin.row].max + 10,
											],
										});
										return (
											<rect
												key={`heatmap-rect-${bin.row}-${bin.column}`}
												className="visx-heatmap-rect"
												width={bin.width}
												height={bin.height}
												x={bin.x}
												y={bin.y}
												fill={rectColorScale(bin.count)}
											/>
										);
									});
								})
							}
						</HeatmapRect>
						<Axis
							scale={xaxisScale}
							orientation="bottom"
							nice
							numTicks={4}
							hideAxisLine
							hideTicks
							top={yMax}
							tickLength={5}
							tickLabelProps={bottomLabelProps}
						/>
						<Axis
							scale={yaxisScale}
							orientation="left"
							nice
							hideAxisLine
							hideTicks
							tickLength={5}
							tickLabelProps={leftTickLabelProps}
						/>
					</Group>
				</svg>
			</AutoVizuA11y>
		</div>
	);
}

export default HeatmapManual;
