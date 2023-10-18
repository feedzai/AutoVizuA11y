/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

//handles the navigation between data elements
export function jumpXpoints(event, number, elements, selectedSeries, series) {
	//going backward
	if (series.length !== 0 && selectedSeries.length !== 0) {
		let currentSeriesPos = series.indexOf(selectedSeries);
		let currentSeriesName = series[currentSeriesPos];

		const currentSeries = [];
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			const a = `series:${currentSeriesName}`;
			if (element.classList.contains(a)) {
				currentSeries.push(element);
			}
		}
		elements = currentSeries;
	}

	if (event.nativeEvent.key === "ArrowLeft") {
		var currentPosition;
		for (let i = 0; i < elements.length; i++) {
			if (elements[i] === document.activeElement) {
				currentPosition = i;
			}
		}

		//returns to normal while on the first element
		if (currentPosition === 0 || currentPosition === undefined) {
			event.nativeEvent.returnValue = true;
			return;
		}

		//checks if its possible to jump X number, otherwise stops at first
		event.nativeEvent.preventDefault();
		for (let index = 0; index < number; index++) {
			if (elements[currentPosition - 1] !== undefined) {
				currentPosition = currentPosition - 1;
			}
		}

		elements[currentPosition].focus();
		return;
	}

	//Going forward
	if (event.nativeEvent.key === "ArrowRight") {
		var currentPosition;

		for (let i = 0; i < elements.length; i++) {
			if (elements[i] === document.activeElement) {
				currentPosition = i;
			}
		}

		//returns to normal while on the last element
		if (currentPosition === elements.length - 1 || currentPosition === undefined) {
			event.nativeEvent.returnValue = true;
			return;
		}

		//checks if its possible to jump X number, otherwise stops at last
		event.nativeEvent.preventDefault();
		for (let index = 0; index < number; index++) {
			if (elements[currentPosition + 1] !== undefined) {
				currentPosition = currentPosition + 1;
			}
		}

		elements[currentPosition].focus();
		return;
	}
}

//handles the navigation between charts
export function jumpXcharts(event, ref) {
	let charts = document.getElementsByClassName("a11y_desc");
	charts = Array.from(charts);
	let chart = ref.current.getElementsByClassName("a11y_desc")[0];

	if (chart === document.activeElement && charts.includes(chart)) {
		let currentPosition = charts.indexOf(chart);

		if (event.nativeEvent.key === "ArrowLeft") {
			event.nativeEvent.preventDefault();
			if (currentPosition === 0 || currentPosition === undefined) {
				event.nativeEvent.returnValue = true;
				return;
			}
			if (charts[currentPosition - 1] !== null) {
				charts[currentPosition - 1].focus();
			}
			return;
		}

		if (event.nativeEvent.key === "ArrowRight") {
			event.nativeEvent.preventDefault();
			if (currentPosition === charts.length - 1) {
				event.nativeEvent.returnValue = true;
				return;
			}
			if (charts[currentPosition + 1] !== null) {
				charts[currentPosition + 1].focus();
			}
			charts[currentPosition + 1].focus();
			return;
		}
	}
	return;
}
