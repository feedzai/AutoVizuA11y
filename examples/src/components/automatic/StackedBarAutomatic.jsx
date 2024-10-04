import { Group } from "@visx/group";
import { GridColumns } from "@visx/grid";
import { Axis } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ascending, descending } from "d3-array";
import { Text } from "@visx/text";
import countryData from "../../data/country_data.json";
import { chartDimensions } from "./chart.constants.js";
import { AutoVizuA11y } from "@feedzai/autovizua11y";

function StackedBar({ apiKey }) {
	const intValuesCountryData = countryData.map((country) => {
		return {
			...country, //copies all countrys first...
			Value: parseFloat(country.Value), //...then overwrites pippo
		};
	});

	const populationData = intValuesCountryData
		.slice()
		.filter(
			(country) =>
				country.Series === "Population mid-year estimates (millions)" && country.Year === 2022,
		);

	const sexRatioData = countryData.filter(
		(country) => country.Series === "Sex ratio (males per 100 females)" && country.Year === 2022,
	);

	const mergedData = populationData
		.map((item, i) => {
			const key = item["Population, density and surface area"];
			const matchingData = sexRatioData[i];
			if (matchingData) {
				return {
					Country: key,
					Population: item.Value,
					SexRatio: parseFloat(matchingData.Value),
				};
			}

			return null; // If no matching entry is found
		})
		.filter(Boolean) // Remove null entries
		.sort((a, b) => descending(a.SexRatio, b.SexRatio))
		.filter((country, i) => i < 5 || i > populationData.length - 6)
		.sort((a, b) => ascending(a.SexRatio, b.SexRatio));

	let mergedAux = [...mergedData];
	mergedAux = mergedAux
		.sort((a, b) => descending(a.SexRatio, b.SexRatio))
		.map((item) => [item, item])
		.flat()
		.map((item, i) => {
			const RatioMale = Math.round((item.SexRatio * 100) / (item.SexRatio + 100));
			const RatioFemale = 100 - RatioMale;
			if (i % 2 == 0) {
				return {
					Country: item.Country,
					Male: RatioMale + "% male",
				};
			} else {
				return {
					Country: item.Country,
					Female: RatioFemale + "% female",
				};
			}
		});

	const accessors = {
		xAccessor: (d) => d.Population,
		yAccessor: (d) => d.Country,
	};
	const xMax = 380 - 40 - 20;
	const yMax = chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom;

	const xScale = scaleLinear({
		range: [0, xMax],
		domain: [0, 100],
		nice: true,
	});

	const yScale = scaleBand({
		range: [yMax, 0],
		domain: mergedData.map((d) => d["Country"]),
		padding: 0.3,
	});

	const bottomLabelProps = () => ({
		"aria-hidden": "true",
		fontSize: 12,
		textAnchor: "middle",
	});

	const leftLabelProps = () => ({
		"aria-hidden": "true",
		fontSize: 11,
		textAnchor: "end",
		width: 100,
		dy: -3,
		verticalAnchor: "middle",
	});

	return (
		<div style={{ textAlign: "left" }}>
			<h2 className={"a11y-examples-title"} style={{ marginBottom: 2 }}>
				The ratio of{" "}
				<mark
					style={{
						backgroundColor: "#00A39E",
						color: "black",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					male
				</mark>{" "}
				to{" "}
				<mark
					style={{
						backgroundColor: "#965fe6",
						color: "black",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					female
				</mark>{" "}
				varies significantly in some countries
			</h2>
			<p
				style={{
					marginBottom: 4,
					marginTop: 4,
					fontSize: 12,
					fontStyle: "italic",
				}}
			>
				Top 10 from 2022 (percentage)
			</p>
			<AutoVizuA11y
				data={mergedAux}
				multiSeries="Country"
				type="Bar chart"
				selectorType={{ element: "rect" }}
				descriptor=""
				insights=""
				title="The ratio of male to female varies significantly in some countries"
				context={
					"List of 10 countries countries with the biggest difference in ratio between male and female. "
				}
				autoDescriptions={{
					dynamicDescriptions: false,
					apiKey: apiKey,
					model: "gpt-3.5-turbo",
					temperature: 0.1,
				}}
			>
				<svg width={chartDimensions.width} height={chartDimensions.height}>
					<Group left={chartDimensions.marginLeft + 65} top={chartDimensions.marginTop}>
						<GridColumns
							scale={xScale}
							numTicks={4}
							strokeDasharray={[3, 5]}
							strokeWidth={0.8}
							width={xMax}
							height={yMax}
						></GridColumns>
						{mergedData
							.sort((a, b) => descending(a.SexRatio, b.SexRatio))
							.map((rect) => {
								const sexRatioMale = (rect.SexRatio * 100) / (rect.SexRatio + 100);
								const sexRatioFemale = 100 - sexRatioMale;
								const barHeight = 20;
								const barWidthMale = xScale(100) * (sexRatioMale / 100);
								const barWidthFemale = xScale(100) * (sexRatioFemale / 100);
								const barWidth = barWidthMale + barWidthFemale;
								const barY = yScale(accessors.yAccessor(rect));
								const barX = 0;
								return (
									<>
										<rect
											x={barX}
											y={barY}
											width={barWidthMale}
											height={barHeight}
											opacity={1}
											fill={"#00A39E"}
										></rect>
										<rect
											x={barWidthMale}
											y={barY}
											width={barWidthFemale}
											height={barHeight}
											opacity={1}
											fill={"#965fe6"}
										></rect>
										<Text
											x={barX + 5}
											y={barY}
											dy={15}
											style={{
												fontSize: 14,
												fill: "black",
											}}
											fontWeight="bold"
										>
											{Math.round(sexRatioMale) + "%"}
										</Text>
										<Text
											x={barWidthMale + 5}
											y={barY}
											dy={15}
											style={{
												fontSize: 14,
												fill: "black",
											}}
											fontWeight="bold"
										>
											{Math.round(sexRatioFemale) + "%"}
										</Text>
										<Text
											x={barWidth + 5}
											y={barY}
											dy={15}
											style={{
												fontSize: 14,
												fill: "black",
											}}
										>
											{/* {name} */}
										</Text>
									</>
								);
							})}
						<Axis
							scale={yScale}
							orientation="left"
							nice
							hideAxisLine
							numTicks={10}
							tickLabelProps={leftLabelProps}
							strokeWidth={0}
							tickLength={5}
						/>
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

export default StackedBar;
