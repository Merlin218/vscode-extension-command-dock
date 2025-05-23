# 🔧 Command Dock - 本地安装指南

<div align="center">

![Command Dock](../public/icon.png)

**📖 本指南将帮助您在本地开发和测试 Command Dock 扩展**

[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](../package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📋 概述

本指南将帮助您在本地开发和测试 Command Dock 扩展。

## 🚀 快速开始

### 📁 1. 克隆项目

```bash
git clone https://github.com/your-username/vscode-extension-command-dock.git
cd vscode-extension-command-dock
```

### 📦 2. 安装依赖

```bash
pnpm install
```

### 🔧 3. 本地安装扩展

```bash
# 🚀 首次安装
./scripts/install-local.sh

# 🔄 重新安装（推荐在修改代码后使用）
./scripts/install-local.sh --reinstall

# 📦 或使用 pnpm 脚本
pnpm run install:local
```

### 🔄 4. 重新加载 VSCode

安装完成后，重新加载 VSCode 窗口以激活扩展：

- ⌨️ 按 `Cmd+Shift+P` (macOS) 或 `Ctrl+Shift+P` (Windows/Linux)
- 📝 输入 "Developer: Reload Window"
- ⏎ 按回车

## 📖 使用方法

### 🔍 查看 Command Dock 面板

1. 🗂️ 打开 VSCode 的资源管理器侧边栏
2. 🎛️ 找到 "Command Dock" 面板
3. ⚠️ 如果没有看到，确保您已经打开了一个工作区

### ➕ 添加自定义按钮

1. ➕ 点击 Command Dock 面板标题栏的 "+" 按钮
2. 📝 填写按钮信息：
   - **📛 名称**: 按钮显示名称
   - **⚡ 命令**: 要执行的终端命令
   - **🎨 图标**: 可选的图标名称
   - **🌈 颜色**: 可选的按钮颜色

### ▶️ 执行命令

- 🖱️ 点击按钮旁边的播放图标
- 🖱️ 或右键点击按钮选择 "Execute Command"

### ⚙️ 编辑和删除按钮

- ✏️ 右键点击按钮可以看到编辑和删除选项
- 🎛️ 或使用按钮旁边的编辑和删除图标

## 🔄 开发工作流

### 🔧 修改代码后重新安装

```bash
# 🔧 方法一：使用脚本重新安装
./scripts/install-local.sh --reinstall

# 📦 方法二：使用 pnpm 命令
pnpm run install:local

# ⚡ 方法三：使用 Makefile
make reinstall
```

### 🗑️ 卸载扩展

```bash
# 📦 使用 pnpm 脚本
pnpm run uninstall:local

# 🔧 使用 Makefile
make uninstall
```

### 🛠️ 调试模式

如果您想要调试扩展：

1. 🖥️ 在 VSCode 中打开项目
2. ⌨️ 按 `F5` 启动扩展开发主机
3. 🔍 在新窗口中测试扩展功能

## ❓ 常见问题

### 🔍 Q: 安装后看不到 Command Dock 面板

**💡 A**: 确保您已经打开了一个工作区文件夹。Command Dock 只在有工作区时显示。

### ❌ Q: 按钮执行命令失败

**🔧 A**: 检查以下几点：
- ✅ 命令是否正确
- 🔑 是否有必要的权限
- 📁 工作区路径是否正确

### 🔄 Q: 修改代码后扩展没有更新

**⚡ A**: 使用 `--reinstall` 参数重新安装：
```bash
./scripts/install-local.sh --reinstall
```

### 🔨 Q: 编译错误

**🛠️ A**: 清理并重新编译：
```bash
pnpm run clean
pnpm run compile
```

## 💡 示例配置

以下是一些常用的按钮配置示例：

### 🏗️ 构建项目
- **📛 名称**: Build
- **⚡ 命令**: `npm run build`
- **🎨 图标**: `$(tools)`

### 🧪 运行测试
- **📛 名称**: Test
- **⚡ 命令**: `npm test`
- **🎨 图标**: `$(beaker)`

### 🚀 启动开发服务器
- **📛 名称**: Dev Server
- **⚡ 命令**: `npm run dev`
- **🎨 图标**: `$(server-process)`

### 📊 Git 状态
- **📛 名称**: Git Status
- **⚡ 命令**: `git status`
- **🎨 图标**: `$(git-branch)`

## 📞 技术支持

如果遇到问题，请：

1. 📖 查看 [开发指南](../DEVELOPMENT.md)
2. 🔍 检查 [故障排除](../DEVELOPMENT.md#故障排除) 部分
3. 🐛 在 GitHub 上提交 Issue

## 🔗 下一步

- 📖 阅读 [开发指南](../DEVELOPMENT.md) 了解更多开发信息
- 📚 查看 [README](../README.md) 了解扩展功能
- 💡 查看 [使用示例](EXAMPLES.md) 了解丰富的配置
- 🤝 参与 [贡献](../DEVELOPMENT.md#贡献指南) 项目开发

---

<div align="center">

**🎉 开始您的 Command Dock 开发之旅！**

[🏠 返回主页](../README.md) • [📚 查看示例](EXAMPLES.md) • [🔧 开发指南](../DEVELOPMENT.md)

</div> 