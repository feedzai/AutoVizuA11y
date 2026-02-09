# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- Updated Shortcut Guides to better follow the 'Dialog (Modal) Pattern' by W3C
- Updated cypress tests accordingly

## 3.0.3 - 2025-12-03

### Added

- Fixed vulnerable dependency

## 3.0.2 - 2025-12-03

### Added

- Fixed multiple vulnerable dependencies

## 3.0.1 - 2025-10-06

### Added

- Fixed vulnerable dependency

## 3.0.0 - 2025-09-15

### Added

- Implemented i18n alternatives as the new "internationalization" property
- Fixed tests / github pipeline errors
- Adapted the ShortcutGuide to vary between "Alt" and "option" depending on the OS
- Added support for OpenAI API-compatible providers via the new `baseUrl` prop
- Added new i18n Cypress tests
- Added Arrow Navigation to the ShortcutGuide

### Changed

- Replaced arrow symbols with text on the ShortcutGuide
- Re-did ShortcutGuide `<dl>` structure
- Moved the context prop to inside autoDescriptions

## 2.0.4 - 2025-01-06

### Added

- Fixed an issue where series values having spaces would invalidate class names

## 2.0.3 - 2024-11-04

### Added

- Adds missing types
- Fixed the issue where components were not being properly exported

## 2.0.2 - 2024-10-24

### Added

- Dynamic changes in the data or DOM elements now trigger updates in the tool

## 2.0.1 - 2024-10-08

### Added

- Aligned native ShortcutGuide styling with the prototypes

## 2.0.0 - 2024-10-04

### Added

- Changed bundler from babel to vite
- Replaced jest with cypress
- Converted Javascript to Typescript
- Added documentation
- Revised the file structure
- Refactored code with React best practices
- Converted the ShortcutGuide into a prop, making it overridable and customizable

## 1.0.3 - 2024-01-09

### Added

- Remove unused dependency

## 1.0.2 - 2023-12-06

### Added

- Fixed the previously correction of the "series:" class attribution in the data elements that would break the navigation inside multi series charts

## 1.0.1 - 2023-12-06

### Added

- Corrected the attribution of the "series:" class in the data elements that would break the navigation inside multi series charts

## 1.0.0 - 2023-11-14

### Added

- Added support for charts with multiple encodings

## 0.2.0 - 2023-11-02

### Added

- Extended React compatibility to support projects with React >=16.14.0
- Set up automatic semantic versioning
