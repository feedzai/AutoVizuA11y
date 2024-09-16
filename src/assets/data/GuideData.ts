/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

export interface Shortcut {
	keys: string;
	description: string;
}

export interface Section {
	title: string;
	shortcuts: Shortcut[];
}

export const GUIDE_DATA: Section[] = [
	{
		title: "Access the guide",
		shortcuts: [
			{ keys: "?", description: "Enter shortcut guide" },
			{ keys: "? or Esc", description: "Leave shortcut guide" },
		],
	},
	{
		title: "Move between page elements",
		shortcuts: [
			{ keys: "↓", description: "Get into a chart" },
			{ keys: "↑", description: "Get out of a chart" },
			{ keys: "→", description: "Move forward in a page element" },
			{ keys: "←", description: "Move backward in a page element" },
			{
				keys: "Alt + M",
				description: "Move between series of data inside the chart",
			},
		],
	},
	{
		title: "Chart navigation shortcuts",
		shortcuts: [
			{
				keys: "Home or Alt + Q",
				description: "Jump to the beginning of a chart",
			},
			{
				keys: "End or Alt + W",
				description: "Jump to the end of a chart",
			},
			{
				keys: "Alt + X",
				description: "Define the number of data points to be jumped at a time",
			},
			{
				keys: "+",
				description: "Add one number to the data points to be jumped at a time",
			},
			{
				keys: "-",
				description: "Subtract one number to the data points to be jumped at a time",
			},
		],
	},
	{
		title: "Statistical insights (works when navigating a chart)",
		shortcuts: [
			{ keys: "Alt + J", description: "Minimum" },
			{ keys: "Alt + K", description: "Average" },
			{ keys: "Alt + L", description: "Maximum" },
		],
	},
	{
		title: "Statistical insights (works when a chart element is focused)",
		shortcuts: [
			{
				keys: "Alt + Shift + J",
				description: "Compare current data element to minimum value",
			},
			{
				keys: "Alt + Shift + K",
				description: "Compare current data element to average value",
			},
			{
				keys: "Alt + Shift + L",
				description: "Compare current data element to maximum value",
			},
			{
				keys: "Alt + Z",
				description: "Compare current data element to the rest of the chart",
			},
		],
	},
	{
		title: "Change chart descriptions",
		shortcuts: [
			{
				keys: "Alt + B",
				description: "Set longer description of the chart",
			},
			{
				keys: "Alt + S",
				description: "Set shorter description of the chart (default)",
			},
		],
	},
];
