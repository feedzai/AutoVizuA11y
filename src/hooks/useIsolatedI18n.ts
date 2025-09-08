/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { useEffect, useMemo } from "react";
import { createInstance, i18n } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
// @ts-expect-error - i18n.js file doesn't have TypeScript declarations
import globalI18n from "../i18n";
import { CustomTranslations } from "../utils/customTranslations";

/**
 * Hook that creates an isolated i18n instance for each component to prevent
 * language changes from affecting other components on the same page
 * @param {string} language - The language to use for the component
 * @param {CustomTranslations} customTranslations - The custom translations to use for the component
 * @return The i18n instance and the translation function
 */
export const useIsolatedI18n = (
	language?: string,
	customTranslations?: CustomTranslations,
): { t: ReturnType<typeof useTranslation>["t"]; i18n: i18n } => {
	const isolatedI18n = useMemo(() => {
		const instance = createInstance();

		// Isolated resources with custom translations
		const getIsolatedResources = () => {
			// Base resources from global i18n
			const baseResources: Record<string, { translation: Record<string, string> }> = {};
			Object.entries(globalI18n.options.resources).forEach(([lang, resource]) => {
				if (
					resource &&
					typeof resource === "object" &&
					"translation" in resource &&
					resource.translation
				) {
					baseResources[lang] = {
						translation: { ...resource.translation },
					};
				}
			});

			// Apply custom translations
			if (customTranslations) {
				Object.entries(customTranslations).forEach(([languageCode, translations]) => {
					if (languageCode && translations && typeof translations === "object") {
						if (baseResources[languageCode]) {
							// Merge custom translations with existing ones (custom takes precedence)
							baseResources[languageCode] = {
								translation: {
									...baseResources[languageCode].translation,
									...translations,
								},
							};
						} else {
							// For new languages, use English as base
							const englishFallback = baseResources["en-BR"]?.translation || {};
							baseResources[languageCode] = {
								translation: {
									...englishFallback,
									...translations,
								},
							};
						}
					}
				});
			}

			return baseResources;
		};

		instance.use(initReactI18next).init({
			fallbackLng: "en-BR",
			debug: false,
			resources: getIsolatedResources(),
			interpolation: {
				escapeValue: false,
			},
			react: {
				useSuspense: false,
			},
		});

		return instance;
	}, [customTranslations]);

	// Handle language changes for this specific instance only
	useEffect(() => {
		if (language && language !== isolatedI18n.language) {
			isolatedI18n.changeLanguage(language);
		}
	}, [language, isolatedI18n]);

	const { t } = useTranslation("translation", { i18n: isolatedI18n });

	return { t, i18n: isolatedI18n };
};
