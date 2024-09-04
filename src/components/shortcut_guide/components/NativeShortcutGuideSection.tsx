/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import { Section } from "../../../assets/data/GuideData";
import * as constants from "../../../constants";

interface ShortcutGuideSectionProps {
	section: Section;
	sectionIndex: number;
}

export const ShortcutGuideSection = ({ section, sectionIndex }: ShortcutGuideSectionProps) => (
	<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideSection}>
		<h3
			className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideListTitle}
			id={`listHeader${sectionIndex}`}
			aria-label={`Section: ${section.title}`}
		>
			{section.title}
		</h3>
		<dl
			className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideList}
			aria-labelledby={`listHeader${sectionIndex}`}
		>
			{section.shortcuts.map((shortcut, shortcutIndex) => (
				<div
					key={shortcutIndex}
					className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideRow}
					aria-label={`${shortcut.description}: ${shortcut.keys}`}
					role="listitem"
				>
					<dt className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideCellShortcut}>
						{shortcut.keys}
					</dt>
					<dd className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideCellExplanation}>
						{shortcut.description}
					</dd>
				</div>
			))}
		</dl>
	</div>
);
