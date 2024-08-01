import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { scaleOrdinal } from "@visx/scale";
import countryData from "../../data/country_data.json";
import { chartDimensions } from "./chart.constants";
import { Text } from "@visx/text";
import { AutoVizuA11y } from "@feedzai/autovizua11y";
import transformJSON from "../../data/transformJSON.js";

function PieManual({ longDesc, shortDesc }) {
	const intValuesCountryData = countryData.map((country) => {
		return {
			...country, //copies all countrys first...
			Value: parseInt(country.Value), //...then overwrites pippo
		};
	});

	const populationCountryData = intValuesCountryData
		.slice()
		.filter(
			(country) =>
				country.Series === "Population mid-year estimates (millions)" &&
				country.Year === 2022 &&
				country["Population, density and surface area"] !== "India" &&
				country["Population, density and surface area"] !== "China",
		);

	const shortData = intValuesCountryData
		.slice()
		.filter(
			(country) =>
				country.Series === "Population mid-year estimates (millions)" &&
				country.Year === 2022 &&
				(country["Population, density and surface area"] === "India" ||
					country["Population, density and surface area"] === "China"),
		);

	const sum = {
		"Population, density and surface area": "Other Countries",
		Value: populationCountryData.reduce((acc, obj) => acc + obj.Value, 0),
	};

	shortData.push(sum);

	const innerWidth =
		chartDimensions.width - chartDimensions.marginLeft - chartDimensions.marginRight;
	const innerHeight =
		chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const centerY = innerHeight / 2;
	const centerX = innerWidth / 2;
	const donutThickness = 50;

	const autovizData = Object.fromEntries(
		shortData.map((country) => [
			country["Population, density and surface area"],
			`Population: ${country.Value}`,
		]),
	);

	const value = (d) => d.Value;
	const getColor = scaleOrdinal({
		domain: ["India", "China", "Other Countries"],
		range: ["#6943A1", "#00A39E", "#B3B7C4"],
	});

	const dataTransformed = transformJSON(autovizData);

	return (
		<div style={{ textAlign: "left" }}>
			<h4 style={{ marginBottom: 2 }}>
				More than one third of the world's population lives in{" "}
				<mark
					style={{
						backgroundColor: "#00A39E",
						color: "white",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					China
				</mark>{" "}
				and{" "}
				<mark
					style={{
						backgroundColor: "#6943A1",
						color: "white",
						paddingLeft: 2,
						paddingRight: 2,
					}}
				>
					India
				</mark>{" "}
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
				type="Pie chart"
				selectorType={{ element: "path" }}
				descriptor="millions"
				title="More than one third of the world's population lives in China and India"
				context={
					"A significant proportion of the world's population is concentrated in these two countries."
				}
				insights=""
				manualDescriptions={{
					longer: longDesc,
					shorter: shortDesc,
				}}
			>
				<svg width={chartDimensions.width} height={chartDimensions.height}>
					<Group
						left={centerX + chartDimensions.marginLeft}
						top={centerY + chartDimensions.marginTop + chartDimensions.marginBottom}
					>
						<Pie
							data={shortData}
							pieValue={value}
							outerRadius={radius}
							innerRadius={radius - donutThickness}
							cornerRadius={3}
							padAngle={0.005}
						>
							{(pie) => {
								return pie.arcs.map((arc, index) => {
									const [centroidX, centroidY] = pie.path.centroid(arc);
									const arcPath = pie.path(arc); // svg path for the arc
									const arcFill = getColor(arc.data["Population, density and surface area"]); // We will use our custom function above to get the color of the shape.
									return (
										<>
											<g key={`arc-${arc.data["Population, density and surface area"]}-${index}`}>
												<path d={arcPath} fill={arcFill} />
											</g>
											<Text
												x={
													arc.data["Population, density and surface area"] === "China" ||
													arc.data["Population, density and surface area"] === "India"
														? centroidX + 30
														: centroidX - 90
												}
												y={
													arc.data["Population, density and surface area"] === "China" ||
													arc.data["Population, density and surface area"] === "Other Countries"
														? centroidY
														: centroidY + 40
												}
												style={{
													fontSize: 14,
													fill:
														arc.data["Population, density and surface area"] === "China" ||
														arc.data["Population, density and surface area"] === "India"
															? "black"
															: "black",
												}}
												width={30}
											>
												{arc.data["Population, density and surface area"] + " " + arc.value}
											</Text>
										</>
									);
								});
							}}
						</Pie>
					</Group>
				</svg>
			</AutoVizuA11y>
		</div>
	);
}

export default PieManual;
