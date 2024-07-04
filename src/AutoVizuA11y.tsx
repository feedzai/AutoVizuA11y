/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React, { useEffect, useRef, useState } from "react";

import { addAriaLabels, switchToChartLevel } from "./components";
import { arrayConverter, newId } from "./utils";

import ShortcutGuide from "./ShortcutGuide";
import { generateDescriptions } from "./components/descriptions/DescriptionsGenerator";
import { insightsCalculator } from "./utils/insightsCalculator";
import { descriptionsKeyHandler } from "./components/descriptions/DescriptionsKeyHandler";

import "./assets/style/AutoVizuA11y.css";
import { handleFirstFocus } from "./utils/handleFirstFocus";
import { handleBlur } from "./utils/handleBlur";
import { handleKeyDown } from "./utils/handleKeyDown";
import { guideKeyHandler } from "./components/navigation/GuideKeyHandler";

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
 * @return {JSX.Element} Rendered chart with AutoVizuA11y features.
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
	const [series, setSeries] = useState<string[]>([]);
	const [selectedSeries, setSelectedSeries] = useState<string>("");
	const [insightsArray, setInsightsArray] = useState<number[]>([]);
	const [arrayConverted, setArrayConverted] = useState<number[]>([]);
	const [number, setNumber] = useState<number>(1);
	const [descs, setDescs] = useState<string[]>([]);
	const [descriptionContent, setDescriptionContent] = useState<string>("Generating description...");

	const ref = useRef<HTMLDivElement>(null);
	const shortcutGuideRef = useRef<HTMLDivElement>(null);

	let alertDivRef = useRef<HTMLDivElement>(null);
	let alertDiv: React.ReactNode = (
		<div
			ref={alertDivRef}
			className="a11y_alert visually-hidden"
			role="alert"
			aria-live="assertive"
		>
			{"\u00A0"}
		</div>
	);

	let chartDescription: React.ReactNode = (
		<p
			style={{ textIndent: "-10000px" }}
			className="a11y_desc visually-hidden"
			data-testid="a11y_desc"
			onFocus={() => {
				handleFirstFocus(alertDiv, ref, alertDivRef);
			}}
			onBlur={(_) => handleBlur(ref)}
			aria-label={descriptionContent}
		>
			{descriptionContent}
		</p>
	);

	let chart = React.Children.map(children, (child) => <div>{child}</div>);

	let storedLonger: string | null;
	let storedSmaller: string | null;

	let toolTutorial;

	let apiKey: string;
	let model: string | undefined;
	let temperature: number | undefined;

	let elements: HTMLElement[] = [];

	let componentId = "";

	if (ref.current) {
		if (selectorType.element !== undefined) {
			elements = Array.from(ref.current.querySelectorAll(selectorType.element));
		} else {
			elements = Array.from(
				ref.current.getElementsByClassName(selectorType.className || ""),
			) as HTMLElement[];
		}
	}

	// verify if an insights key was passed and it exists in the data
	if (insights == undefined || !(insights in data[0])) {
		insights = "";
	}

	useEffect(() => {
		// generate an unique id for this instance of AutoVizuA11y
		componentId = newId();

		// verify if autoDescriptions was chosen
		if (autoDescriptions) {
			apiKey = autoDescriptions.apiKey;
			model = autoDescriptions.model;
			temperature = autoDescriptions.temperature;
		}

		// features exclusive to bar charts (might be able to turn this more modular)
		if (!selectorType) {
			console.log("Type of chart not supported or no type given");
		}
	}, []);

	useEffect(() => {
		// Retrieve the value of toolTutorial to check if it has been shown before
		toolTutorial = localStorage.getItem("toolTutorial");

		//If it does not exist, set it to true to show it the first time
		if (!toolTutorial) {
			localStorage.setItem("toolTutorial", "true");
			toolTutorial = "true";
		}

		let storedLongerKey = `oldLonger_${componentId}`;
		let storedSmallerKey = `oldSmaller_${componentId}`;

		//in case of using static descriptions
		if (autoDescriptions !== undefined && autoDescriptions.dynamicDescriptions === false) {
			// Retrieve the descs from localStorage when the component mounts
			storedLonger = localStorage.getItem(storedLongerKey);
			storedSmaller = localStorage.getItem(storedSmallerKey);
		} else if (manualDescriptions !== undefined) {
			// Retrieve the descs from the manualDescriptions prop
			storedLonger = manualDescriptions.longer;
			storedSmaller = manualDescriptions.shorter;
		}

		if (multiSeries && multiSeries != "") {
			//maps to a new array of only the keys, then a set with unique keys, and finally spreads them
			const uniqueValues = [...new Set(data.map((item: any) => item[multiSeries]))];
			setSeries(uniqueValues);
			setSelectedSeries(uniqueValues[0]);
		}

		let descsAux;
		//needs a slight delay since some elements take time to load
		setTimeout(() => {
			//converts the data into a dictionary
			arrayConverter(data, insights).then(function (result) {
				//result = [2,3,5] or []
				let insightsArrayAux: number[] = [];
				let averageAux = 0;
				setArrayConverted(result);
				if (insights !== "") {
					insightsArrayAux = insightsCalculator(result);
					setInsightsArray(insightsArrayAux);

					averageAux = insightsArrayAux[1];
				}

				addAriaLabels(ref, descriptor, selectorType, data, multiSeries);

				if (storedLonger !== null && storedSmaller !== null) {
					descsAux = [storedLonger, storedSmaller];
					setDescs([storedLonger, storedSmaller]);
					descriptionsKeyHandler(
						ref,
						setDescriptionContent,
						type,
						descsAux,
						title,
						autoDescriptions,
					);
				} else {
					generateDescriptions(title, data, averageAux, context, apiKey, model, temperature).then(
						function (result) {
							descsAux = result; // Output: [longerDescValue, smallerDescValue]
							setDescs(result); // Output: [longerDescValue, smallerDescValue]
							descriptionsKeyHandler(
								ref,
								setDescriptionContent,
								type,
								descsAux,
								title,
								autoDescriptions,
							);

							if (autoDescriptions && autoDescriptions.dynamicDescriptions === false) {
								localStorage.setItem(storedLongerKey, descsAux[0]);
								localStorage.setItem(storedSmallerKey, descsAux[1]);
							}
						},
					);
				}
			});

			// sets the navigation onto the charts first
			switchToChartLevel(ref, true);
		}, 500);
	}, [ref]);

	return (
		<>
			<div
				ref={ref}
				onKeyDown={(event) => {
					handleKeyDown(
						event,
						alertDivRef,
						type,
						number,
						ref,
						elements,
						selectedSeries,
						series,
						selectorType,
						setSelectedSeries,
						setNumber,
						setDescriptionContent,
						insights,
						insightsArray,
						arrayConverted,
						title,
						descs,
						autoDescriptions,
						multiSeries,
					);
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
					guideKeyHandler(event, ref);
				}}
				id="a11y_nav_guide"
			>
				<ShortcutGuide />
			</div>
		</>
	);
};

export default AutoVizuA11y;
