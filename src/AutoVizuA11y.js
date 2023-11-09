/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { addsAriaLabels } from "./components/navigation/AriaLabels";
import { keyHandler } from "./components/shortcuts/KeyHandler";
import { arrayConverter } from "./utils/arrayConverter";
import newId from "./utils/newId";
import { levelChart, levelNav } from "./components/navigation/LevelNavigation";

import ShortcutGuide from "./ShortcutGuide";
import { generateDescriptions } from "./components/descriptions/DescriptionsGenerator";
import { insightsCalculator } from "./utils/insightsCalculator";
import { descriptionsChanger } from "./components/descriptions/Descriptions";

import "./style/AutoVizuA11y.css";

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
}) => {
	let chart = React.Children.map(children, (child) => <div>{child}</div>);
	const ref = useRef(null);

	//could be converted to prop
	let alertDiv;

	let storedLonger;
	let storedSmaller;

	let toolTutorial;

	let apiKey;
	let model;
	let temperature;

	const [series, setSeries] = useState([]);
	const [selectedSeries, setSelectedSeries] = useState([]);
	const [insightsArray, setInsightsArray] = useState([]);
	const [arrayConverted, setArrayConverted] = useState([]);
	const [number, setNumber] = useState(1);
	const [descs, setDescs] = useState([]);

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

	const handleFocus = () => {
		//css
		ref.current.classList.add("focused");
		toolTutorial = localStorage.getItem("toolTutorial");
		if (toolTutorial === "true") {
			alertDiv = ref.current.getElementsByClassName("a11y_alert")[0];
			alertDiv.textContent =
				"You just entered an AutoVizually chart." +
				" For information on how to interact with it, press the question mark key" +
				" to open the shortcut guide";
			setTimeout(function () {
				alertDiv.textContent = "\u00A0";
			}, 1000);
			localStorage.setItem("toolTutorial", "false");
			toolTutorial = "false";
		}
	};

	const handleBlur = () => {
		ref.current.classList.remove("focused");
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
			const uniqueValues = [...new Set(data.map((item) => item[multiSeries]))];
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
			ReactDOM.render(nav, container);
			if (document.getElementById("root")) {
				document
					.getElementById("root")
					.insertBefore(container, document.getElementById("root").firstChild.nextSibling);
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
				let insightsArrayAux;
				let averageAux;
				setArrayConverted(result);
				if (insights !== "") {
					insightsArrayAux = insightsCalculator(result);
					setInsightsArray(insightsArrayAux);

					averageAux = insightsArrayAux[1];
				}

				addsAriaLabels(ref, descriptor, selectorType, data, multiSeries);

				if (storedLonger !== null && storedSmaller !== null) {
					descsAux = [storedLonger, storedSmaller];
					setDescs([storedLonger, storedSmaller]);
					descriptionsChanger(ref, type, descsAux, title, autoDescriptions);
				} else {
					generateDescriptions(title, data, averageAux, context, apiKey, model, temperature).then(
						function (result) {
							descsAux = result; // Output: [longerDescValue, smallerDescValue]
							setDescs(result); // Output: [longerDescValue, smallerDescValue]
							descriptionsChanger(ref, type, descsAux, title, autoDescriptions);

							if (autoDescriptions && autoDescriptions.dynamicDescriptions === false) {
								localStorage.setItem(storedLongerKey, descsAux[0]);
								localStorage.setItem(storedSmallerKey, descsAux[1]);
							}
						},
					);
				}
			});

			//wipes the old tabindex present in the child components
			levelChart(ref, true);
		}, 500);

		//creates the ShortcutGuide
		createShortcutGuide();
	}, [ref]);

	//sets the appropriate navigation keys in the ShortcutGuide
	function handleNav(event) {
		levelNav(event, ref);
	}

	//sets the appropriate navigation keys and shortcuts in the charts and data
	function handleKeyDown(event) {
		alertDiv = ref.current.getElementsByClassName("a11y_alert")[0];
		levelNav(event, ref, alertDiv, selectorType, multiSeries, nextSeries, series, selectedSeries);
		let numberAux = keyHandler(
			type,
			event,
			number,
			ref,
			selectorType,
			insights,
			insightsArray,
			arrayConverted,
			title,
			descs,
			series,
			selectedSeries,
			autoDescriptions,
		);
		setNumber(numberAux);
	}

	// features exclusive to bar charts (might be able to turn this more modular)
	if (!selectorType) {
		console.log("Type of chart not supported or no type given");
	}
	return (
		<div
			ref={ref}
			onKeyDown={handleKeyDown}
			className="a11y_chart"
			data-testId="a11y_chart"
			role="form"
		>
			<p
				style={{ textIndent: "-10000px" }}
				className="a11y_desc visually-hidden"
				data-testId="a11y_desc"
				onFocus={handleFocus}
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
