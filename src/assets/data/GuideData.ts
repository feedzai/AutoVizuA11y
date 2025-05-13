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
		title: "sg_access_title",
		shortcuts: [
			{ keys: "?", description: "sg_enter_description" },
			{ keys: "? or Esc", description: "sg_leave_description" },
		],
	},
	{
		title: "sg_move_elements_title",
		shortcuts: [
			{ keys: "↓", description: "sg_get_into_chart" },
			{ keys: "↑", description: "sg_get_out_of_chart" },
			{ keys: "→", description: "sg_move_forward" },
			{ keys: "←", description: "sg_move_backward" },
			{
				keys: "Alt + M",
				description: "sg_move_series",
			},
		],
	},
	{
		title: "sg_chart_nav_title",
		shortcuts: [
			{
				keys: "Home or Alt + Q",
				description: "sg_jump_beginning",
			},
			{
				keys: "End or Alt + W",
				description: "sg_jump_end",
			},
			{
				keys: "Alt + X",
				description: "sg_define_jump_points",
			},
			{
				keys: "+",
				description: "sg_add_jump_point",
			},
			{
				keys: "-",
				description: "sg_subtract_jump_point",
			},
		],
	},
	{
		title: "sg_stats_nav_title",
		shortcuts: [
			{ keys: "Alt + J", description: "minimum" },
			{ keys: "Alt + K", description: "average" },
			{ keys: "Alt + L", description: "maximum" },
		],
	},
	{
		title: "sg_stats_focused_title",
		shortcuts: [
			{
				keys: "Alt + Shift + J",
				description: "sg_compare_minimum",
			},
			{
				keys: "Alt + Shift + K",
				description: "sg_compare_average",
			},
			{
				keys: "Alt + Shift + L",
				description: "sg_compare_maximum",
			},
			{
				keys: "Alt + Z",
				description: "sg_compare_rest",
			},
		],
	},
	{
		title: "sg_change_desc_title",
		shortcuts: [
			{
				keys: "Alt + B",
				description: "sg_longer_desc",
			},
			{
				keys: "Alt + S",
				description: "sg_shorter_desc",
			},
		],
	},
];
