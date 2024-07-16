/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";
import { descriptionsKeyHandler, insightsKeyHandler, navigationKeyHandler } from "../components";

type AutoDescriptionsProps = {
	dynamicDescriptions?: boolean;
	apiKey: string;
	model?: string;
	temperature?: number;
};

type SelectorType = {
	element?: string;
	className?: string;
};

/**
 * Sets the appropriate navigation keys and shortcuts in the charts and data.
 */
export const handleKeyDown = (
	event: React.KeyboardEvent<HTMLDivElement>,
	alertDivRef: React.RefObject<HTMLElement>,
	type: string,
	number: number,
	chartRef: React.RefObject<HTMLDivElement>,
	elements: HTMLElement[],
	selectedSeries: string,
	series: string[],
	selectorType: SelectorType,
	setSelectedSeries: Function,
	setNumber: Function,
	setDescriptionContent: Function,
	insights: string,
	insightsArray: number[],
	arrayConverted: number[],
	title: string,
	descs: string[],
	autoDescriptions?: AutoDescriptionsProps,
	multiSeries?: string | undefined,
) => {
	let numberAux = navigationKeyHandler({
		type,
		event,
		number,
		chartRef,
		elements,
		alertDivRef,
		selectedSeries,
		series,
		selectorType,
		multiSeries,
		setSelectedSeries,
	});
	setNumber(numberAux);
	descriptionsKeyHandler({
		chartRef,
		setDescriptionContent,
		type,
		descs,
		title,
		autoDescriptions,
		event,
	});
	insightsKeyHandler({ event, elements, alertDivRef, insights, insightsArray, arrayConverted });
};
