# Command Dock

一个强大的 VSCode/Cursor 插件，允许您创建自定义按钮来执行终端命令。提供直观的面板管理界面和状态栏快捷按钮。

## 功能特性

- ✨ **独立面板管理** - 在资源管理器中显示专用的按钮管理面板
- 🚀 **一键执行命令** - 直接在面板中点击按钮执行终端命令
- ⚙️ **基于工作区** - 按钮列表根据工作区组织（支持多工作区）
- 🎨 **自定义样式** - 支持自定义按钮图标和颜色
- 📝 **便捷管理** - 面板内直接添加、编辑、删除按钮
- 💾 **配置持久化** - 配置保存在工作区设置中
- 🔄 **实时同步** - 状态栏按钮与面板同步显示

## 界面说明

### 主要操作区域

1. **自定义按钮面板**（资源管理器侧栏）
   - 显示按钮列表
   - 提供管理操作（添加、编辑、删除）
   - 支持工作区分组

2. **状态栏按钮**（编辑器底部）
   - 快速执行常用命令
   - 与面板内容同步

## 使用方法

### 🎯 面板操作（推荐）

#### 1. 打开面板
- 在资源管理器侧栏找到 "Custom Buttons" 面板
- 如果没有显示，确保已打开工作区文件夹

#### 2. 添加按钮
- 点击面板标题栏的 `+` 按钮
- 或右键面板空白区域选择 "Add Button"
- 按提示填写：
  - **按钮名称**（必填）：如 "🚀 Dev Server"
  - **执行命令**（必填）：如 "npm run dev"
  - **图标名称**（可选）：如 "play", "gear", "terminal"
  - **按钮颜色**（可选）：选择预设颜色

#### 3. 使用按钮
- **方式一**：直接点击面板中的按钮名称
- **方式二**：点击状态栏中的对应按钮
- **方式三**：右键按钮选择 "Execute Command"

#### 4. 管理按钮
- **编辑**：右键按钮 → "Edit Button" 或点击编辑图标
- **删除**：右键按钮 → "Remove Button" 或点击删除图标
- **刷新**：点击面板标题栏的刷新按钮

### 📋 传统命令操作

也可以通过命令面板使用：

1. **添加按钮**：`Cmd+Shift+P` → `Custom Button: Add Custom Button`
2. **编辑按钮**：`Cmd+Shift+P` → `Custom Button: Edit Custom Button`
3. **删除按钮**：`Cmd+Shift+P` → `Custom Button: Remove Custom Button`

## 💡 实用示例

### 前端开发工作流

```json
{
  "customButton.buttons": [
    {
      "id": "dev-server",
      "name": "🚀 Dev Server",
      "command": "npm run dev",
      "icon": "play",
      "color": "#00ff00"
    },
    {
      "id": "build-project",
      "name": "🔨 Build",
      "command": "npm run build",
      "icon": "gear",
      "color": "#0000ff"
    },
    {
      "id": "run-tests",
      "name": "🧪 Test",
      "command": "npm test",
      "icon": "beaker",
      "color": "#ffff00"
    },
    {
      "id": "install-deps",
      "name": "📦 Install",
      "command": "npm install",
      "icon": "package",
      "color": "#ffa500"
    }
  ]
}
```

### Git 操作快捷键

```json
{
  "customButton.buttons": [
    {
      "id": "git-status",
      "name": "📊 Status",
      "command": "git status",
      "icon": "git-branch"
    },
    {
      "id": "git-pull",
      "name": "⬇️ Pull",
      "command": "git pull",
      "icon": "arrow-down"
    },
    {
      "id": "git-push",
      "name": "⬆️ Push",
      "command": "git push",
      "icon": "arrow-up"
    }
  ]
}
```

### Docker 容器管理

```json
{
  "customButton.buttons": [
    {
      "id": "docker-up",
      "name": "🐳 Up",
      "command": "docker-compose up -d",
      "icon": "triangle-up",
      "color": "#0000ff"
    },
    {
      "id": "docker-down",
      "name": "🛑 Down",
      "command": "docker-compose down",
      "icon": "triangle-down",
      "color": "#ff0000"
    },
    {
      "id": "docker-logs",
      "name": "📋 Logs",
      "command": "docker-compose logs -f",
      "icon": "output"
    }
  ]
}
```

## 技术架构

插件采用模块化设计，遵循SOLID原则：

- `types.ts` - 类型定义
- `configManager.ts` - 配置管理
- `commandExecutor.ts` - 命令执行器
- `buttonManager.ts` - 状态栏按钮管理器
- `panelProvider.ts` - 面板数据提供者
- `panelCommands.ts` - 面板命令处理器
- `uiHandler.ts` - 用户界面处理
- `extension.ts` - 主入口文件

## 多工作区支持

- **单工作区**：直接显示按钮列表
- **多工作区**：按工作区分组显示，每个工作区可以有独立的按钮配置

## 开发和构建

```bash
# 安装依赖
pnpm install

# 编译TypeScript
pnpm run compile

# 监听文件变化
pnpm run watch

# 代码检查
pnpm run lint

# 自动修复代码问题
pnpm run lint:fix
```

## 调试插件

1. 在 VSCode/Cursor 中打开项目
2. 按 `F5` 启动调试
3. 在新的扩展宿主窗口中测试功能

## 配置说明

按钮配置保存在工作区的 `.vscode/settings.json` 文件中：

```json
{
  "customButton.buttons": [
    {
      "id": "unique-id",
      "name": "Build Project",
      "command": "npm run build",
      "icon": "gear",
      "color": "#00ff00"
    }
  ]
}
```

## 常见图标

常用的 VSCode 图标名称：

- `play` - 播放按钮 ▶️
- `gear` - 设置齿轮 ⚙️
- `terminal` - 终端 💻
- `package` - 包 📦
- `git-branch` - Git分支 🌿
- `beaker` - 试管 🧪
- `rocket` - 火箭 🚀
- `tools` - 工具 🔧

更多图标请参考：[VSCode Icons](https://code.visualstudio.com/api/references/icons-in-labels)

## 许可证

MIT License 