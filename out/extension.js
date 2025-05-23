"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const buttonManager_1 = require("./buttonManager");
const uiHandler_1 = require("./uiHandler");
const panelProvider_1 = require("./panelProvider");
const panelCommands_1 = require("./panelCommands");
/**
 * 插件激活函数
 */
function activate(context) {
    console.log('Command Dock 插件已激活');
    // 初始化按钮
    buttonManager_1.ButtonManager.initializeButtons();
    // 创建面板提供者
    const panelProvider = new panelProvider_1.CustomButtonPanelProvider();
    // 注册树视图
    const treeView = vscode.window.createTreeView('customButtonPanel', {
        treeDataProvider: panelProvider,
        showCollapseAll: true
    });
    // 创建面板命令处理器
    const panelCommands = new panelCommands_1.PanelCommands(panelProvider);
    // 注册面板相关命令
    panelCommands.registerCommands(context);
    // 注册传统命令：添加按钮
    const addButtonCommand = vscode.commands.registerCommand('customButton.addButton', async () => {
        await uiHandler_1.UIHandler.showAddButtonDialog();
        panelProvider.refresh(); // 刷新面板
    });
    // 注册传统命令：删除按钮
    const removeButtonCommand = vscode.commands.registerCommand('customButton.removeButton', async () => {
        await uiHandler_1.UIHandler.showRemoveButtonDialog();
        panelProvider.refresh(); // 刷新面板
    });
    // 注册传统命令：编辑按钮
    const editButtonCommand = vscode.commands.registerCommand('customButton.editButton', async () => {
        await uiHandler_1.UIHandler.showEditButtonDialog();
        panelProvider.refresh(); // 刷新面板
    });
    // 注册命令：执行按钮
    const executeButtonCommand = vscode.commands.registerCommand('customButton.execute', (button) => {
        buttonManager_1.ButtonManager.executeButtonCommand(button);
    });
    // 监听配置变化
    const configChangeListener = vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('customButton.buttons')) {
            // 重新初始化按钮
            buttonManager_1.ButtonManager.initializeButtons();
            // 面板会自动刷新（在 panelProvider 中监听）
        }
    });
    // 监听工作区变化
    const workspaceChangeListener = vscode.workspace.onDidChangeWorkspaceFolders(() => {
        panelProvider.refresh();
    });
    // 将所有订阅添加到上下文中
    context.subscriptions.push(treeView, addButtonCommand, removeButtonCommand, editButtonCommand, executeButtonCommand, configChangeListener, workspaceChangeListener);
    // 显示激活消息
    vscode.window.showInformationMessage('Command Dock 插件已就绪！面板已在资源管理器中显示。');
}
exports.activate = activate;
/**
 * 插件停用函数
 */
function deactivate() {
    console.log('Command Dock 插件已停用');
    // 清理资源
    buttonManager_1.ButtonManager.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map