# Breaking Changes - v1.0.0

## 重大更改：全局命名统一为 commandDock

为了保持代码的一致性和可读性，我们将所有的 `customButton` 命名更改为 `commandDock`。

### 📋 更改清单

#### 1. 配置键名更改

**旧配置键名 → 新配置键名**
- `customButton.buttons` → `commandDock.buttons`
- `customButton.autoCloseTerminal` → `commandDock.autoCloseTerminal` 
- `customButton.panelLocation` → `commandDock.panelLocation`

#### 2. 命令名称更改

**旧命令名 → 新命令名**
- `customButton.addButton` → `commandDock.addButton`
- `customButton.removeButton` → `commandDock.removeButton`
- `customButton.editButton` → `commandDock.editButton`
- `customButton.refreshPanel` → `commandDock.refreshPanel`
- `customButton.executeFromPanel` → `commandDock.executeFromPanel`
- `customButton.addButtonFromPanel` → `commandDock.addButtonFromPanel`
- `customButton.editButtonFromPanel` → `commandDock.editButtonFromPanel`
- `customButton.removeButtonFromPanel` → `commandDock.removeButtonFromPanel`
- `customButton.execute` → `commandDock.execute`
- `customButton.openSettings` → `commandDock.openSettings`

#### 3. 视图和面板 ID 更改

**旧 ID → 新 ID**
- `customButtonPanel` → `commandDockPanel`
- `customButton` (viewItem) → `commandDockButton`

#### 4. 代码接口更改

**TypeScript 接口更改**
- `CustomButton` → `CommandDockButton` (保留了类型别名以实现向后兼容)
- `CustomButtonPanelProvider` → `CommandDockPanelProvider`
- `CustomButtonItem` → `CommandDockItem`

#### 5. 终端名称更改

**终端显示名称**
- `Custom Button: {buttonName}` → `Command Dock: {buttonName}`

### 🔄 迁移指南

#### 自动迁移

由于 VSCode 配置的向后兼容性，大部分更改将自动生效。但建议您手动更新配置以确保最佳体验。

#### 手动迁移步骤

1. **更新 settings.json 配置**
   
   将现有配置：
   ```json
   {
     "customButton.buttons": [...],
     "customButton.autoCloseTerminal": true,
     "customButton.panelLocation": "scm"
   }
   ```
   
   更改为：
   ```json
   {
     "commandDock.buttons": [...],
     "commandDock.autoCloseTerminal": true,
     "commandDock.panelLocation": "scm"
   }
   ```

2. **更新自定义键绑定**
   
   如果您在 `keybindings.json` 中定义了自定义快捷键，请将命令名称从 `customButton.*` 更新为 `commandDock.*`。

3. **更新扩展设置**
   
   在 VS Code 设置界面中搜索 "commandDock" 而不是 "customButton"。

### ⚠️ 注意事项

1. **配置兼容性**：旧的 `customButton.*` 配置仍然可以工作，但建议更新为新的命名。

2. **命令面板**：在命令面板中搜索命令时，请使用 "Command Dock" 而不是 "Custom Button"。

3. **扩展卸载**：如果需要完全卸载扩展，请使用新的命令：
   ```bash
   code --uninstall-extension CommandDock.command-dock
   ```

### 🚀 新功能提醒

除了命名更改，此版本还包含以下新功能：

1. **自动关闭终端**：命令执行完毕后可自动关闭终端窗口
2. **面板位置配置**：可将命令面板显示在源代码管理面板中
3. **快速设置访问**：新增设置齿轮图标，快速访问相关配置

### 📞 支持

如果在迁移过程中遇到问题，请：

1. 查看 [配置指南](CONFIGURATION_GUIDE.md)
2. 参考 [使用示例](EXAMPLES.md)
3. 提交 [GitHub Issue](https://github.com/Merlin218/vscode-extension-command-dock/issues)

---

**发布日期**：2024年1月

**向后兼容性**：保留了类型别名，但建议更新到新命名