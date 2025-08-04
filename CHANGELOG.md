# Changelog

All notable changes to the "Command Dock" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-01-15

### Added
- ✨ **Auto-close terminal**: Automatically close terminal after command execution completes
- ✨ **Panel location configuration**: Choose to display Command Dock panel in Explorer or Source Control sidebar
- ✨ **Quick settings access**: New gear icon in panel title for quick access to settings
- 📚 **Configuration guide documentation**: Detailed configuration guide for new features
- 📚 **Breaking changes documentation**: Complete migration guide for v1.0.0
- 🎯 **Enhanced examples**: Updated all configuration examples with new naming

### Changed
- 🔧 **BREAKING**: Global rename from `customButton` to `commandDock` for consistency
- 🔧 **BREAKING**: Configuration keys renamed:
  - `customButton.buttons` → `commandDock.buttons`
  - `customButton.autoCloseTerminal` → `commandDock.autoCloseTerminal`
  - `customButton.panelLocation` → `commandDock.panelLocation`
- 🔧 **BREAKING**: Command names updated:
  - All commands now use `commandDock.*` prefix instead of `customButton.*`
- 🔧 **BREAKING**: Panel and view IDs updated:
  - `customButtonPanel` → `commandDockPanel`
  - `customButton` (viewItem) → `commandDockButton`
- 🎨 **Terminal names**: Updated from "Custom Button:" to "Command Dock:"
- 📖 **Documentation**: Updated all README examples and documentation

### Fixed
- 🐛 **Memory management**: Improved terminal listener cleanup and resource management
- 🐛 **Configuration validation**: Better error handling for invalid configurations

### Technical
- 🏗️ **Code architecture**: Renamed TypeScript interfaces for consistency
- 🏗️ **Backward compatibility**: Maintained type aliases for existing code compatibility
- 🧪 **Testing**: All functionality tested and verified after refactoring

## [0.0.1] - 2024-01-XX

### Added
- Initial extension setup
- Basic command execution functionality
- Panel provider for custom buttons
- Configuration management
- UI handlers for button operations 