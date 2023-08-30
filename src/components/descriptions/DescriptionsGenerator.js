/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to [•]include email here for more information.
 */

//generates the descriptions as soon as the components are created
export async function generateDescriptions(
	title,
	dataConverted,
	average,
	context,
	apiKey,
	model,
	temperature,
) {
	dataConverted = JSON.stringify(dataConverted);
	let key = apiKey;
	let adjustedModel = model ?? "gpt-3.5-turbo";
	let adjustedTemperature = temperature ?? 0;

	//generates the longer one
	const longerDesc = await longerDescription(
		dataConverted,
		title,
		average,
		context,
		key,
		adjustedModel,
		adjustedTemperature,
	);

	//generates the smaller one
	const smallerDesc = await smallerDescription(longerDesc, key, adjustedModel, adjustedTemperature);
	const descs = [longerDesc, smallerDesc];

	return descs;
}

//calls the GPT API to generate the longer description
async function longerDescription(
	dataConverted,
	title,
	average,
	context,
	key,
	adjustedModel,
	adjustedTemperature,
) {
	average = JSON.stringify(average);
	let prompt =
		"Knowing that the chart below is from a " +
		context +
		" and the data represents " +
		title +
		(average ? " with an average of " + average : "") +
		", make a description (do not use abbreviations) with the trends in the data, starting with the conclusion:" +
		dataConverted;

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
	const data = await response.json();
	return data.choices[0].message.content;
}

//calls the GPT API to generate the smaller description
async function smallerDescription(desc, key, adjustedModel, adjustedTemperature) {
	let prompt = "Summarize (in less than 60 words) the following:" + desc;

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
	const data = await response.json();
	return data.choices[0].message.content;
}
