#!/bin/bash

# VSCode Extension Release Script
# Usage: ./scripts/release.sh [patch|minor|major] [--pre-release]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
VERSION_TYPE="patch"
PRE_RELEASE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    patch|minor|major)
      VERSION_TYPE="$1"
      shift
      ;;
    --pre-release)
      PRE_RELEASE=true
      shift
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

echo -e "${GREEN}🚀 Starting release process...${NC}"

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${YELLOW}⚠️  Warning: Not on main branch (current: $CURRENT_BRANCH)${NC}"
  read -p "Continue anyway? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}❌ Uncommitted changes found. Please commit or stash them first.${NC}"
  exit 1
fi

# Pull latest changes
echo -e "${GREEN}📥 Pulling latest changes...${NC}"
git pull origin main

# Install dependencies
echo -e "${GREEN}📦 Installing dependencies...${NC}"
pnpm install

# Run quality checks
echo -e "${GREEN}🔍 Running quality checks...${NC}"
pnpm run lint
pnpm run compile

# Run tests
echo -e "${GREEN}🧪 Running tests...${NC}"
pnpm run test || echo -e "${YELLOW}⚠️  Tests failed but continuing...${NC}"

# Update version
echo -e "${GREEN}📝 Updating version ($VERSION_TYPE)...${NC}"
NEW_VERSION=$(pnpm version $VERSION_TYPE --no-git-tag-version | sed 's/^v//')
echo -e "${GREEN}📝 New version: $NEW_VERSION${NC}"

# Update CHANGELOG.md
echo -e "${GREEN}📝 Please update CHANGELOG.md for version $NEW_VERSION${NC}"
read -p "Press Enter after updating CHANGELOG.md..."

# Commit version changes
echo -e "${GREEN}💾 Committing version changes...${NC}"
git add package.json CHANGELOG.md
git commit -m "chore(release): bump version to $NEW_VERSION"

# Create and push tag
TAG_NAME="v$NEW_VERSION"
echo -e "${GREEN}🏷️  Creating tag: $TAG_NAME${NC}"
git tag -a "$TAG_NAME" -m "Release $TAG_NAME"

# Push changes and tag
echo -e "${GREEN}📤 Pushing changes and tag...${NC}"
git push origin main
git push origin "$TAG_NAME"

# Package extension
echo -e "${GREEN}📦 Packaging extension...${NC}"
pnpm run package

# Publish to marketplace (if not pre-release and VSCE_PAT is set)
if [ "$PRE_RELEASE" = false ] && [ -n "$VSCE_PAT" ]; then
  echo -e "${GREEN}🚀 Publishing to VSCode Marketplace...${NC}"
  pnpm run publish
elif [ "$PRE_RELEASE" = true ] && [ -n "$VSCE_PAT" ]; then
  echo -e "${GREEN}🚀 Publishing pre-release to VSCode Marketplace...${NC}"
  pnpm run publish:pre
else
  echo -e "${YELLOW}⚠️  Skipping marketplace publish (no VSCE_PAT found)${NC}"
  echo -e "${YELLOW}   To publish manually, set VSCE_PAT environment variable and run:${NC}"
  if [ "$PRE_RELEASE" = true ]; then
    echo -e "${YELLOW}   pnpm run publish:pre${NC}"
  else
    echo -e "${YELLOW}   pnpm run publish${NC}"
  fi
fi

echo -e "${GREEN}✅ Release process completed!${NC}"
echo -e "${GREEN}   Version: $NEW_VERSION${NC}"
echo -e "${GREEN}   Tag: $TAG_NAME${NC}"
echo -e "${GREEN}   Package: command-dock-$NEW_VERSION.vsix${NC}"

if [ -n "$VSCE_PAT" ]; then
  echo -e "${GREEN}   Published to VSCode Marketplace${NC}"
fi 