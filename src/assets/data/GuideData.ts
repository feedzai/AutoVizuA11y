interface Shortcut {
	keys: string;
	description: string;
}

interface Guide {
	title: string;
	shortcuts: Shortcut[];
}

export const guideData: Guide[] = [
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
				keys: "Alt (option) + M",
				description: "Move between series of data inside the chart",
			},
		],
	},
	{
		title: "Chart navigation shortcuts",
		shortcuts: [
			{
				keys: "Home or Alt (option) + Q",
				description: "Jump to the beginning of a chart",
			},
			{
				keys: "End or Alt (option) + W",
				description: "Jump to the end of a chart",
			},
			{
				keys: "Alt (option) + X",
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
			{ keys: "Alt (option) + J", description: "Minimum" },
			{ keys: "Alt (option) + K", description: "Average" },
			{ keys: "Alt (option) + L", description: "Maximum" },
		],
	},
	{
		title: "Statistical insights (works when a chart element is focused)",
		shortcuts: [
			{
				keys: "Alt (option) + Shift + J",
				description: "Compare current data element to minimum value",
			},
			{
				keys: "Alt (option) + Shift + K",
				description: "Compare current data element to average value",
			},
			{
				keys: "Alt (option) + Shift + L",
				description: "Compare current data element to maximum value",
			},
			{
				keys: "Alt (option) + Z",
				description: "Compare current data element to the rest of the chart",
			},
		],
	},
	{
		title: "Change chart descriptions",
		shortcuts: [
			{
				keys: "Alt (option) + B",
				description: "Set longer description of the chart",
			},
			{
				keys: "Alt (option) + S",
				description: "Set shorter description of the chart (default)",
			},
		],
	},
];
