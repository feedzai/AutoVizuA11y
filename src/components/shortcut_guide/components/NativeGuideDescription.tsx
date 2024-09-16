/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import * as constants from "../../../constants";

export const ShortcutGuideDescription = () => (
	<p
		className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideDescription}
		id={constants.SHORTCUTGUIDE_ID.shortcutGuideDescription}
	>
		AutoVizually shortcut guide. AutoVizually lets you navigate between charts and underlying data
		elements using just the keyboard. When focused on a chart, a description regarding the data will
		be provided — you might receive a notification indicating that the chart description was
		produced by an AI model. For JAWS and NVDA users, it is recommended to turn Focus mode before
		navigating the data using the arrow keys.
	</p>
);
