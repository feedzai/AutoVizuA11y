# AutoVizuA11y

<img src="./src/assets/images/banner.png">

## Description

AutoVizuA11y is a React library that automates the process of creating accessible data visualizations for screen reader users. It focuses on features that improve the exploration of charts with a keyboard, without requiring extensive accessibility knowledge from developers.

This tool focuses on three different key components that were identified after consulting with several screen reader users: chart navigability; insightful chart descriptions; and shortcuts that allow one to navigate the charts and get insights more quickly.

## Install AutoVizuA11y

### Via npm

```
npm i @feedzai/autovizua11y
```

### Via Github

Clone the repository into a local directory using:

```
git clone https://github.com/feedzai/autovizua11y.git
cd autovizua11y
```

## AutoVizuA11y for Developers

### Inputs

- A set of props, passed in the AutoVizuA11y component, with information regarding the data visualization wrapped.
- The chart that will receive AutoVizuA11y's accessibility features.

### Outputs

- **Descriptions**
  - Labels for every data element;
  - Two descriptions, a longer and a shorter, for every data visualization wrapped by AutoVizuA11y. Both are composed of a title, the visualization type, whether the description was automatically generated, and a human-like summary generated using the `gpt-3.5-turbo` model from OpenAI. The shorter description is announced by default once the data visualization gets focused. The descriptions can also be manually written.
- **Navigation**
  - "Horizontally", between different data visualizations and between data elements;
  - "Vertically", between data visualizations and their underlying data elements;
  - Between different data series (in case more than one exist).
- **Shortcuts**
  - QOL navigation shortcuts that increase speed and efficiency in the exploration of a chart;
  - Shortcuts that offer statistical insights about the data on demand;
  - A Shortcut Guide that can be consulted while focusing an AutoVizuA11y chart.

## AutoVizuA11y component properties

