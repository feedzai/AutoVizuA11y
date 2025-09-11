/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { isMacOS } from "../../utils/macOSDetector";

export interface Shortcut {
	keys: string;
	description: string;
}

export interface Section {
	title: string;
	shortcuts: Shortcut[];
}

/**
 * Generates guide data with appropriate key names based on the operating system
 * Uses "Option" for macOS and "Alt" for other systems
 */
export function getGuideData(): Section[] {
	const modifierKey = isMacOS() ? "option" : "Alt";

	return [
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
				{ keys: "Down Arrow", description: "sg_get_into_chart" },
				{ keys: "Up Arrow", description: "sg_get_out_of_chart" },
				{ keys: "Right Arrow", description: "sg_move_forward" },
				{ keys: "Left Arrow", description: "sg_move_backward" },
				{
					keys: `${modifierKey} + M`,
					description: "sg_move_series",
				},
			],
		},
		{
			title: "sg_chart_nav_title",
			shortcuts: [
				{
					keys: `Home or ${modifierKey} + Q`,
					description: "sg_jump_beginning",
				},
				{
					keys: `End or ${modifierKey} + W`,
					description: "sg_jump_end",
				},
				{
					keys: `${modifierKey} + X`,
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
				{ keys: `${modifierKey} + J`, description: "minimum" },
				{ keys: `${modifierKey} + K`, description: "average" },
				{ keys: `${modifierKey} + L`, description: "maximum" },
			],
		},
		{
			title: "sg_stats_focused_title",
			shortcuts: [
				{
					keys: `${modifierKey} + Shift + J`,
					description: "sg_compare_minimum",
				},
				{
					keys: `${modifierKey} + Shift + K`,
					description: "sg_compare_average",
				},
				{
					keys: `${modifierKey} + Shift + L`,
					description: "sg_compare_maximum",
				},
				{
					keys: `${modifierKey} + Z`,
					description: "sg_compare_rest",
				},
			],
		},
		{
			title: "sg_change_desc_title",
			shortcuts: [
				{
					keys: `${modifierKey} + B`,
					description: "sg_longer_desc",
				},
				{
					keys: `${modifierKey} + S`,
					description: "sg_shorter_desc",
				},
			],
		},
	];
}

// Legacy export for backward compatibility - but this will now be dynamic
export const GUIDE_DATA = getGuideData();
