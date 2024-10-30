/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { getLSItem, setLSItem } from "@feedzai/js-utilities";

/**
 * Ensures the tutorial is heard the first time a chart is focused
 *
 * @export
 */
export function initToolTutorial() {
	const toolTutorial = getLSItem("toolTutorial");

	if (!toolTutorial) {
		setLSItem("toolTutorial", "true");
	}
}
