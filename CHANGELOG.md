# Change Log
All notable changes to this project will be documented here in
accordance with [Keep a CHANGELOG][keep-changelog-url].
This project adheres to [Semantic Versioning][semver-url].

## [0.2.4] - 2017-01-13
### Added
- new option `--condensation-version` will set the condensation version
  in the generated package.json

## [0.2.3] - 2016-09-21
### Changed
- only install npm non-dev dependencies and make silent

## [0.2.2] - 2016-07-22
### Added
- npm scripts for the `_package.json` template

### Changed
- updated dependencies for both the generator and the generated
  condensation project

## [0.2.1] - 2016-04-21
### Added
- Generated projects should have a stubbed test directory and require
  [condensation-particle-tests][cpt-url] as a `devDependency`

## [0.2.0] - 2016-04-21
### Added
- CHANGELOG.md to both the generator project and the generated
  condensation project

### Changed
- renamed `particles` generator to `project`
- Clean README.md
- New projects will use [condensation][condensation-url] ^0.5.0


[cpt-url]: https://github.com/SungardAS/condensation-particle-tests
[semver-url]: http://semver.org
[keep-changelog-url]: http://keepachangelog.com/
[condensation-url]: https://github.com/SungardAS/condensation
