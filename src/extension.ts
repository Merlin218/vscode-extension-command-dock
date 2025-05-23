import * as vscode from 'vscode';
import { CustomButton } from './types';
import { ButtonManager } from './buttonManager';
import { UIHandler } from './uiHandler';
import { CustomButtonPanelProvider } from './panelProvider';
import { PanelCommands } from './panelCommands';

/**
 * 插件激活函数
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Command Dock 插件已激活');

  // 初始化按钮
  ButtonManager.initializeButtons();

  // 创建面板提供者
  const panelProvider = new CustomButtonPanelProvider();
  
  // 注册树视图
  const treeView = vscode.window.createTreeView('customButtonPanel', {
    treeDataProvider: panelProvider,
    showCollapseAll: true
  });

  // 创建面板命令处理器
  const panelCommands = new PanelCommands(panelProvider);

  // 注册面板相关命令
  panelCommands.registerCommands(context);

  // 注册传统命令：添加按钮
  const addButtonCommand = vscode.commands.registerCommand(
    'customButton.addButton',
    async () => {
      await UIHandler.showAddButtonDialog();
      panelProvider.refresh(); // 刷新面板
    }
  );

  // 注册传统命令：删除按钮
  const removeButtonCommand = vscode.commands.registerCommand(
    'customButton.removeButton',
    async () => {
      await UIHandler.showRemoveButtonDialog();
      panelProvider.refresh(); // 刷新面板
    }
  );

  // 注册传统命令：编辑按钮
  const editButtonCommand = vscode.commands.registerCommand(
    'customButton.editButton',
    async () => {
      await UIHandler.showEditButtonDialog();
      panelProvider.refresh(); // 刷新面板
    }
  );

  // 注册命令：执行按钮
  const executeButtonCommand = vscode.commands.registerCommand(
    'customButton.execute',
    (button: CustomButton) => {
      ButtonManager.executeButtonCommand(button);
    }
  );

  // 监听配置变化
  const configChangeListener = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration('customButton.buttons')) {
      // 重新初始化按钮
      ButtonManager.initializeButtons();
      // 面板会自动刷新（在 panelProvider 中监听）
    }
  });

  // 监听工作区变化
  const workspaceChangeListener = vscode.workspace.onDidChangeWorkspaceFolders(() => {
    panelProvider.refresh();
  });

  // 将所有订阅添加到上下文中
  context.subscriptions.push(
    treeView,
    addButtonCommand,
    removeButtonCommand,
    editButtonCommand,
    executeButtonCommand,
    configChangeListener,
    workspaceChangeListener
  );

  // 显示激活消息
  vscode.window.showInformationMessage('Command Dock 插件已就绪！面板已在资源管理器中显示。');
}

/**
 * 插件停用函数
 */
export function deactivate() {
  console.log('Command Dock 插件已停用');
  
  // 清理资源
  ButtonManager.dispose();
} 