/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { addAriaLabels, switchToChartLevel } from "./components";
import { arrayConverter } from "./utils";

import ShortcutGuide from "./ShortcutGuide";
import { generateDescriptions } from "./components/descriptions/DescriptionsGenerator";
import { insightsCalculator } from "./utils/insightsCalculator";
import { descriptionsKeyHandler } from "./components/descriptions/DescriptionsKeyHandler";

import { handleFirstFocus } from "./utils/handleFirstFocus";
import { handleBlur } from "./utils/handleBlur";
import { handleKeyDown } from "./utils/handleKeyDown";
import { guideKeyHandler } from "./components/navigation/GuideKeyHandler";

import { useAutoId } from "@feedzai/js-utilities/hooks";
import { getLSItem, setLSItem } from "@feedzai/js-utilities";

import * as constants from "./constants";

import "./assets/style/AutoVizuA11y.css";
import { initToolTutorial } from "./utils/initToolTutorial";

type AutoDescriptionsProps = {
	dynamicDescriptions?: boolean;
	apiKey: string;
	model?: string;
	temperature?: number;
};

type ManualDescriptionsProps = {
	longer: string;
	shorter: string;
};

type SelectorType = {
	element?: string;
	className?: string;
};

type AutoVizuA11yProps = {
	data: object[];
	selectorType: SelectorType;
	type: string;
	title: string;
	context: string;
	insights: string;
	descriptor?: string;
	multiSeries?: string;
	autoDescriptions?: AutoDescriptionsProps;
	manualDescriptions?: ManualDescriptionsProps;
	children: React.ReactNode;
};

/**
 * AutoVizuA11y component that adds screen-reader accessibility to wrapped charts.
 *
 * @param {AutoVizuA11yProps} {
 * 	type, - type of chart;
 * 	descriptor, - descriptor of each data element;
 * 	selectorType, - HTML type or classname of the data elements in the DOM;
 * 	title, - title of the chart;
 * 	data, - data used in the chart;
 * 	multiSeries, - key in the data object that defines each series;
 * 	insights, - key in the data object from which values will be used to derive statistical insights;
 * 	context, - context in which the visualization is present;
 * 	manualDescriptions, - object with properties to manually write the chart descriptions;
 * 	autoDescriptions, - object with properties to automatically write the chart descriptions;
 * 	children, - wrapped chart.
 * }
 * @return Rendered chart with AutoVizuA11y features.
 *
 * @example
 * // SingleSeries with automatic descriptions
 *
 * 			<AutoVizuA11y
 *				data={barData}
 *				selectorType={{ element: "rect" }}
 *				type="bar chart"
 *				title="Number of hours spent looking at a screen per day of the week."
 *				context="Screen time dashboard"
 *				insights="value"
 *				descriptor="hours"
 *				autoDescriptions={{
 *					dynamicDescriptions: false,
 *					apiKey: API_KEY,
 *					model: "gpt-3.5-turbo",
 *					temperature: 0.1,
 *				}}
 *			>
 *				<BarChart></BarChart>
 *			</AutoVizuA11y>
 */
