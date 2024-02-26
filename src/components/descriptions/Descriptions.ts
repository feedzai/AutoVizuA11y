/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

// When B or S are pressed the descriptions changed in the chart
export function descriptionsChanger(
	ref: React.RefObject<HTMLElement>,
	type: string,
	descs: string[],
	title: string,
	autoDescriptions: boolean,
	event?: React.KeyboardEvent,
): void {
	title = title + ", " + type + ". " + (autoDescriptions ? "Automatic description: " : "");

	// When pressed reads the smaller description
	if (ref.current !== null) {
		if (event === undefined || (event.nativeEvent.altKey && event.nativeEvent.code === "KeyS")) {
			ref.current.getElementsByClassName("a11y_desc")[0].innerHTML = title.concat(descs[1]);
			ref.current
				.getElementsByClassName("a11y_desc")[0]
				.setAttribute("aria-label", title.concat(descs[1]));
			return;
		} else if (event.nativeEvent.altKey && event.nativeEvent.code === "KeyB") {
			ref.current.getElementsByClassName("a11y_desc")[0].innerHTML = title.concat(descs[0]);
			ref.current
				.getElementsByClassName("a11y_desc")[0]
				.setAttribute("aria-label", title.concat(descs[0]));
			return;
		}
		return;
	}
}
