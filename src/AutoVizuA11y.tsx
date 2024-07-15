/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import {
	addAriaLabels,
	insightsKeyHandler,
	switchToChartLevel,
	navigationKeyHandler,
} from "./components";
import { arrayConverter, newId } from "./utils";

import ShortcutGuide from "./ShortcutGuide";
import { generateDescriptions } from "./components/descriptions/DescriptionsGenerator";
import { insightsCalculator } from "./utils/insightsCalculator";
import { descriptionsChanger } from "./components/descriptions/DescriptionsChanger";

import "./assets/style/AutoVizuA11y.css";

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
	let chart = React.Children.map(children, (child) => <div>{child}</div>);
	const ref = React.useRef<HTMLDivElement>(null);

	let storedLonger: string | null;
	let storedSmaller: string | null;

	let toolTutorial;

	let apiKey: string;
	let model: string | undefined;
	let temperature: number | undefined;

	const [series, setSeries] = useState<string[]>([]);
	const [selectedSeries, setSelectedSeries] = useState<string>("");
	const [insightsArray, setInsightsArray] = useState<number[]>([]);
	const [arrayConverted, setArrayConverted] = useState<number[]>([]);
	const [number, setNumber] = useState<number>(1);
	const [descs, setDescs] = useState<string[]>([]);

	let elements: HTMLElement[] = [];
	let alertDiv: HTMLDivElement;

	if (ref.current) {
		if (selectorType.element !== undefined) {
			elements = Array.from(ref.current.querySelectorAll(selectorType.element));
		} else {
			elements = Array.from(
				ref.current.getElementsByClassName(selectorType.className || ""),
			) as HTMLElement[];
		}
		alertDiv = ref.current.getElementsByClassName("a11y_alert")[0] as HTMLDivElement;
	} else {
		alertDiv = document.createElement("div"); // Dummy alert div
	}

	if (autoDescriptions) {
		apiKey = autoDescriptions.apiKey;
		model = autoDescriptions.model;
		temperature = autoDescriptions.temperature;
	}

	if (insights == undefined || !(insights in data[0])) {
		insights = "";
	}

	// Generate a unique identifier for this component
	const componentId = newId();

	const storedLongerKey = `oldLonger_${componentId}`;
	const storedSmallerKey = `oldSmaller_${componentId}`;

	const handleFocus = (alertDiv: HTMLDivElement | null) => {
		//css
		ref.current!.classList.add("focused");
		let toolTutorial = localStorage.getItem("toolTutorial");
		if (toolTutorial === "true") {
			if (alertDiv) {
				alertDiv.textContent =
					"You just entered an AutoVizually chart." +
					" For information on how to interact with it, press the question mark key" +
					" to open the shortcut guide";
			}
			setTimeout(function () {
				if (alertDiv) {
					alertDiv.textContent = "\u00A0";
				}
			}, 1000);
			localStorage.setItem("toolTutorial", "false");
			toolTutorial = "false";
		}
	};

	const handleBlur = () => {
		ref.current!.classList.remove("focused");
	};

	// Function to add an object to the array
	const nextSeries = () => {
		let currentPos = series.indexOf(selectedSeries);
		let nextPos = (currentPos + 1) % series.length;
		setSelectedSeries(series[nextPos]);
	};

	useEffect(() => {
		// Retrieve the value of toolTutorial to check if it has been shown before
		toolTutorial = localStorage.getItem("toolTutorial");

		//If it does not exist, set it to true to show it the first time
		if (!toolTutorial) {
			localStorage.setItem("toolTutorial", "true");
			toolTutorial = "true";
		}

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
	}, []);

	//creates a singular ShortcutGuide
	function createShortcutGuide() {
		let checker = document.getElementById("a11y_nav_guide");
		if (checker === null) {
			const nav = (
				<div onKeyDown={handleNav} id="a11y_nav_guide">
					<ShortcutGuide />
				</div>
			);
			const container = document.createElement("div");
			const root = document.getElementById("root");
			const reactRoot = ReactDOM.createRoot(container);
			reactRoot.render(<React.StrictMode>{nav}</React.StrictMode>);

			if (root) {
				const next = root.firstChild?.nextSibling;

				if (next) {
					root.insertBefore(container, next);
				} else {
					root.appendChild(container);
				}
			}
		}
	}

	useEffect(() => {
		let descsAux;
		//needs a slight delay since some elements take time to load
		setTimeout(() => {
			//converts the data into a dictionary
			arrayConverter(data, insights).then(function (result) {
				//result = [2,3,5] or []
				let insightsArrayAux = [];
				let averageAux = 0;
				setArrayConverted(result);
				if (insights !== "") {
					insightsArrayAux = insightsCalculator(result);
					setInsightsArray(insightsArrayAux);

					averageAux = insightsArrayAux[1];
				}

				addAriaLabels({ ref, descriptor, selectorType, data, multiSeries });

				if (storedLonger !== null && storedSmaller !== null) {
					descsAux = [storedLonger, storedSmaller];
					setDescs([storedLonger, storedSmaller]);
					descriptionsChanger({ ref, type, descs: descsAux, title, autoDescriptions });
				} else {
					generateDescriptions({
						title,
						data,
						average: averageAux,
						context,
						apiKey,
						model,
						temperature,
					}).then(function (result) {
						descsAux = result; // Output: [longerDescValue, smallerDescValue]
						setDescs(result); // Output: [longerDescValue, smallerDescValue]
						descriptionsChanger({ ref, type, descs: descsAux, title, autoDescriptions });

						if (autoDescriptions && autoDescriptions.dynamicDescriptions === false) {
							localStorage.setItem(storedLongerKey, descsAux[0]);
							localStorage.setItem(storedSmallerKey, descsAux[1]);
						}
					});
				}
			});

			//wipes the old tabindex present in the child components
			switchToChartLevel(ref, true);
		}, 500);

		//creates the ShortcutGuide
		createShortcutGuide();
	}, [ref]);

	// sets the appropriate navigation keys in the ShortcutGuide
	function handleNav(event: React.KeyboardEvent<HTMLDivElement>) {
		navigationKeyHandler({
			type,
			event,
			number,
			ref,
			elements,
			alertDiv,
			selectedSeries,
			series,
			selectorType,
			multiSeries,
			nextSeries,
		});
	}

	//sets the appropriate navigation keys and shortcuts in the charts and data
	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>, alertDiv: HTMLDivElement) {
		let numberAux = navigationKeyHandler({
			type,
			event,
			number,
			ref,
			elements,
			alertDiv,
			selectedSeries,
			series,
			selectorType,
			multiSeries,
			nextSeries,
		});
		setNumber(numberAux);
		insightsKeyHandler({
			type,
			event,
			elements,
			alertDiv,
			ref,
			insights,
			insightsArray,
			arrayConverted,
			title,
			descs,
			autoDescriptions,
		});
	}

	// features exclusive to bar charts (might be able to turn this more modular)
	if (!selectorType) {
		console.log("Type of chart not supported or no type given");
	}
	return (
		<div
			ref={ref}
			onKeyDown={(event) => {
				const alertDiv = ref.current?.getElementsByClassName("a11y_alert")[0] as HTMLDivElement;
				handleKeyDown(event, alertDiv);
			}}
			className="a11y_chart"
			data-testid="a11y_chart"
			role="form"
		>
			<p
				style={{ textIndent: "-10000px" }}
				className="a11y_desc visually-hidden"
				data-testid="a11y_desc"
				onFocus={() => {
					handleFocus(alertDiv);
				}}
				onBlur={handleBlur}
			>
				Generating description...
			</p>
			<div id="a11y_number" aria-hidden="true"></div>
			<div className="a11y_alert visually-hidden" role="alert" aria-live="assertive">
				{"\u00A0"}
			</div>
			{chart}
		</div>
	);
};

export default AutoVizuA11y;
