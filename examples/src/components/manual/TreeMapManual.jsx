import { Group } from "@visx/group";
import { Treemap, hierarchy, stratify, treemapSquarify } from "@visx/hierarchy";
import countryData from "../../data/country_data.json";
import { chartDimensions } from "./chart.constants.js";
import { Text } from "@visx/text";
import { descending } from "d3-array";
import { AutoVizuA11y } from "@feedzai/autovizua11y";
import transformJSON from "../../data/transformJSON.js";

function TreemapManual({ longDesc, shortDesc }) {
	const intValuesCountryData = countryData.map((country) => {
		return {
			...country, //copies all countrys first...
			Value: parseFloat(country.Value), //...then overwrites pippo
		};
	});

	const surfaceCountryData = intValuesCountryData
		.slice()
		.filter((country) => country.Series === "Surface area (thousand km2)" && country.Year === 2020)
		.map((elem) => {
			elem.Surface = elem.Series;
			elem.SurfaceValue = elem.Value;
			elem.Country = elem["Population, density and surface area"];
			elem.Parent = 1;
			delete elem.Series;
			delete elem.Value;
			delete elem["Population, density and surface area"];
			return elem;
		});
	const parent = {
		Country: 1,
		SurfaceValue: 0,
		Parent: null,
	};
	const autovizData = Object.fromEntries(
		surfaceCountryData
			.sort((a, b) => descending(a.SurfaceValue, b.SurfaceValue))
			.map((country) => [country["Country"], country.SurfaceValue]),
	);
	surfaceCountryData.push(parent);

	const dataStratified = stratify()
		.id((d) => d["Country"])
		.parentId((d) => d["Parent"])(surfaceCountryData)
		.sum((d) => d.SurfaceValue ?? 0);
	const xMax = chartDimensions.width - chartDimensions.marginLeft - chartDimensions.marginRight;
	const yMax = chartDimensions.height - chartDimensions.marginTop;
	const root = hierarchy(dataStratified).sort((a, b) => (b.value || 0) - (a.value || 0));

	const dataTransformed = transformJSON(autovizData);

	return (
		<div style={{ textAlign: "left" }}>
			<h4 style={{ marginBottom: 2 }}>
				Russia, Canada, China and the USA are the largest countries
			</h4>
			<p style={{ marginBottom: 4, marginTop: 4, fontSize: 12 }}>Surface area (thousand km2)</p>
			<AutoVizuA11y
				data={dataTransformed}
				type="Tree map"
				selectorType={{ element: "rect" }}
				descriptor="millions"
				insights="y"
				title="Russia, Canada, China and the USA are the largest countries"
				context={"A few countries like Russia, Canada, China, and USA occupy a significant area. "}
				manualDescriptions={{
					longer: longDesc,
					shorter: shortDesc,
				}}
			>
				<svg width={chartDimensions.width} height={chartDimensions.height}>
					<Treemap
						top={chartDimensions.marginTop}
						root={root}
						size={[xMax, yMax]}
						tile={treemapSquarify}
						round
					>
						{(treemap) => (
							<Group>
								{treemap.descendants().map((node, i) => {
									const nodeWidth = node.x1 - node.x0;
									const nodeHeight = node.y1 - node.y0;
									return (
										<Group
											key={`node-${i}`}
											top={node.y0 + chartDimensions.marginTop}
											left={node.x0 + chartDimensions.marginLeft}
										>
											{node.depth === 1 && (
												<>
													<rect
														width={nodeWidth}
														height={nodeHeight}
														strokeWidth={2}
														stroke="white"
														fill={node.value > 9000 ? "#D74D51" : "#B3B7C4"}
													/>
													{node.data.data.SurfaceValue > 9000 ? (
														<Text
															x={node.x0 + 5}
															y={(node.y1 - node.y0) / 5}
															style={{
																fontSize: 10,
																fill: "white",
															}}
														>
															{node.data.data.Country}
														</Text>
													) : null}
												</>
											)}
										</Group>
									);
								})}
							</Group>
						)}
					</Treemap>
				</svg>
			</AutoVizuA11y>
		</div>
	);
}

export default TreemapManual;
