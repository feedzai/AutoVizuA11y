/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Enables the navigation to the end/beginning of a chart.
 *
 * @export
 * @param {React.KeyboardEvent} event
 * @param {React.RefObject<HTMLElement>} ref
 * @param {{
 * 		element?: string;
 * 		className?: string;
 * 	}} selectorType
 * @param {string} selectedSeries
 * @return {void}
 */
export function skip({
	event,
	ref,
	selectorType,
	selectedSeries,
}: {
	event: React.KeyboardEvent;
	ref: React.RefObject<HTMLElement>;
	selectorType: {
		element?: string;
		className?: string;
	};
	selectedSeries: string;
}): void {
	let elements: HTMLElement[] = [];
	const activeElement: HTMLElement | null = document.activeElement as HTMLElement | null;
	const { nativeEvent } = event;

	if (selectorType.element !== undefined) {
		const result = ref?.current?.querySelectorAll<HTMLElement>(selectorType.element);

		if (result) {
			elements = Array.from(result);
		}
	} else {
		const result = ref?.current?.getElementsByClassName(selectorType.className!);

		if (result) {
			elements = Array.from(result) as HTMLElement[];
		}
	}

	if (selectedSeries.length !== 0) {
		const filteredElements = elements.filter((element) => {
			const a = `series:${selectedSeries}`;
			return element.classList.contains(a);
		});
		elements = filteredElements;
	}

	// If the elements are focusable (e.g., buttons), it would work at the chart level
	if (!activeElement || !elements.includes(activeElement)) {
		return;
	}

	// Skips to the beginning
	if ((nativeEvent.altKey && nativeEvent.code === "KeyQ") || nativeEvent.code === "Home") {
		nativeEvent.preventDefault();
		elements[0]?.focus();
	}

	// Skips to the end
	if ((nativeEvent.altKey && nativeEvent.code === "KeyW") || nativeEvent.code === "End") {
		nativeEvent.preventDefault();
		elements[elements.length - 1]?.focus();
	}
}
