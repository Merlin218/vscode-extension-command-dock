# Command Dock - VSCode Extension Makefile

.PHONY: help install clean compile lint test package install-local uninstall-local release

# Default target
help:
	@echo "Command Dock - VSCode Extension"
	@echo "================================"
	@echo ""
	@echo "Available commands:"
	@echo "  install        - Install dependencies"
	@echo "  clean          - Clean build artifacts"
	@echo "  compile        - Compile TypeScript"
	@echo "  lint           - Run ESLint"
	@echo "  lint-fix       - Run ESLint with auto-fix"
	@echo "  test           - Run tests"
	@echo "  package        - Package extension"
	@echo "  install-local  - Install extension locally"
	@echo "  reinstall      - Reinstall extension locally"
	@echo "  uninstall      - Uninstall local extension"
	@echo "  release-patch  - Release patch version"
	@echo "  release-minor  - Release minor version"
	@echo "  release-major  - Release major version"
	@echo "  release-pre    - Release pre-release version"
	@echo "  dev            - Start development mode"
	@echo ""

# Install dependencies
install:
	@echo "📥 Installing dependencies..."
	pnpm install

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	pnpm run clean

# Compile TypeScript
compile:
	@echo "🔨 Compiling TypeScript..."
	pnpm run compile

# Run linter
lint:
	@echo "🔍 Running ESLint..."
	pnpm run lint

# Run linter with auto-fix
lint-fix:
	@echo "🔧 Running ESLint with auto-fix..."
	pnpm run lint:fix

# Run tests
test:
	@echo "🧪 Running tests..."
	pnpm run test

# Package extension
package: clean compile
	@echo "📦 Packaging extension..."
	pnpm run package

# Install extension locally
install-local:
	@echo "🚀 Installing extension locally..."
	./scripts/install-local.sh

# Reinstall extension locally
reinstall:
	@echo "🔄 Reinstalling extension locally..."
	./scripts/install-local.sh --reinstall

# Uninstall local extension
uninstall:
	@echo "🗑️  Uninstalling local extension..."
	pnpm run uninstall:local

# Release patch version
release-patch:
	@echo "🚀 Releasing patch version..."
	pnpm run release:patch

# Release minor version
release-minor:
	@echo "🚀 Releasing minor version..."
	pnpm run release:minor

# Release major version
release-major:
	@echo "🚀 Releasing major version..."
	pnpm run release:major

# Release pre-release version
release-pre:
	@echo "🚀 Releasing pre-release version..."
	pnpm run release:pre

# Development mode
dev: clean install compile
	@echo "🔧 Starting development mode..."
	@echo "Run 'make install-local' to install the extension"
	@echo "Or press F5 in VSCode to start debugging"

# Quick development cycle
quick: clean compile install-local
	@echo "⚡ Quick development cycle completed!"

# Full build and test
build: clean install lint compile test package
	@echo "✅ Full build completed!"

# Check project status
status:
	@echo "📊 Project Status"
	@echo "================="
	@echo "Node version: $(shell node --version)"
	@echo "pnpm version: $(shell pnpm --version)"
	@echo "Extension version: $(shell node -p "require('./package.json').version")"
	@echo "Extension ID: $(shell node -p "require('./package.json').publisher + '.' + require('./package.json').name")"
	@echo ""
	@echo "📁 Files:"
	@echo "Source files: $(shell find src -name '*.ts' | wc -l | tr -d ' ') TypeScript files"
	@echo "Build output: $(shell if [ -d out ]; then find out -name '*.js' | wc -l | tr -d ' '; else echo '0'; fi) JavaScript files"
	@echo "Package file: $(shell if [ -f *.vsix ]; then ls *.vsix; else echo 'Not found'; fi)" 