const AutoVizuA11y = ({
	type,
	descriptor,
	selectorType,
	title,
	data,
	multiSeries,
	insights,
	context,
	manualDescriptions,
	autoDescriptions,
	children,
}: AutoVizuA11yProps) => {
	const validatedInsights = useMemo(() => {
		if (!selectorType) {
			console.warn("Type of chart not supported or no type given");
			return "";
		}
		return insights && insights in data[0] ? insights : "";
	}, [selectorType, insights, data]);

	const [series, setSeries] = useState<string[]>([]);
	const [selectedSeries, setSelectedSeries] = useState<string>("");
	const [insightsArray, setInsightsArray] = useState<number[]>([]);
	const [arrayConverted, setArrayConverted] = useState<number[]>([]);
	const [number, setNumber] = useState<number>(1);
	const [descs, setDescs] = useState<string[]>([]);
	const [descriptionContent, setDescriptionContent] = useState<string>("Generating description...");
	const [elements, setElements] = useState<HTMLElement[]>([]);

	const chartRef = useRef<HTMLDivElement>(null);
	const shortcutGuideRef = useRef<HTMLDivElement>(null);

	let componentId = useAutoId();

	let alertDivRef = useRef<HTMLDivElement>(null);
	let alertDiv: React.ReactNode = useMemo(
		() => (
			<div
				ref={alertDivRef}
				className="a11y_alert visually-hidden"
				role="alert"
				aria-live="assertive"
			>
				{"\u00A0"}
			</div>
		),
		[],
	);

	const onFocusHandler = useCallback(() => {
		handleFirstFocus({ alertDiv, chartRef, alertDivRef });
	}, [alertDiv, chartRef, alertDivRef]);

	const onBlurHandler = useCallback(() => {
		handleBlur(chartRef);
	}, [chartRef]);

	let chartDescription: React.ReactNode = useMemo(
		() => (
			<p
				style={{ textIndent: "-10000px" }}
				className="a11y_desc visually-hidden"
				data-testid="a11y_desc"
				onFocus={onFocusHandler}
				onBlur={onBlurHandler}
				aria-label={descriptionContent}
			>
				{descriptionContent}
			</p>
		),
		[descriptionContent, onFocusHandler, onBlurHandler],
	);

	let chart = useMemo(
		() => React.Children.map(children, (child) => <div>{child}</div>),
		[children],
	);

	useEffect(() => {
		if (!chartRef.current) {
			return;
		}
		const SELECTOR = selectorType.element || `.${selectorType.className ?? ""}`;
		const NEW_ELEMENTS = Array.from(chartRef.current.querySelectorAll(SELECTOR)) as HTMLElement[];
		setElements(NEW_ELEMENTS);
	}, [chartRef, selectorType]);

	useEffect(() => {
		initToolTutorial();

		let storedLongerKey = `oldLonger_${componentId}`;
		let storedSmallerKey = `oldSmaller_${componentId}`;

		if (multiSeries && multiSeries != "") {
			//maps to a new array of only the keys, then a set with unique keys, and finally spreads them
			const uniqueValues = [...new Set(data.map((item: any) => item[multiSeries]))];
			setSeries(uniqueValues);
			setSelectedSeries(uniqueValues[0]);
		}

		//needs a slight delay since some elements take time to load
		setTimeout(() => {
			//converts the data into a dictionary
			arrayConverter(data, validatedInsights).then(function (result) {
				//result = [2,3,5] or []
				let insightsArrayAux: number[] = [];
				let averageAux = 0;
				setArrayConverted(result);
				if (validatedInsights !== "") {
					insightsArrayAux = insightsCalculator(result);
					setInsightsArray(insightsArrayAux);

					averageAux = insightsArrayAux[1];
				}

				addAriaLabels({ chartRef, descriptor, selectorType, data, multiSeries });

				let chartDescriptions: string[] = [];

				//in case of using static descriptions
				if (autoDescriptions !== undefined && autoDescriptions.dynamicDescriptions === false) {
					// Retrieve the descs from localStorage when the component mounts
					chartDescriptions = [getLSItem(storedLongerKey)!, getLSItem(storedSmallerKey)!];
				} else if (manualDescriptions !== undefined) {
					// Retrieve the descs from the manualDescriptions prop
					chartDescriptions = [manualDescriptions.longer, manualDescriptions.shorter];
				}

				if (chartDescriptions[0] !== null && chartDescriptions[1] !== null) {
					setDescs(chartDescriptions);
					descriptionsKeyHandler({
						chartRef,
						setDescriptionContent,
						type,
						descs: chartDescriptions,
						title,
						autoDescriptions,
					});
				} else {
					generateDescriptions({
						title,
						data,
						average: averageAux,
						context,
						apiKey: autoDescriptions!.apiKey,
						model: autoDescriptions!.model,
						temperature: autoDescriptions!.temperature,
					}).then(function (result) {
						chartDescriptions = result; // Output: [longerDescValue, smallerDescValue]
						setDescs(result); // Output: [longerDescValue, smallerDescValue]
						descriptionsKeyHandler({
							chartRef,
							setDescriptionContent,
							type,
							descs: chartDescriptions,
							title,
							autoDescriptions,
						});

						if (autoDescriptions && autoDescriptions.dynamicDescriptions === false) {
							setLSItem(storedLongerKey, chartDescriptions[0]);
							setLSItem(storedSmallerKey, chartDescriptions[1]);
						}
					});
				}
			});

			// sets the navigation onto the charts first
			switchToChartLevel(chartRef, true);
		}, constants.TIME_TO_WAIT_BEFORE_HANDLING_DESCRIPTIONS);
	}, [chartRef]);

	return (
		<>
			<div
				ref={chartRef}
				onKeyDown={(event) => {
					handleKeyDown({
						event,
						alertDivRef,
						type,
						number,
						chartRef,
						elements,
						selectedSeries,
						series,
						selectorType,
						setSelectedSeries,
						setNumber,
						setDescriptionContent,
						insights: validatedInsights,
						insightsArray,
						arrayConverted,
						title,
						descs,
						autoDescriptions,
						multiSeries,
					});
				}}
				className="a11y_chart"
				data-testid="a11y_chart"
				role="form"
				key={`a11y_chart_${componentId}`}
			>
				{chartDescription}
				<div id="a11y_number" aria-hidden="true"></div>
				{alertDiv}
				{chart}
			</div>
			<div
				ref={shortcutGuideRef}
				onKeyDown={(event) => {
					guideKeyHandler(event, chartRef);
				}}
				id="a11y_nav_guide"
			>
				<ShortcutGuide />
			</div>
		</>
	);
};

export default AutoVizuA11y;
