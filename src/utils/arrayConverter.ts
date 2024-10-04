/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Converts the data object into an array with only the numerical values.
 *
 * @export
 * @template T
 * @param {T[]} data - The array of data objects to convert.
 * @param {keyof T} insight - The key of the numerical value to extract.
 * @return {Promise<number[]>} Promise resolving to an array with numerical values.
 * @throws {Error} If the insight key does not exist in the data objects or if the value is not a number.
 */
export function arrayConverter<T extends Record<string, unknown>>(
	data: T[],
	insight: keyof T,
): number[] {
	try {
		if (insight === "") {
			return [];
		}
		if (!insight || typeof insight !== "string") {
			throw new Error("Invalid insight key provided");
		}
		return data.map((item, index) => {
			const value = item[insight];
			if (typeof value !== "number") {
				throw new Error(`Invalid value at index ${index}: expected number, got ${typeof value}`);
			}
			return value;
		});
	} catch (error) {
		console.error("Error in arrayConverter:", error);
		throw error;
	}
}
