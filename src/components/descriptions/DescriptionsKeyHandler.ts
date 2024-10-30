/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { template } from "@feedzai/js-utilities";

type AutoDescriptionsProps = {
	dynamicDescriptions?: boolean;
	apiKey: string;
	model?: string;
	temperature?: number;
};

interface DescriptionsKeyHandlerParams {
	chartRef: React.RefObject<HTMLElement>;
	setDescriptionContent: (value: string) => void;
	type: string;
	descs: string[];
	title: string;
	autoDescriptions?: AutoDescriptionsProps;
	event?: React.KeyboardEvent;
}

/**
 * Handles the longer and shorter description change when Alt (option) + B or Alt (option) + S are pressed, respectively.
 *
 * @export
 */
export function descriptionsKeyHandler({
	chartRef,
	setDescriptionContent,
	type,
	descs,
	title,
	autoDescriptions,
	event,
}: DescriptionsKeyHandlerParams): void {
	if (!chartRef.current) return;

	const isItAutomatic = autoDescriptions ? "Automatic description: " : "";

	const fullTitle = template("{{title}}, {{type}}. {{isItAutomatic}}", {
		title,
		type,
		isItAutomatic,
	});
	if (!event) {
		setDescriptionContent(fullTitle + descs[1]);
		return;
	}
	if (event.altKey) {
		switch (event.code) {
			case "KeyS":
				setDescriptionContent(fullTitle + descs[1]);
				break;
			case "KeyB":
				setDescriptionContent(fullTitle + descs[0]);
				break;
		}
	}
}
