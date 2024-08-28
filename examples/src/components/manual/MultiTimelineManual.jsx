import { Group } from "@visx/group";
import { GridRows } from "@visx/grid";
import { Axis } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import countryData from "../../data/country_data.json";
import { chartDimensions } from "./chart.constants";
import { AutoVizuA11y } from "@feedzai/autovizua11y";
import transformJSONmulti from "../../data/transformJSONmulti.js";

function MultiSeriesTimelineManual({ longDesc, shortDesc }) {
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
				country.Series === "Population mid-year estimates (millions)" &&
				(country["Population, density and surface area"] === "Latvia" ||
					country["Population, density and surface area"] === "Lithuania" ||
					country["Population, density and surface area"] === "Croatia"),
		);

	const autovizData1 = Object.fromEntries(
		sortedCountryData
			.filter((country) => country["Population, density and surface area"] === "Latvia")
			.map((country) => [country["Year"], country.Value]),
	);
	const autovizData2 = Object.fromEntries(
		sortedCountryData
			.filter((country) => country["Population, density and surface area"] === "Lithuania")
			.map((country) => [country["Year"], country.Value]),
	);
	const autovizData3 = Object.fromEntries(
		sortedCountryData
			.filter((country) => country["Population, density and surface area"] === "Croatia")
			.map((country) => [country["Year"], country.Value]),
	);

	let autovizData = [];
	autovizData.push(
		{ Croatia: { ...autovizData3 } },
		{ Latvia: { ...autovizData1 } },
		{ Lithuania: { ...autovizData2 } },
	);
	const final = Object.assign({}, ...autovizData);
	const accessors = {
		xAccessor: (d) => d.Year,
		yAccessor: (d) => d.Value,
	};
	const xMax = 380 - 40 - 20;
	const yMax = chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom;

	const yScale = scaleLinear({
		range: [yMax, 0],
		domain: [0, 5],
		nice: true,
	});
	const xScale = scaleLinear({
		range: [0, xMax],
		domain: [2010, 2022],
	});

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
	const formatDate = (year) => year.toString();

	const dataTransformed = transformJSONmulti(final);

	return (
		<div style={{ textAlign: "left" }}>
			<h4 style={{ marginBottom: 2 }}>
				<mark
					style={{
						backgroundColor: "#0460FF",
						color: "white",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					Latvia
				</mark>{" "}
				,{" "}
				<mark
					style={{
						backgroundColor: "#48B970",
						color: "white",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					Lithuania
				</mark>
				, and{" "}
				<mark
					style={{
						backgroundColor: "#1A274E",
						color: "white",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					Croatia
				</mark>{" "}
				are among the countries where population is decreasing
			</h4>
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
				multiSeries="series"
				type="Multi line chart"
				insights="y"
				selectorType={{ element: "circle" }}
				descriptor="millions"
				title="Latvia, Lithuania, and Croatia are among the countries where population is decreasing"
				context={"Countries in Europe are seeing some of the sharpest population decreases. "}
				manualDescriptions={{
					longer: longDesc,
					shorter: shortDesc,
				}}
			>
				<svg width={380} height={chartDimensions.height}>
					<Group left={40} top={20}>
						<GridRows
							scale={yScale}
							numTicks={4}
							strokeDasharray={[3, 5]}
							strokeWidth={0.8}
							width={xMax}
							height={yMax}
						></GridRows>
						<Axis
							scale={yScale}
							orientation="left"
							nice
							hideAxisLine
							numTicks={4}
							tickLength={5}
							tickLabelProps={leftTickLabelProps}
						/>
						{sortedCountryData.map((circ) => {
							const name = circ["Population, density and surface area"];
							return (
								<>
									<circle
										cx={xScale(accessors.xAccessor(circ))}
										cy={yScale(accessors.yAccessor(circ))}
										r={3}
										opacity={1}
										fill={
											name === "Latvia" ? "#0460FF" : name === "Lithuania" ? "#48B970" : "#1A274E"
										}
									></circle>
								</>
							);
						})}
						<LinePath
							data={sortedCountryData.filter(
								(country) => country["Population, density and surface area"] === "Latvia",
							)}
							x={(d) => xScale(accessors.xAccessor(d))}
							y={(d) => yScale(accessors.yAccessor(d))}
							stroke={"#0460FF"}
							strokeWidth={1}
						></LinePath>
						<LinePath
							data={sortedCountryData.filter(
								(country) => country["Population, density and surface area"] === "Lithuania",
							)}
							x={(d) => xScale(accessors.xAccessor(d))}
							y={(d) => yScale(accessors.yAccessor(d))}
							stroke={"#48B970"}
							strokeWidth={1}
						></LinePath>
						<LinePath
							data={sortedCountryData.filter(
								(country) => country["Population, density and surface area"] === "Croatia",
							)}
							x={(d) => xScale(accessors.xAccessor(d))}
							y={(d) => yScale(accessors.yAccessor(d))}
							stroke={"#1A274E"}
							strokeWidth={1}
						></LinePath>
						<Axis
							scale={xScale}
							orientation="bottom"
							nice
							numTicks={4}
							tickFormat={formatDate}
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

export default MultiSeriesTimelineManual;
