/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { Group } from "@visx/group";
import { GridColumns } from "@visx/grid";
import { Axis } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ascending, descending } from "d3-array";
import { Text } from "@visx/text";
import { mockChartData } from "./mockChartData";
import React from "react";

function BarChart() {
	const chartDimensions = {
		marginTop: 0,
		marginLeft: 3,
		marginBottom: 40,
		marginRight: 10,
		width: 400,
		height: 350,
	}; // px

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
		fontFamily: "Roboto ",
	});
	return (
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
				<g data-testid={"chart-svg"}>
					{sortedCountryData.map((rect, i) => {
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
									fill={name === "China" ? "#00A39E" : name === "India" ? "#6943A1" : "#B3B7C4"}
									data-testid="data-points"
								>
									{i}
								</rect>
								<Text
									x={name === "China" || name === "India" ? barX + 5 : barWidth + 5}
									y={barY}
									dy={15}
									style={{
										fontSize: 14,
										fill: name === "China" || name === "India" ? "white" : "black",
									}}
								>
									{name}
								</Text>
							</>
						);
					})}
				</g>
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
	);
}

export default BarChart;
