/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { template } from "@feedzai/js-utilities";

import * as constants from "../../constants";

interface GenerateDescriptionsParams {
	title: string;
	dataString: string;
	average: number;
	context: string;
	apiKey: string;
	model?: string;
	temperature?: number;
}

interface LongerDescriptionsParam {
	data: string;
	title: string;
	average: number;
	context: string;
	key: string;
	adjustedModel: string;
	adjustedTemperature: number;
}

interface SmallerDescriptionsParam {
	desc: string;
	key: string;
	adjustedModel: string;
	adjustedTemperature: number;
}

/**
 * Generates the automatic descriptions.
 *
 * @export
 * @return An array with both longer and smaller descriptions.
 */
export async function generateDescriptions({
	title,
	dataString,
	average,
	context,
	apiKey: key,
	model,
	temperature,
}: GenerateDescriptionsParams): Promise<string[]> {
	const adjustedModel = model ?? constants.OPENAI_MODEL;
	const adjustedTemperature = temperature ?? 0;

	// Generates the longer one
	const longerDesc = await longerDescription({
		data: dataString,
		title,
		average,
		context,
		key,
		adjustedModel,
		adjustedTemperature,
	});

	// Generates the smaller one
	const smallerDesc = await smallerDescription({
		desc: longerDesc,
		key,
		adjustedModel,
		adjustedTemperature,
	});
	const descs = [longerDesc, smallerDesc];

	return descs;
}

/**
 * Calls the GPT API to generate the longer description.
 *
 * @return Longer chart description.
 */
async function longerDescription({
	data,
	title,
	average,
	context,
	key,
	adjustedModel,
	adjustedTemperature,
}: LongerDescriptionsParam): Promise<string> {
	const averageString = average ? " with an average of " + JSON.stringify(average) : "";

	const prompt = template(
		"Knowing that the chart below is from a {{context}} and the data represents {{title}} {{average}}," +
			" make a description (do not use abbreviations) with the trends in the data, starting with the conclusion: {{data}}",
		{ context, title, averageString, data },
	);

	const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`,
		},
		body: JSON.stringify({
			model: adjustedModel,
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: adjustedTemperature,
		}),
	});
	const output = await response.json();
	return output.choices[0].message.content;
}

/**
 * Calls the GPT API to generate the smaller description.
 *
 * @return Smaller chart description.
 */
async function smallerDescription({
	desc,
	key,
	adjustedModel,
	adjustedTemperature,
}: SmallerDescriptionsParam): Promise<string> {
	const prompt = "Summarize (in less than 60 words) the following:" + desc;

	const response = await fetch(constants.OPENAI_LINK, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`,
		},
		body: JSON.stringify({
			model: adjustedModel,
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: adjustedTemperature,
		}),
	});
	const output = await response.json();
	return output.choices[0].message.content;
}
