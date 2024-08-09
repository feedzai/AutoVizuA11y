/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

const DECIMAL_PLACES = 2;

export const TIME_TO_WAIT_BEFORE_HANDLING_DESCRIPTIONS = 500;
export const OPENAI_MODEL = "gpt-3.5-turbo";
export const OPENAI_LINK = "https://api.openai.com/v1/chat/completions";
export const TIMEOUT_DURATION = 1000;
export const DESC_CLASS = "a11y_desc";
export const ROUNDING_FACTOR = 10 ** DECIMAL_PLACES;
export const ATTRIBUTES_TO_REMOVE = ["aria-describedby", "aria-labelledby"];
export const TABINDEX_ZERO = '[tabindex="0"]';
export const TOOL_TUTORIAL_KEY = "toolTutorial";
export const FOCUS_CLASS = "focused";
export const ALERT_MESSAGE =
	"You just entered an AutoVizually chart. For information on how to interact with it, press the question mark key to open the shortcut guide";
export const ALERT_DURATION = 1000;
export const AUTOVIZUA11Y_CLASSES = {
	alertDiv: "a11y_alert visually-hidden",
	a11yChart: "a11y_chart",
	a11yDesc: "a11y_desc visually-hidden",
	a11yNavGuide: "a11y_nav_guide",
};
export const SHORTCUTGUIDE_CLASSES = {
	shortcutGuideBackground: "shortcut-guide__background",
	shortcutGuideContainer: "shortcut-guide__container",
	shortcutGuideHeader: "shortcut-guide__header",
	shortcutGuideTitle: "shortcut-guide__title",
	shortcutGuideActionLabel: "shortcut-guide__action-label",
	shortcutGuideButtonClose: "shortcut-guide__button-close",
	shortcutGuideBreak: "shortcut-guide__break",
	shortcutGuideBody: "shortcut-guide__body",
	shortcutGuideSection: "shortcut-guide__section",
	shortcutGuideRow: "shortcut-guide__row",
	shortcutGuideCellTitle: "shortcut-guide__cell shortcut-guide__cell--title",
	shortcutGuideCellShortcut: "shortcut-guide__cell shortcut-guide__cell--shortcut",
	shortcutGuideCellExplanation: "shortcut-guide__cell shortcut-guide__cell--explanation",
	shortcutGuideDescription: "visually-hidden",
};
export const SHORTCUTGUIDE_ID = {
	shortcutGuideDescription: "shortcut-guide__description",
};
