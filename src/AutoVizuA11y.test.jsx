/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";
import { render, fireEvent, screen, waitFor, unmount } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional assertion methods

import AutoVizuA11y from "./AutoVizuA11y";
import MultiLineChart from "../test_utils/multiLineChart";
import { mockChartData } from "../test_utils/mockChartData";
import { mockAutoVizData } from "../test_utils/mockAutoVizData";

let component;
afterEach(() => component.unmount());

// Check aria-label
test("Check aria-label is added to selectors", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			insights=""
			manualDescriptions={{
				longer: "x",
				shorter: "y",
			}}
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);

	const rectElements = await screen.findAllByTestId("data-points");

	await waitFor(() => {
		rectElements.forEach((rect, i) => {
			expect(rect).toHaveAttribute("aria-label", Object.values(mockAutoVizData[i]).join(", "));
		});
	}, 2000);
});

// Check aria-roledescription
test("Check aria-roledescription is added to selectors", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			manualDescriptions={{
				longer: "x",
				shorter: "y",
			}}
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);

	const rectElements = await screen.findAllByTestId("data-points");

	await waitFor(() => {
		rectElements.forEach((rect, i) => {
			expect(rect).toHaveAttribute("aria-roledescription", "rect");
		});
	});
});

///// Average, Min, Max
test("Check average, minimum, and maximum", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			manualDescriptions={{
				longer: "x",
				shorter: "y",
			}}
			insights="Value"
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);

	const autoviz = screen.getByTestId("a11y_chart");
	const ariaLiveRegion = screen.getByRole("alert");
	const rectElements = await screen.findAllByTestId("data-points");
	await waitFor(() => {
		rectElements.forEach((rect, i) => {
			expect(rect).toHaveAttribute("aria-roledescription", "rect");
		});
	});
	fireEvent.keyDown(autoviz, { code: "KeyK", altKey: true });
	expect(ariaLiveRegion.textContent).toBe("The average is 456.99");
	fireEvent.keyDown(autoviz, { code: "KeyL", altKey: true });
	expect(ariaLiveRegion.textContent).toBe("The maximum is 1425.89");
	fireEvent.keyDown(autoviz, { code: "KeyJ", altKey: true });
	expect(ariaLiveRegion.textContent).toBe("The minimum is 127.5");
});

// Check shortcuts

///// Does not work in chart (insights === false)
test("Check insights are not calculated when key is false", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			manualDescriptions={{
				longer: "x",
				shorter: "y",
			}}
			insights=""
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);
	const autoviz = screen.getByTestId("a11y_chart");
	const ariaLiveRegion = screen.getByRole("alert");
	expect(ariaLiveRegion.textContent).toBe("\u00A0");

	fireEvent.keyDown(autoviz, { code: "KeyK", altKey: true });
	expect(ariaLiveRegion.textContent).toBe("That shortcut does not work in this chart");
});

test("Check a11y_chart class changes to focused when the paragraph is focused", () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="circles"
			manualDescriptions={{
				longer: "",
				shorter: "",
			}}
		>
			{/* <MultiLineChart data={mockChartData}></MultiLineChart> */}
		</AutoVizuA11y>,
	);
	const autoviz = screen.getByTestId("a11y_chart");
	const paragraph = screen.getByTestId("a11y_desc");
	fireEvent.focus(paragraph);
	expect(autoviz.className).toContain("focused");
});

test("Check error is thrown when user clicks arrow up more than once in a11y_chart", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="circles"
			manualDescriptions={{
				longer: "",
				shorter: "",
			}}
		>
			<MultiLineChart data={mockChartData}></MultiLineChart>
		</AutoVizuA11y>,
	);
	const autoviz = screen.getByTestId("a11y_chart");
	const ariaLiveRegion = screen.getByRole("alert");
	expect(ariaLiveRegion.textContent).toBe("\u00A0");

	fireEvent.keyDown(autoviz, { key: "ArrowDown", code: "ArrowDown" });
	fireEvent.keyDown(autoviz, { key: "ArrowUp", code: "ArrowUp" });
	fireEvent.keyDown(autoviz, { key: "ArrowUp", code: "ArrowUp" });
	expect(ariaLiveRegion.textContent).toBe("You are already at the chart level");
});

test("Check error is thrown when user clicks arrow down more than once inside a11y_chart", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="circles"
			manualDescriptions={{
				longer: "",
				shorter: "",
			}}
		>
			<MultiLineChart data={mockChartData}></MultiLineChart>
		</AutoVizuA11y>,
	);
	const autoviz = screen.getByTestId("a11y_chart");
	const ariaLiveRegion = screen.getByRole("alert");
	expect(ariaLiveRegion.textContent).toBe("\u00A0");

	fireEvent.keyDown(autoviz, { key: "ArrowDown", code: "ArrowDown" });
	fireEvent.keyDown(autoviz, { key: "ArrowDown", code: "ArrowDown" });
	expect(ariaLiveRegion.textContent).toBe("You are already at the data level");
});

test("Check moving from right to left", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="circles"
			manualDescriptions={{
				longer: "",
				shorter: "",
			}}
		>
			<MultiLineChart data={mockChartData}></MultiLineChart>
		</AutoVizuA11y>,
	);
	const autoviz = screen.getByTestId("a11y_chart");
	const ariaLiveRegion = screen.getByRole("alert");
	expect(ariaLiveRegion.textContent).toBe("\u00A0");

	fireEvent.keyDown(autoviz, { key: "ArrowDown", code: "ArrowDown" });
	fireEvent.keyDown(autoviz, { key: "ArrowLeft", code: "ArrowLeft" });
	expect(ariaLiveRegion.textContent).toBe("You are already at the data level");
});

