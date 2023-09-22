# AutoVizuA11y

## Description

AutoVizuA11y is a React library that automates the process of creating accessible data visualizations. It focuses on features that improve the exploration of charts with screen readers, without requiring extensive accessibility knowledge from developers.

This tool focuses on three different key components that were identified after consulting with several screen reader users: chart navigability; shortcuts that allow one to navigate the charts and get insights more quickly; and insightful chart descriptions.

## Install AutoVizuA11y

#### Via npm

```
npm i @feedzai/autovizua11y
```

#### Via Github

Clone the repository into a local directory using:

```
git clone https://github.com/feedzai/autovizua11y.git
cd autovizua11y
```

## AutoVizuA11y for Developers

#### Inputs

- A set of props, passed in the AutoVizuA11y component, with information regarding the data visualization wrapped.
- The chart that will receive AutoVizuA11y's accessibility features.

#### Outputs

- **Navigation**
  - Between data visualizations wrapped by AutoVizuA11y present on the same page;
  - Between those same data visualizations and underlying data elements;
  - Between the underlying data elements.
- **Descriptions**
  - Labels for every data element;
  - Two descriptions for every data visualization wrapped by AutoVizuA11y. Both are composed of a title, information on the visualization type, and a human-like description generated using the `gpt-3.5-turbo` model from OpenAI. They can be made longer or shorter, depending on the user's requirements. The shorter description is announced by default once the data visualization gets focused. The descriptions can also be inputted manually.
- **Shortcuts**
  - That improves navigation by increasing speed and efficiency in the exploration of a chart;
  - That provides statistical insights about the data.

## AutoVizuA11y properties

