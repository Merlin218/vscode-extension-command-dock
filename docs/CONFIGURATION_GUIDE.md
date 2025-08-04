# Command Dock 配置指南

## 新增功能

### 1. 自动关闭终端

**功能描述**: 命令执行完成后，自动关闭打开的终端窗口。

**配置方法**:
1. 打开 VS Code 设置 (Ctrl/Cmd + ,)
2. 搜索 "commandDock.autoCloseTerminal"
3. 勾选复选框启用此功能

**或者在 settings.json 中添加**:
```json
{
  "commandDock.autoCloseTerminal": true
}
```

**默认值**: `false` (关闭)

---

### 2. 面板位置配置

**功能描述**: 自定义命令面板的显示位置，可以选择在资源管理器面板或源代码管理面板中显示。

**配置方法**:
1. 打开 VS Code 设置 (Ctrl/Cmd + ,)
2. 搜索 "commandDock.panelLocation"
3. 选择面板位置：
   - `explorer`: 显示在资源管理器面板 (默认)
   - `scm`: 显示在源代码管理面板

**或者在 settings.json 中添加**:
```json
{
  "commandDock.panelLocation": "scm"
}
```

**注意**: 更改面板位置后需要重新加载 VS Code 窗口才能生效。插件会自动提示您进行重新加载。

---

## 快速设置

在命令面板中可以看到一个齿轮图标，点击即可快速打开 Command Dock 相关设置。

## 配置示例

完整的配置示例：

```json
{
  "commandDock.buttons": [
    {
      "id": "build",
      "name": "Build",
      "command": "npm run build",
      "icon": "gear",
      "color": "#00ff00"
    },
    {
      "id": "test",
      "name": "Test",
      "command": "npm test",
      "icon": "check",
      "color": "#0000ff"
    }
  ],
  "commandDock.autoCloseTerminal": true,
  "commandDock.panelLocation": "scm"
}
```

这个配置将：
- 创建两个自定义按钮
- 启用命令执行后自动关闭终端
- 将命令面板显示在源代码管理面板中