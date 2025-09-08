/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { i18n } from "i18next";

/**
 * Translation object for a specific language
 */
export type TranslationObject = {
	[key: string]: string;
};

/**
 * Custom translations structure where keys are language codes and values are translation objects
 * Direct format: { "en-BR": { sg_title: "value" } }
 */
export type CustomTranslations = {
	[languageCode: string]: TranslationObject;
};

/**
 * Adds custom language resources to the i18n instance
 * @param i18nInstance - The i18n instance to add translations to
 * @param customTranslations - Object containing custom translations for different languages
 */
export const addCustomTranslations = (
	i18nInstance: i18n,
	customTranslations: CustomTranslations,
): void => {
	if (!customTranslations || typeof customTranslations !== "object") {
		console.warn("AutoVizuA11y: Invalid custom translations object provided");
		return;
	}

	Object.entries(customTranslations).forEach(([languageCode, translations]) => {
		if (!languageCode || !translations || typeof translations !== "object") {
			console.warn(`AutoVizuA11y: Invalid translation structure for language '${languageCode}'`);
			return;
		}

		try {
			// Check if the language already exists
			if (i18nInstance.hasResourceBundle(languageCode, "translation")) {
				// Merge with existing translations, custom translations take precedence
				const existingTranslations = i18nInstance.getResourceBundle(languageCode, "translation");
				const mergedTranslations = { ...existingTranslations, ...translations };
				i18nInstance.removeResourceBundle(languageCode, "translation");
				i18nInstance.addResourceBundle(languageCode, "translation", mergedTranslations);
			} else {
				// For new languages, merge with English fallback to ensure no missing strings
				const englishFallback = i18nInstance.getResourceBundle("en", "translation") || {};
				const mergedTranslations = { ...englishFallback, ...translations };
				i18nInstance.addResourceBundle(languageCode, "translation", mergedTranslations);
			}
		} catch (error) {
			console.error(
				`AutoVizuA11y: Error adding custom translations for language '${languageCode}':`,
				error,
			);
		}
	});
};
