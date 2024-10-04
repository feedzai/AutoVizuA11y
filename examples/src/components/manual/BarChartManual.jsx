import { Group } from "@visx/group";
import { GridColumns } from "@visx/grid";
import { Axis } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ascending, descending } from "d3-array";
import { Text } from "@visx/text";
import countryData from "../../data/country_data.json";
import { chartDimensions } from "./chart.constants";
import { AutoVizuA11y } from "@feedzai/autovizua11y";
import transformJSON from "../../data/transformJSON.js";

function BarChartManual({ longDesc, shortDesc }) {
	const intValuesCountryData = countryData.map((country) => {
		return {
			...country, //copies all countrys first...
			Value: parseFloat(country.Value), //...then overwrites pippo
		};
	});

	const sortedCountryData = intValuesCountryData
		.slice()
		.filter(
			(country) =>
				country.Series === "Population mid-year estimates (millions)" && country.Year === 2022,
		)
		.sort((a, b) => descending(a.Value, b.Value))
		.filter((_, i) => i < 10)
		.sort((a, b) => ascending(a.Value, b.Value));

	const autovizData = Object.fromEntries(
		sortedCountryData.map((country) => [
			country["Population, density and surface area"],
			country.Value,
		]),
	);
	let sortedArr = Object.entries(autovizData).sort((a, b) => b[1] - a[1]);
	let sortedObj = Object.fromEntries(sortedArr);
	const accessors = {
		xAccessor: (d) => d.Value,
		yAccessor: (d) => d["Population, density and surface area"],
	};
	const xMax = chartDimensions.width - chartDimensions.marginLeft - chartDimensions.marginRight;
	const yMax = chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom;

	const xScale = scaleLinear({
		range: [0, xMax],
		domain: [0, 1500],
		nice: true,
	});
	const yScale = scaleBand({
		range: [yMax, 0],
		domain: sortedCountryData.map((d) => d["Population, density and surface area"]),
		padding: 0.3,
	});

	const bottomLabelProps = () => ({
		"aria-hidden": "true",
		fontSize: 12,
		textAnchor: "middle",
	});

	const dataTransformed = transformJSON(sortedObj);

	console.log(dataTransformed);

	return (
		<div style={{ textAlign: "left" }}>
			<h2 className={"a11y-examples-title"} style={{ marginBottom: 2 }}>
				<mark
					style={{
						backgroundColor: "#00A39E",
						color: "black",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					China
				</mark>{" "}
				and{" "}
				<mark
					style={{
						backgroundColor: "#965fe6",
						color: "black",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					India
				</mark>{" "}
				are the most populated countries in the world
			</h2>
			<p
				style={{
					marginBottom: 4,
					marginTop: 4,
					fontSize: 12,
					fontStyle: "italic",
				}}
			>
				Top 10 from 2022 (millions)
			</p>
			<AutoVizuA11y
				data={dataTransformed}
				type="Bar chart"
				selectorType={{ element: "rect" }}
				descriptor="millions"
				insights="y"
				title="China and India are the most populated countries"
				context={
					"List of the 10 most populated countries according with UN statistics from 2020. Data is in millions. "
				}
				manualDescriptions={{
					longer: longDesc,
					shorter: shortDesc,
				}}
			>
				<svg width={chartDimensions.width} height={chartDimensions.height}>
					<Group left={chartDimensions.marginLeft} top={chartDimensions.marginTop}>
						<GridColumns
							scale={xScale}
							numTicks={4}
							strokeDasharray={[3, 5]}
							strokeWidth={0.8}
							width={xMax}
							height={yMax}
						></GridColumns>
						{sortedCountryData
							.sort((a, b) => descending(a.Value, b.Value))
							.map((rect) => {
								const barHeight = 20;
								const barWidth = xScale(accessors.xAccessor(rect));
								const barY = yScale(accessors.yAccessor(rect));
								const barX = 0;
								const name = rect["Population, density and surface area"];
								return (
									<>
										<rect
											x={barX}
											y={barY}
											width={barWidth}
											height={barHeight}
											opacity={1}
											fill={name === "China" ? "#00A39E" : name === "India" ? "#965fe6" : "#B3B7C4"}
										></rect>
										<Text
											x={name === "China" || name === "India" ? barX + 5 : barWidth + 5}
											y={barY}
											dy={15}
											style={{
												fontSize: 14,
												fill: "black",
											}}
										>
											{name}
										</Text>
									</>
								);
							})}
						<Axis
							scale={xScale}
							orientation="bottom"
							nice
							numTicks={4}
							top={yMax}
							tickLength={5}
							tickLabelProps={bottomLabelProps}
						/>
					</Group>
				</svg>
			</AutoVizuA11y>
		</div>
	);
}

export default BarChartManual;
