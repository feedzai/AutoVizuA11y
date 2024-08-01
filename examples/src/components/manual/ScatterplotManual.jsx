import { Group } from "@visx/group";
import { GridColumns } from "@visx/grid";
import { Axis } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { AutoVizuA11y } from "@feedzai/autovizua11y";
import countryData from "../../data/country_data.json";
import { chartDimensions } from "./chart.constants";
import { ascending } from "d3-array";

function ScatterplotManual({ longDesc, shortDesc }) {
	const intValuesCountryData = countryData.map((country) => {
		return {
			...country,
			Value: parseInt(country.Value),
		};
	});

	const populationCountryData = intValuesCountryData
		.slice()
		.filter(
			(country) =>
				country.Series === "Population mid-year estimates (millions)" && country.Year === 2022,
		);
	const surfaceCountryData = intValuesCountryData
		.slice()
		.filter((country) => country.Series === "Surface area (thousand km2)" && country.Year === 2020)
		.map((elem) => {
			elem.Surface = elem.Series;
			elem.SurfaceValue = elem.Value;
			delete elem.Series;
			delete elem.Value;
			return elem;
		});

	// Create a mapping of surfaceCountryData based on the common key
	const surfaceDataMapping = new Map();
	surfaceCountryData.forEach((item) => {
		const key = item["Population, density and surface area"];
		surfaceDataMapping.set(key, item);
	});

	const mergedCountryData = populationCountryData
		.map((item) => {
			const key = item["Population, density and surface area"];
			const matchingSurfaceData = surfaceDataMapping.get(key);

			if (matchingSurfaceData) {
				return {
					"Population, density and surface area": key,
					Value: item.Value,
					SurfaceValue: matchingSurfaceData.SurfaceValue,
				};
			}

			return null; // If no matching entry is found
		})
		.filter(Boolean) // Remove null entries
		.sort((a, b) => ascending(a.SurfaceValue, b.SurfaceValue));

	const AutoVizuA11yArray = [];

	mergedCountryData.forEach((data) => {
		// Create a new object with only the desired keys
		const newObj = {
			"Population, density and surface area": data["Population, density and surface area"],
			Value: data.Value + " million people",
			SurfaceValue: data.SurfaceValue + " thousand square kilometers",
		};

		// Push the new object to the newArray
		AutoVizuA11yArray.push(newObj);
	});

	let mergedCountryDataAux = mergedCountryData.slice(-10);
	let AutoVizuA11yArrayAux = AutoVizuA11yArray.slice(-10);

	const accessors = {
		xAccessor: (d) => d.SurfaceValue,
		yAccessor: (d) => d.Value,
	};
	const xMax = 380 - 40 - 20;
	const yMax = chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom;

	const yScale = scaleLinear({
		range: [yMax, 0],
		domain: [0, 1500],
		nice: true,
	});
	// const xScale = scaleLog({
	//   range: [0, xMax],
	//   domain: [1, 100000],
	// });
	const xScale = scaleLinear({
		range: [0, xMax],
		domain: [0, 20000],
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

	return (
		<div style={{ textAlign: "left" }}>
			<h4 style={{ marginBottom: 2 }}>Countries with the highest surface area</h4>
			<p
				style={{
					marginBottom: 4,
					marginTop: 4,
					fontSize: 12,
					fontStyle: "italic",
				}}
			>
				Top 10 from 2020 (millions per thousand km2)
			</p>
			<AutoVizuA11y
				data={AutoVizuA11yArrayAux}
				type="Scatterplot"
				selectorType={{ element: "circle" }}
				descriptor=""
				insights=""
				title="Countries with the highest surface area"
				context={"series of charts depicting world population"}
				manualDescriptions={{
					longer: longDesc,
					shorter: shortDesc,
				}}
			>
				<svg width={380} height={chartDimensions.height}>
					<Group left={40} top={20}>
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
						<Axis
							scale={xScale}
							orientation="bottom"
							nice
							numTicks={4}
							top={yMax}
							tickLength={5}
							tickLabelProps={bottomLabelProps}
						/>
						{mergedCountryDataAux.map((circ) => {
							return (
								<>
									<circle
										cx={xScale(accessors.xAccessor(circ))}
										cy={yScale(accessors.yAccessor(circ))}
										r={3}
										opacity={1}
										fill={"#43aa8b"}
									></circle>
								</>
							);
						})}
					</Group>
				</svg>
			</AutoVizuA11y>
		</div>
	);
}

export default ScatterplotManual;
