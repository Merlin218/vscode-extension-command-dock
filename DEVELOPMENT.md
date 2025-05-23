# Command Dock - 开发指南

## 项目概述

Command Dock 是一个强大的 VSCode 扩展，提供自定义命令面板功能，允许用户在工作区中执行终端命令。

## 开发环境设置

### 前置要求

- Node.js 16+ 
- pnpm (推荐) 或 npm
- VSCode
- Git

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 编译 TypeScript
pnpm run compile

# 监听模式编译
pnpm run watch

# 代码检查
pnpm run lint

# 自动修复代码风格
pnpm run lint:fix

# 运行测试
pnpm run test

# 清理构建文件
pnpm run clean
```

## 本地开发和测试

### 方法一：使用 F5 调试

1. 在 VSCode 中打开项目
2. 按 `F5` 启动扩展开发主机
3. 在新窗口中测试扩展功能

### 方法二：本地安装扩展

使用提供的脚本进行本地安装：

```bash
# 首次安装
./scripts/install-local.sh

# 重新安装（会先卸载旧版本）
./scripts/install-local.sh --reinstall

# 或使用 pnpm 脚本
pnpm run install:local
```

### 卸载本地扩展

```bash
pnpm run uninstall:local
```

## 发布流程

### 自动化发布

项目提供了完整的自动化发布流程：

```bash
# 发布补丁版本 (0.0.1 -> 0.0.2)
pnpm run release:patch

# 发布次要版本 (0.0.1 -> 0.1.0)
pnpm run release:minor

# 发布主要版本 (0.0.1 -> 1.0.0)
pnpm run release:major

# 发布预发布版本
pnpm run release:pre
```

### 手动发布步骤

如果需要手动控制发布过程：

1. **更新版本号**
   ```bash
   pnpm run version:patch  # 或 version:minor, version:major
   ```

2. **更新 CHANGELOG.md**
   - 添加新版本的变更记录
   - 遵循 [Keep a Changelog](https://keepachangelog.com/) 格式

3. **提交变更**
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore(release): bump version to x.x.x"
   ```

4. **创建标签**
   ```bash
   git tag -a "vx.x.x" -m "Release vx.x.x"
   ```

5. **推送到远程**
   ```bash
   git push origin main
   git push origin vx.x.x
   ```

6. **打包扩展**
   ```bash
   pnpm run package
   ```

7. **发布到市场**
   ```bash
   # 正式版本
   pnpm run publish
   
   # 预发布版本
   pnpm run publish:pre
   ```

## GitHub Actions

项目配置了自动化 CI/CD 流程：

### CI 流程 (`.github/workflows/ci.yml`)

- 在多个操作系统和 Node.js 版本上运行测试
- 代码质量检查
- 自动打包扩展

### 发布流程 (`.github/workflows/release.yml`)

- 当推送标签时自动触发
- 自动发布到 VSCode Marketplace
- 创建 GitHub Release

### 环境变量设置

在 GitHub 仓库设置中添加以下 Secrets：

- `VSCODE_MARKETPLACE_TOKEN`: VSCode Marketplace 发布令牌

## 项目结构

```
vscode-extension-custom-button/
├── .github/workflows/     # GitHub Actions 配置
├── scripts/              # 构建和发布脚本
│   ├── install-local.sh  # 本地安装脚本
│   └── release.sh        # 发布脚本
├── src/                  # 源代码
├── out/                  # 编译输出
├── public/               # 静态资源
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── .eslintrc.json        # ESLint 配置
└── README.md             # 项目说明
```

## 代码规范

### TypeScript

- 使用严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码

### Git 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
type(scope): description

feat(ui): add new button component
fix(core): resolve command execution issue
docs(readme): update installation guide
chore(deps): update dependencies
```

### 版本管理

遵循 [Semantic Versioning](https://semver.org/)：

- `MAJOR`: 不兼容的 API 变更
- `MINOR`: 向后兼容的功能新增
- `PATCH`: 向后兼容的问题修复

## 故障排除

### 常见问题

1. **编译错误**
   ```bash
   pnpm run clean
   pnpm install
   pnpm run compile
   ```

2. **扩展无法加载**
   - 检查 `package.json` 中的 `main` 字段
   - 确保 `out/extension.js` 文件存在

3. **发布失败**
   - 检查 `VSCE_PAT` 环境变量
   - 确保版本号格式正确
   - 检查网络连接

### 调试技巧

1. **使用 VSCode 调试器**
   - 设置断点
   - 查看变量值
   - 单步执行

2. **查看扩展日志**
   - 打开开发者工具
   - 查看控制台输出

3. **测试扩展功能**
   - 使用命令面板测试命令
   - 检查配置项是否正确

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 创建 Pull Request

请确保：
- 代码通过所有测试
- 遵循代码规范
- 更新相关文档 