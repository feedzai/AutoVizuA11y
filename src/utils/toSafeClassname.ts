/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Converts the name of the series into a version suitable for a class
 *
 * @export
 * @param {string} multiSeriesValues - One of the multiserie string values
 * @return {string} - The string value refactored to fit a className
 */
export function toSafeClassName(multiSeriesValues: string): string {
	// Remove leading and trailing whitespace
	let safeClassName = multiSeriesValues.trim();

	// Replace spaces and invalid characters with dashes
	safeClassName = safeClassName.replace(/[^a-zA-Z0-9_-]/g, "-");

	// Replace multiple consecutive dashes with a single dash
	safeClassName = safeClassName.replace(/-+/g, "-");

	return "series_" + safeClassName;
}