| Property                                       | Required/Optional   | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------- | ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data`                                         | Required            | array of objects | The data present in the chart. The values of each pair are added, in order, to a string and read when the corresponding DOM element is focused. **Note: the number of objects need to match the total data points represented in the DOM.**                                                                                                                                                                                                                                                                                                                                                                              |
| `selectorType`                                 | Required            | object           | The HTML type (for example "rect", "circle", or "path") of the data elements **or** their class name — only one can be chosen. This enables the data elements to be navigable and have an aria-label. **AutoVizuA11y assumes that the number of data elements with the specified class or type matches the number of elements passed through the data prop** (ensuring that no element is left without a label).                                                                                                                                                                                                         |
| `type`                                         | Required            | string           | The type of data visualization. It is announced once a data visualization gets focused, after the title and before the descriptions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `title`                                        | Required            | string           | The title of the visualization, which should be short and concise, showcasing the purpose of the content inside the data visualization. It is announced once a data visualization gets focused, before the type and the longer or shorter descriptions.                                                                                                                                                                                                                                                                                                                                                                  |
| `insights`                                     | Required            | string           | Expects a `string` that corresponds to the key in the data object from which values will be used to derive statistical insights. For example, If the insights should be derived from the `amount` in the data, then that's what should be passed in this property. If an empty string `""` is passed, the user will receive an alert stating 'This shortcut does not work in this chart.' This applies to shortcuts related to minimum, average, and maximum values, as well as those involving comparisons to these insights and other data points. **Note: the values used for insights need to be of type `Number`.** |
| `context`                                      | Required            | string           | The context in which the data visualization is present. It is passed in the prompt, when generating automatic the descriptions, resulting in contextualized outputs.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `descriptor`                                   | Optional            | string           | By receiving a `string`, this descriptor helps better contextualize what data elements are. It is added at the end of each data element. If no descriptor is provided, blank text (””) is set instead.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `multiSeries`                                  | Optional            | string           | When working with multi-series data, provide a `string` that corresponds to the key in the data object that defines each series, allowing users to navigate between different series/clusters in addition to regular navigation. If an empty string `""` is passed, the tool interprets the data as single series.                                                                                                                                                                                                                                                                                                       |
| `shortcutGuide` <a id="shortcutGuideProp"></a> | Optional            | JSX.Element      | AutoVizuA11y has its default `NativeShortcutGuide` but you may create your own. The ShortcutGuide is wrapped in a `<dialog>`, and its reference can be obtained trought the property `dialogRef`, which you can add to your `shortcutGuide`. The `dialogRef` is a `RefObject<HTMLDialogElement>`, which you can use to create, for example, a button that handles the logic of closing this dialog.                                                                                                                                                                                                                      |
| `autoDescriptions`                             | Required (option A) | object           | Various options regarding the creation of automatic descriptions with OpenAI models. AutoVizuA11y does two API calls per wrapped visualization, one for each type of description (longer and shorter). The options for this prop can be checked [here](#autoDescriptions-prop-options). This prop cannot be used at the same time as "manualDescriptions".                                                                                                                                                                                                                                                               |
| `manualDescriptions`                           | Required (option B) | object           | Two manually written descriptions of the data. By providing this prop, no automatic descriptions are generated, thus not having any costs associated. The options for this prop can be checked [here](#manualdescriptions-prop-options). This prop cannot be used at the same time as "autoDescriptions".                                                                                                                                                                                                                                                                                                                |

### `autoDescriptions` prop options

| Keys                  | Required/Optional | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------- | ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dynamicDescriptions` | Optional          | boolean | Setting this to `false` stops the component from generating the two descriptions for that chart after the first render (the descriptions get saved in localstorage). This should be useful for static visualizations.                                                                                                                                                                                          |
| `apiKey`              | Required          | string  | The OpenAI API key, enabling an LLM to generate human-like descriptions of the data visualization. [You can get yours here](https://platform.openai.com/account/api-keys), It is recommended for the developer to take the necessary precautions in order to hide the API key.                                                                                                                                 |
| `model`               | Optional          | string  | The OpenAI LLM responsible for generating both descriptions. [You can check the models available here](https://platform.openai.com/docs/models). If no model is provided, `gpt-3.5-turbo` will be chosen by `default`.                                                                                                                                                                                         |
| `temperature`         | Optional          | number  | A temperature, from `0` to `1`, used in the model responsible for generating both descriptions. Descriptions with temperatures closer to 0 should be more deterministic between API calls while those being closer to 1 should be more random between API calls. [You can check the models available here](https://platform.openai.com/docs/models). If no model is provided, `0` will be chosen by `default`. |

### `manualDescriptions` prop options

| Keys      | Required/Optional | Type   | Description                                                             |
| --------- | ----------------- | ------ | ----------------------------------------------------------------------- |
| `longer`  | Required          | string | The longer description associated with the wrapped data visualization.  |
| `shorter` | Required          | string | The shorter description associated with the wrapped data visualization. |

## Sample Implementation

```javascript
import { AutoVizuA11y } from "@feedzai/autovizua11y";

// ...

const barData = [
	{ day: "Monday", value: 8 },
	{ day: "Tuesday", value: 6.5 },
	{ day: "Wednesday", value: 7 },
	{ day: "Thursday", value: 9 },
	{ day: "Friday", value: 11 },
	{ day: "Saturday", value: 2 },
	{ day: "Sunday", value: 3 },
];

const multiLineData = [
	{ series: "Croatia", x: 2010, y: 4.37 },
	{ series: "Croatia", x: 2015, y: 4.25 },
	{ series: "Croatia", x: 2020, y: 4.13 },
	{ series: "Croatia", x: 2022, y: 4.03 },
	{ series: "Latvia", x: 2010, y: 4.25 },
	{ series: "Latvia", x: 2015, y: 4.25 },
	{ series: "Latvia", x: 2020, y: 4.25 },
	{ series: "Latvia", x: 2022, y: 4.25 },
	{ series: "Lithuania", x: 2010, y: 4.25 },
	{ series: "Lithuania", x: 2015, y: 4.25 },
	{ series: "Lithuania", x: 2020, y: 4.25 },
	{ series: "Lithuania", x: 2022, y: 4.25 },
];

const longerDesc = "...";
const shorterDesc = "...";

// ...

function App() {
	return (
		<>
			{/* SingleSeries with automatic descriptions */}
			<AutoVizuA11y
				data={barData}
				selectorType={{ element: "rect" }}
				type="bar chart"
				title="Number of hours spent looking at a screen per day of the week."
				context="Screen time dashboard"
				insights="value"
				descriptor="hours"
				autoDescriptions={{
					dynamicDescriptions: false,
					apiKey: API_KEY,
					model: "gpt-3.5-turbo",
					temperature: 0.1,
				}}
			>
				<BarChart></BarChart>
			</AutoVizuA11y>

			{/* MultiSeries with manual descriptions */}
			<AutoVizuA11y
				data={multiLineData}
				selectorType={{ element: "circle" }}
				type="Multi line chart"
				title="Latvia, Lithuania, and Croatia are among the countries where population is decreasing"
				context="Interface with World data"
				insights="y"
				descriptor="millions"
				multiSeries="series"
				manualDescriptions={{
					longer: longerDesc,
					shorter: shorterDesc,
				}}
			>
				<LineChart></LineChart>
			</AutoVizuA11y>
		</>
	);
}
```

## AutoVizuA11y for screen reader users

All the following shortcuts only work once focused on a data visualization (or adjacent data elements) covered by AutoVizuA11y.

Besides the navigation between data visualizations, every other shortcut outcome (namely the statistical insights) only regards each individual visualization.

The tool was tested with VoiceOver, JAWS and NVDA, as well as the most commonly used browsers. The key combinations for each shortcut were chosen with the intention to avoid collisions with others from the tested screen readers and browsers. That said, **it is suggested for users of JAWS and NVDA turn on "Focus mode" (<kbd>Insert</kbd> + <kbd>Space</kbd>) so that the navigation with arrow keys can be done between and inside the visualizations**.

## Examples

You can check a series of examples built using AutoVizuA11y [here](https://feedzai.github.io/AutoVizuA11y/) (some features require an OpenAI API key).

## Tests

All tests have been written using cypress.

To run tests locally:

```
# root
npm install
npm run build

# /examples
npm install
npm run dev

# root
npx cypress open
```

## Shortcut Guide

The Shortcut Guide can be acessed by the user, using the <kbd>?</kbd> key, while having keyboard focus either on an AutoVizuA11y chart or an underlying data element. As a developer, you may override this component with [your own](#shortcutGuideProp) or change its [styling](#shortcutGuideStyle).

### Shortcut keys

|                                         Activation Key(s) | Description                                                   |
| --------------------------------------------------------: | ------------------------------------------------------------- |
|                                              <kbd>?</kbd> | Enter shortcut guide                                          |
|                            <kbd>?</kbd> or <kbd>Esc</kbd> | Leave shortcut guide                                          |
|                                              <kbd>↓</kbd> | Get into a chart                                              |
|                                              <kbd>↑</kbd> | Get out of a chart                                            |
|                                              <kbd>→</kbd> | Move forward in a page element                                |
|                                              <kbd>←</kbd> | Move backward in a page element                               |
|                    <kbd>Alt (option)</kbd> + <kbd>M</kbd> | Move between series of data inside the chart                  |
| <kbd>Home</kbd> or <kbd>Alt (option)</kbd> + <kbd>Q</kbd> | Jump to the beginning of a chart                              |
|  <kbd>End</kbd> or <kbd>Alt (option)</kbd> + <kbd>W</kbd> | Jump to the end of a chart                                    |
|                    <kbd>Alt (option)</kbd> + <kbd>X</kbd> | Define the number of data points to be jumped at a time       |
|                                              <kbd>+</kbd> | Add one number to the data points to be jumped at a time      |
|                                              <kbd>-</kbd> | Subtract one number to the data points to be jumped at a time |
|                    <kbd>Alt (option)</kbd> + <kbd>J</kbd> | Minimum value                                                 |
|                    <kbd>Alt (option)</kbd> + <kbd>K</kbd> | Average value                                                 |
|                    <kbd>Alt (option)</kbd> + <kbd>L</kbd> | Maximum value                                                 |
| <kbd>Alt (option)</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd> | Compare current point to minimum value of the visualization   |
| <kbd>Alt (option)</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd> | Compare current point to average value of the visualization   |
| <kbd>Alt (option)</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Compare current point to maximum value of the visualization   |
|                    <kbd>Alt (option)</kbd> + <kbd>Z</kbd> | How a point compares to the rest of the chart                 |
|                    <kbd>Alt (option)</kbd> + <kbd>B</kbd> | Set longer description of the chart                           |
|                    <kbd>Alt (option)</kbd> + <kbd>S</kbd> | Set shorter description of the chart (default)                |

### Visual customization <a id="shortcutGuideStyle"></a>

The Shortcut Guide is the only aspect of AutoVizuA11y that is also visual. You may change the styling of the default guide. Below are the classNames of the elements that make up this component:

<img src="./src/assets/images/shortcut_guide_class_anatomy.png">

| className                           | HTML   |
| ----------------------------------- | ------ |
| shortcut-guide                      | form   |
| shortcut-guide\_\_container         | div    |
| shortcut-guide\_\_header            | div    |
| shortcut-guide\_\_title             | h2     |
| shortcut-guide\_\_button-label      | p      |
| shortcut-guide\_\_button            | button |
| shortcut-guide\_\_break             | hr     |
| shortcut-guide\_\_body              | div    |
| shortcut-guide\_\_section           | div    |
| shortcut-guide\_\_list--title       | h3     |
| shortcut-guide\_\_list              | div    |
| shortcut-guide\_\_row               | dl     |
| shortcut-guide\_\_cell--shortcut    | dt     |
| shortcut-guide\_\_cell--explanation | dd     |

## Citing AutoVizuA11y

Below is the BibTeX entry for the EuroVis'24 full paper that explains the process of creating AutoVizuA11y.

```bib
@article{2024-AutoVizuA11y,
  title = {AutoVizuA11y: A Tool to Automate Screen Reader Accessibility in Charts},
  ISSN = {1467-8659},
  url = {http://dx.doi.org/10.1111/cgf.15099},
  DOI = {10.1111/cgf.15099},
  journal = {Computer Graphics Forum},
  publisher = {Wiley},
  author = {Duarte, Diogo and Costa, Rita and Bizarro, Pedro and Duarte, Carlos},
  year = {2024},
  month = jun
}
```

---

Other licensing options may be available, please reach out to [data-viz@feedzai.com](mailto:data-viz@feedzai.com) for more information.
