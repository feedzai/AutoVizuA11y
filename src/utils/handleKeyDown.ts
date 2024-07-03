/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import React from "react";
import { insightsKeyHandler, navigationKeyHandler } from "../components";

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
 *
 * @param {React.KeyboardEvent<HTMLDivElement>} event
 * @param {Function} setTextContent
 * @param {string} type
 * @param {number} number
 * @param {React.RefObject<HTMLDivElement>} ref
 * @param {HTMLElement[]} elements
 * @param {string} selectedSeries
 * @param {string[]} series
 * @param {SelectorType} selectorType
 * @param {Function} nextSeries
 * @param {Function} setNumber
 * @param {Function} setDescriptionContent
 * @param {string} insights
 * @param {number[]} insightsArray
 * @param {number[]} arrayConverted
 * @param {string} title
 * @param {string[]} descs
 * @param {AutoDescriptionsProps} [autoDescriptions]
 * @param {(string | undefined)} [multiSeries]
 */
export const handleKeyDown = (
	event: React.KeyboardEvent<HTMLDivElement>,
	setTextContent: Function,
	type: string,
	number: number,
	ref: React.RefObject<HTMLDivElement>,
	elements: HTMLElement[],
	selectedSeries: string,
	series: string[],
	selectorType: SelectorType,
	nextSeries: Function,
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
	let numberAux = navigationKeyHandler(
		type,
		event,
		number,
		ref,
		elements,
		setTextContent,
		selectedSeries,
		series,
		selectorType,
		multiSeries,
		nextSeries,
	);
	setNumber(numberAux);
	insightsKeyHandler(
		type,
		event,
		elements,
		setTextContent,
		ref,
		setDescriptionContent,
		insights,
		insightsArray,
		arrayConverted,
		title,
		descs,
		autoDescriptions,
	);
};