test("Check tabindex is added to selectors", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			manualDescriptions={{
				longer: "",
				shorter: "",
			}}
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);
	const autoviz = screen.getByTestId("a11y_chart");
	fireEvent.keyDown(autoviz, { key: "ArrowUp", code: "ArrowUp" });
	fireEvent.keyDown(autoviz, { key: "ArrowDown", code: "ArrowDown" });

	await waitFor(() => {
		const rectElements = screen.queryAllByTestId("data-points");
		rectElements.forEach((rect) => {
			// console.log(rect);
			expect(rect).toHaveAttribute("tabindex", "0");
		});
	}, 2000);
});

/////shortcut failing because user is not inside chart
test("Check alert warning because user is asking for statistics only available inside the chart", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			manualDescriptions={{
				longer: "x",
				shorter: "y",
			}}
			insights="Value"
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);

	const autoviz = screen.getByTestId("a11y_chart");
	const ariaLiveRegion = screen.getByRole("alert");

	const rectElements = await screen.findAllByTestId("data-points");
	await waitFor(() => {
		rectElements.forEach((rect, i) => {
			expect(rect).toHaveAttribute("aria-roledescription", "rect");
		});
	}, 2000);

	fireEvent.keyDown(autoviz, {
		key: "‚",
		keyCode: 75,
		which: 75,
		code: "KeyK",
		location: 0,
		altKey: true,
		shiftKey: true,
	});
	await expect(ariaLiveRegion.textContent).toBe("This shortcut only works inside a chart");
});

// data point to chart comparisons
test("Check data point comparisons with cross chart statistics", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			manualDescriptions={{
				longer: "x",
				shorter: "y",
			}}
			insights="Value"
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);

	const autoviz = screen.getByTestId("a11y_chart");
	const ariaLiveRegion = screen.getByRole("alert");

	const rectElements = await screen.findAllByTestId("data-points");
	await waitFor(() => {
		rectElements.forEach((rect, i) => {
			expect(rect).toHaveAttribute("aria-roledescription", "rect");
		});
	});
	fireEvent.keyDown(autoviz, { key: "ArrowUp", code: "ArrowUp" });
	fireEvent.keyDown(autoviz, { key: "ArrowDown", code: "ArrowDown" });
	const secondrect = screen.getByText("1");
	secondrect.focus();

	fireEvent.keyDown(secondrect, {
		key: "‚",
		keyCode: 75,
		which: 75,
		code: "KeyK",
		location: 0,
		altKey: true,
		shiftKey: true,
	});
	await expect(ariaLiveRegion.textContent).toBe("The value is 312.28 bellow the average");
	fireEvent.keyDown(secondrect, {
		key: "‚",
		keyCode: 75,
		which: 75,
		code: "KeyL",
		location: 0,
		altKey: true,
		shiftKey: true,
	});
	await expect(ariaLiveRegion.textContent).toBe("The value is 1281.18 bellow the maximum value");
	fireEvent.keyDown(secondrect, {
		key: "‚",
		keyCode: 75,
		which: 75,
		code: "KeyJ",
		location: 0,
		altKey: true,
		shiftKey: true,
	});
	await expect(ariaLiveRegion.textContent).toBe("The value is 17.21 above the minimum value");
});

// JumpX points prompt
test("Check prompt is opened", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			manualDescriptions={{
				longer: "x",
				shorter: "y",
			}}
			insights="Value"
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);

	const autoviz = screen.getByTestId("a11y_chart");
	const ariaLiveRegion = screen.getByRole("alert");

	fireEvent.keyDown(autoviz, {
		key: "‚",
		keyCode: 75,
		which: 75,
		code: "KeyX",
		location: 0,
		altKey: true,
	});

	await expect(ariaLiveRegion.textContent).toBe("Invalid input. Please enter a number.");
});

// Beginning and end check
test("Check return beginning and end", async () => {
	component = render(
		<AutoVizuA11y
			data={mockAutoVizData}
			selectorType={{ element: "rect" }}
			type="line chart"
			title="Descriptive title"
			context="Descriptive context"
			descriptor="rect"
			manualDescriptions={{
				longer: "x",
				shorter: "y",
			}}
			insights="Value"
		>
			<MultiLineChart></MultiLineChart>
		</AutoVizuA11y>,
	);

	const autoviz = screen.getByTestId("a11y_chart");
	const rectElements = await screen.findAllByTestId("data-points");

	fireEvent.keyDown(autoviz, { key: "ArrowUp", code: "ArrowUp" });
	fireEvent.keyDown(autoviz, { key: "ArrowDown", code: "ArrowDown" });

	fireEvent.keyDown(autoviz, {
		code: "KeyQ",
		altKey: true,
	});
	await expect(rectElements[0]).toHaveFocus();

	fireEvent.keyDown(autoviz, {
		code: "KeyW",
		altKey: true,
	});
	await expect(rectElements[9]).toHaveFocus();
});
// Check multiseries navigation
// const paragraph = screen.getByTestId("a11y_desc");
// fireEvent.focus(paragraph);
// fireEvent.keyDown(paragraph, { key: "ArrowDown", code: "ArrowDown" });
// fireEvent.keyDown(paragraph, { code: "KeyK", altKey: true, shiftKey: true });
// console.log(document.activeElement);