| Property             | Required/Optional   | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`               | Required            | object  | For single series data visualizations, it accepts the visualization's data as an object. It is this data that is added as labels to each data element. In the case of multi-series data visualization, each key should be the series' identifier, while each value is another object with the visualization data. This is the object that is used in the calculation of the statistical insights.                           |
| `selectorType`       | Required            | object  | It expects either the HTML type (for example "rect", "circle", or "path") of the data elements or their class name — only one can be chosen. This way, the data elements should be navigable and have an aria-label. AutoVizuA11y assumes that the number of data elements with the specified class or type matches the number of elements passed through the data prop (ensuring that no element is left without a label). |
| `type`               | Required            | string  | Accepts a `string` that specifies the type of data visualization. It gets announced once a data visualization gets focused, after the title and before the descriptions.                                                                                                                                                                                                                                                    |
| `title`              | Required            | string  | Expect a `string` containing the title of the visualization, which should be short and concise, showcasing the purpose of the content inside the data visualization. It gets announced once a data visualization gets focused, before the type and the longer or shorter descriptions.                                                                                                                                      |
| `context`            | Required            | string  | Requires a `string` that provides the context in which the data visualization is present. This way, when generating the descriptions, better results are achieved.                                                                                                                                                                                                                                                          |
| `descriptor`         | Optional            | string  | By receiving a `string`, this descriptor helps better contextualize what data elements are. It gets added at the end of each data element. If no descriptor is provided, blank text (””) is set instead.                                                                                                                                                                                                                    |
| `insights`           | Optional            | boolean | Setting "insights" to `false` discards the calculations and insights given by AutoVizuA11y. The user gets alerted ”That shortcut does not work in this chart” in the case of insights being turned off. This is applicable for the shortcuts regarding the minimum, average, and maximum values as well as the other with comparisons to insights and other data points.                                                    |
| `multiSeries`        | Optional            | boolean | When dealing with multi-series data this should be set to `true`. This enables the user from navigating between each series on top of the normal navigation.                                                                                                                                                                                                                                                                |
| `autoDescriptions`   | Required (option A) | object  | Accepts an object with various options regarding the creation of automatic descriptions with OpenAI models. AutoVizuA11y does two API calls per wrapped visualization, one for each type of description (longer and shorter). The options for this prop can be checked [here](#autoDescriptions-prop-options). This prop cannot be used at the same time as "manualDescriptions".                                           |
| `manualDescriptions` | Required (option B) | object  | Accepts an object with two descriptions. By providing this prop, no automatic descriptions are generated, thus not having any costs associated. The options for this prop can be checked [here](#manualdescriptions-prop-options). This prop cannot be used at the same time as "autoDescriptions".                                                                                                                         |

### `autoDescriptions` prop options

| Keys                  | Required/Optional | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------- | ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dynamicDescriptions` | Optional          | boolean | Setting this to `false` stops the component from generating the two descriptions for that chart after the first render (the descriptions get saved in localstorage). This should be useful for static visualizations.                                                                                                                                                                                                                     |
| `apiKey`              | Required          | string  | Accepts a `string` containing the OpenAI API key so that human-like descriptions of the data visualization can be automatically generated. [You can get yours here](https://platform.openai.com/account/api-keys), It is recommended for the developer to take the necessary precautions in order to hide the API key.                                                                                                                    |
| `model`               | Optional          | string  | Accepts a `string` containing the OpenAI model responsible for generating both descriptions. [You can check the models available here](https://platform.openai.com/docs/models). If no model is provided, `gpt-3.5-turbo` will be chosen by `default`.                                                                                                                                                                                    |
| `temperature`         | Optional          | number  | Accepts a `number`, from `0` to `1` representing the temperature used in the model responsible for generating both descriptions. Descriptions with temperatures closer to 0 should be more deterministic between API calls while being closer to 1 should be more random between API calls. [You can check the models available here](https://platform.openai.com/docs/models). If no model is provided, `0` will be chosen by `default`. |

### `manualDescriptions` prop options

| Keys      | Required/Optional | Type   | Description                                                                                     |
| --------- | ----------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `longer`  | Required          | string | Accepts a `string` with the longer description associated with the wrapped data visualization.  |
| `shorter` | Required          | string | Accepts a `string` with the shorter description associated with the wrapped data visualization. |

## Sample Implementation

```javascript
import { AutoVizuA11y } from "autovizua11y";

// ...

const barData = {
    "Monday": 8,
    "Tuesday": 6.5,
    "Wednesday": 7,
    "Thursday": 9,
    "Friday": 11,
    "Saturday": 2,
    "Sunday": 4
}

const multiLineData = {
  "Croatia": {2010: 4.37, 2015: 4.25, 2020: 4.1, 2022: 4.03},
  "Latvia": {2010: 2.1, 2015: 1.99, 2020: 1.9, 2022: 1.85},
  "Lithuania": {2010: 3.14, 2015: 2.96, 2020: 2.82, 2022: 2.75}
}

const longerDesc = "..."
const shorterDesc = "..."

// ...

function App() {

  return (

  // SingleSeries with automatic descriptions

    <AutoVizuA11y
      data = { barData }
      selectorType = {{ element: "rect" }}
      type = "bar chart"
      title = "Number of hours spent looking at a screen per day of the week."
      context = "Screen time dashboard"
      descriptor = "hours"
      autoDescriptions={{
          dynamicDescriptions: false,
          apiKey: API_KEY,
          model: "gpt-3.5-turbo",
          temperature: 0.1,
        }}
    >
      <BarChart></BarChart>
    </AutoVizuA11y>


// MultiSeries with manual descriptions

    <AutoVizuA11y
        data= { multiLineData }
        multiSeries = { true }
        selectorType = {{ element: "circle" }}
        type = "Multi line chart"
        title = "Latvia, Lithuania, and Croatia are among the countries where population is decreasing"
        context = {
          "Countries in Europe are seeing some of the sharpest population decreases. "
        }
        manualDescriptions = {{
          longer: longerDesc,
          shorter: shorterDesc,
        }}
      >
  );
}
```

## AutoVizuA11y for screen reader users

All the following shortcuts only work once focused on a data visualization (or adjacent data elements) covered by AutoVizuA11y.

Besides the navigation between data visualizations, every other shortcut outcome (namely the statistical insights) only regards each individual visualization.

The tool was tested with VoiceOver, JAWS and NVDA, as well as the most commonly used browsers. The key combinations for each shortcut were chosen with the intention to avoid collisions with others from the tested screen readers and browsers. That said, **it is suggested for users of JAWS and NVDA turn on "Focus mode" (<kbd>Insert</kbd> + <kbd>Space</kbd>) so that the navigation with arrow keys can be done between and inside the visualizations**.

## Examples

You can check a series of examples built using AutoVizuA11y [here](https://diogorduarte.github.io/autovizua11y-examples/) (it requires an OpenAI API key).

## Shortcut Guide

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

Other licensing options may be available, please reach out to [data-viz@feedzai.com](mailto:data-viz@feedzai.com) for more information.
