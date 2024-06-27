/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

/**
 * Generates the automatic descriptions.
 *
 * @export
 * @param {string} title
 * @param {object[]} data
 * @param {number} average
 * @param {string} context
 * @param {string} apiKey
 * @param {string} [model]
 * @param {number} [temperature]
 * @return {Promise<string[]>} An array with both longer and smaller descriptions.
 */
export async function generateDescriptions(
	title: string,
	data: object[],
	average: number,
	context: string,
	apiKey: string,
	model?: string,
	temperature?: number,
): Promise<string[]> {
	data = JSON.stringify(data);
	const key = apiKey;
	const adjustedModel = model ?? "gpt-3.5-turbo";
	const adjustedTemperature = temperature ?? 0;

	// Generates the longer one
	const longerDesc = await longerDescription(
		data as string,
		title,
		average,
		context,
		key,
		adjustedModel,
		adjustedTemperature,
	);

	// Generates the smaller one
	const smallerDesc = await smallerDescription(longerDesc, key, adjustedModel, adjustedTemperature);
	const descs = [longerDesc, smallerDesc];

	return descs;
}

/**
 * Calls the GPT API to generate the longer description.
 *
 * @param {string} data
 * @param {string} title
 * @param {number} average
 * @param {string} context
 * @param {string} key
 * @param {string} adjustedModel
 * @param {number} adjustedTemperature
 * @return {Promise<string>} Longer chart description.
 */
async function longerDescription(
	data: string,
	title: string,
	average: number,
	context: string,
	key: string,
	adjustedModel: string,
	adjustedTemperature: number,
): Promise<string> {
	average = JSON.stringify(average);
	const prompt =
		"Knowing that the chart below is from a " +
		context +
		" and the data represents " +
		title +
		(average ? " with an average of " + average : "") +
		", make a description (do not use abbreviations) with the trends in the data, starting with the conclusion:" +
		data;

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
 * @param {string} desc
 * @param {string} key
 * @param {string} adjustedModel
 * @param {number} adjustedTemperature
 * @return {Promise<string[]>} Smaller chart description.
 */
async function smallerDescription(
	desc: string,
	key: string,
	adjustedModel: string,
	adjustedTemperature: number,
): Promise<string> {
	const prompt = "Summarize (in less than 60 words) the following:" + desc;

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
