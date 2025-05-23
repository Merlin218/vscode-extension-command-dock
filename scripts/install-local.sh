#!/bin/bash

# VSCode Extension Local Installation Script
# Usage: ./scripts/install-local.sh [--reinstall]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
REINSTALL=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --reinstall)
      REINSTALL=true
      shift
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      echo "Usage: $0 [--reinstall]"
      exit 1
      ;;
  esac
done

echo -e "${BLUE}🔧 Command Dock - Local Installation${NC}"
echo -e "${BLUE}=====================================${NC}"

# Get extension info from package.json
EXTENSION_NAME=$(node -p "require('./package.json').name")
PUBLISHER=$(node -p "require('./package.json').publisher")
EXTENSION_ID="${PUBLISHER}.${EXTENSION_NAME}"
VERSION=$(node -p "require('./package.json').version")

echo -e "${GREEN}📦 Extension: ${EXTENSION_ID}${NC}"
echo -e "${GREEN}📦 Version: ${VERSION}${NC}"

# Check if reinstall is needed
if [ "$REINSTALL" = true ]; then
  echo -e "${YELLOW}🗑️  Uninstalling existing extension...${NC}"
  code --uninstall-extension "$EXTENSION_ID" || echo -e "${YELLOW}⚠️  Extension not found or already uninstalled${NC}"
fi

# Clean previous builds
echo -e "${GREEN}🧹 Cleaning previous builds...${NC}"
pnpm run clean

# Install dependencies
echo -e "${GREEN}📥 Installing dependencies...${NC}"
pnpm install

# Lint code
echo -e "${GREEN}🔍 Linting code...${NC}"
pnpm run lint

# Compile TypeScript
echo -e "${GREEN}🔨 Compiling TypeScript...${NC}"
pnpm run compile

# Package extension
echo -e "${GREEN}📦 Packaging extension...${NC}"
pnpm run package

# Find the generated .vsix file
VSIX_FILE=$(ls *.vsix | head -n 1)

if [ -z "$VSIX_FILE" ]; then
  echo -e "${RED}❌ No .vsix file found!${NC}"
  exit 1
fi

echo -e "${GREEN}📁 Package file: ${VSIX_FILE}${NC}"

# Install extension
echo -e "${GREEN}🚀 Installing extension to VSCode...${NC}"
code --install-extension "$VSIX_FILE"

# Check installation
echo -e "${GREEN}🔍 Verifying installation...${NC}"
if code --list-extensions | grep -q "$EXTENSION_ID"; then
  echo -e "${GREEN}✅ Extension installed successfully!${NC}"
  echo -e "${GREEN}   Extension ID: ${EXTENSION_ID}${NC}"
  echo -e "${GREEN}   Package: ${VSIX_FILE}${NC}"
  echo -e "${BLUE}💡 You may need to reload VSCode to see the changes.${NC}"
else
  echo -e "${RED}❌ Extension installation failed!${NC}"
  exit 1
fi

echo -e "${BLUE}🎉 Installation completed!${NC}"
echo -e "${BLUE}=====================================${NC}" 