/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { wait } from "@feedzai/js-utilities";

import * as constants from "./../constants";

/**
 * Sets a message in div with the 'alert' role and cleans it after some time
 *
 * @export
 * @param {React.ReactNode | null} alertDiv - Div where the alerts are set.
 * @param {string} message - The message to be set.
 */
export async function showAlert(
	alertDivRef: React.RefObject<HTMLElement>,
	message: string,
): Promise<void> {
	if (alertDivRef.current) {
		alertDivRef.current.textContent = message;
		await wait(constants.ALERT_DURATION);
		alertDivRef.current.textContent = "\u00A0";
	}
}
