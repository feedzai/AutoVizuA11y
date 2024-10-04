/**
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 * Other licensing options may be available, please reach out to data-viz@feedzai.com for more information.
 */

import * as constants from "../../../../../src/constants";
import { GUIDE_DATA } from "../../../../../src/assets/data/GuideData";
import React from "react";

import { CustomShortcutGuideSection } from "./CustomShortcutGuideSection";

export const CustomShortcutGuideBody = () => (
	<div className={constants.SHORTCUTGUIDE_CLASSES.shortcutGuideBody}>
		{GUIDE_DATA.map((section, sectionIndex) => (
			<div key={sectionIndex}>
				<CustomShortcutGuideSection section={section} sectionIndex={sectionIndex} />
			</div>
		))}
	</div>
);
