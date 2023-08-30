/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional assertion methods

import AutoVizuA11y from "./AutoVizuA11y";
import MultiLineChart from "../../test_utils/multiLineChart";
import ShortcutGuide from "./ShortcutGuide";
import { mockChartData } from "../../test_utils/mockChartData";
import { mockAutoVizData } from "../../test_utils/mockAutoVizData";

test("Display style of the shortcut guide should change when keys are pressed", async () => {
	render(
		<>
			<AutoVizuA11y
				data={mockAutoVizData}
				selectorType={{ element: "circle" }}
				type="bar chart"
				title="Number of hours spent looking at a screen per day of the week."
				context="Screen time dashboard"
				descriptor="hours"
				manualDescriptions={{
					longer: "",
					shorter: "",
				}}
			>
				<MultiLineChart data={mockChartData}></MultiLineChart>
			</AutoVizuA11y>
			<ShortcutGuide></ShortcutGuide>
		</>,
	);

	const targetElement = screen.getByTestId("a11y_modal");
	const autoviz = screen.getByTestId("a11y_chart");

	// Assert the shortcut guide is displayed when ? is pressed
	fireEvent.keyDown(autoviz, { key: "?", code: "Slash", shiftKey: true });
	await waitFor(() => {
		const updatedStyles = window.getComputedStyle(targetElement);

		expect(updatedStyles.display).toBe("block");
	});

	// Assert the shortcut guide is hidden when escape is pressed
	fireEvent.keyDown(autoviz, { key: "Escape", code: "Escape" });
	await waitFor(() => {
		const updatedStyles = window.getComputedStyle(targetElement);
		expect(updatedStyles.display).toBe("none");
	});
});
