import { Group } from "@visx/group";
import { GridColumns } from "@visx/grid";
import { Axis } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import countryData from "../../data/country_data.json";
import { chartDimensions } from "./chart.constants.js";
import { AutoVizuA11y } from "@feedzai/autovizua11y";
import transformJSON from "../../data/transformJSON.js";
import CustomShortcutGuide from "../custom_shortcut_guide/components/CustomShortcutGuide.tsx";

function SingleSeriesTimelineManual({ longDesc, shortDesc }) {
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
				country["Population, density and surface area"] === "India",
		);

	const autovizData = Object.fromEntries(
		sortedCountryData.map((country) => [country["Year"], country.Value]),
	);

	const accessors = {
		xAccessor: (d) => d.Year,
		yAccessor: (d) => d.Value,
	};
	const xMax = 380 - 40 - 20;
	const yMax = chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom;

	const yScale = scaleLinear({
		range: [yMax, 0],
		domain: [0, 1500],
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

	const dataTransformed = transformJSON(autovizData);

	return (
		<div style={{ textAlign: "left" }}>
			<h2 className={"a11y-examples-title"} style={{ marginBottom: 2 }}>
				<mark
					style={{
						backgroundColor: "#965FE6",
						color: "black",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					India's
				</mark>{" "}
				population went from 1.24 billion in 2010 to 1.42 billion in 2022
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
				type="Single line chart"
				selectorType={{ element: "circle" }}
				descriptor="millions"
				insights="y"
				title="India's population went from 1.24 billion in 2010 to 1.42 billion in 2022"
				context={"Data portrays the growth in population in India in the last decade "}
				manualDescriptions={{
					longer: longDesc,
					shorter: shortDesc,
				}}
				shortcutGuide={<CustomShortcutGuide></CustomShortcutGuide>}
			>
				<svg width={380} height={chartDimensions.height}>
					<Group left={40} top={0}>
						<GridColumns
							scale={xScale}
							numTicks={4}
							strokeDasharray={[3, 5]}
							strokeWidth={0.8}
							width={xMax}
							height={yMax}
						></GridColumns>
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
							return (
								<>
									<circle
										cx={xScale(accessors.xAccessor(circ))}
										cy={yScale(accessors.yAccessor(circ))}
										r={3}
										opacity={1}
										fill={"#965FE6"}
									></circle>
								</>
							);
						})}
						<LinePath
							data={sortedCountryData}
							x={(d) => xScale(accessors.xAccessor(d))}
							y={(d) => yScale(accessors.yAccessor(d))}
							stroke={"#965FE6"}
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

export default SingleSeriesTimelineManual;
