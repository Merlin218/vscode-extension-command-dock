import * as vscode from "vscode";
import { CommandDockButton } from "./types";
import { ButtonManager } from "./buttonManager";
import { UIHandler } from "./uiHandler";
import { CommandDockPanelProvider } from "./panelProvider";
import { PanelCommands } from "./panelCommands";

const COMMAND_DOCK_VIEW_IDS = [
  "commandDockPanelExplorer",
  "commandDockPanelScm",
];

/**
 * 插件激活函数
 */
export function activate(context: vscode.ExtensionContext) {
  console.log("Command Dock 插件已激活");

  // 初始化按钮
  ButtonManager.initializeButtons();

  // 创建面板提供者
  const panelProvider = new CommandDockPanelProvider();

  // 注册树视图
  const treeViews = COMMAND_DOCK_VIEW_IDS.map((viewId) =>
    vscode.window.createTreeView(viewId, {
      treeDataProvider: panelProvider,
      showCollapseAll: true,
    }),
  );

  // 创建面板命令处理器
  const panelCommands = new PanelCommands(panelProvider);

  // 注册面板相关命令
  panelCommands.registerCommands(context);

  // 注册传统命令：添加按钮
  const addButtonCommand = vscode.commands.registerCommand(
    "commandDock.addButton",
    async () => {
      await UIHandler.showAddButtonDialog();
      panelProvider.refresh(); // 刷新面板
    },
  );

  // 注册传统命令：删除按钮
  const removeButtonCommand = vscode.commands.registerCommand(
    "commandDock.removeButton",
    async () => {
      await UIHandler.showRemoveButtonDialog();
      panelProvider.refresh(); // 刷新面板
    },
  );

  // 注册传统命令：编辑按钮
  const editButtonCommand = vscode.commands.registerCommand(
    "commandDock.editButton",
    async () => {
      await UIHandler.showEditButtonDialog();
      panelProvider.refresh(); // 刷新面板
    },
  );

  // 注册命令：执行按钮
  const executeButtonCommand = vscode.commands.registerCommand(
    "commandDock.execute",
    (button: CommandDockButton) => {
      ButtonManager.executeButtonCommand(button);
    },
  );

  // 注册命令：打开设置
  const openSettingsCommand = vscode.commands.registerCommand(
    "commandDock.openSettings",
    () => {
      vscode.commands.executeCommand(
        "workbench.action.openSettings",
        "commandDock",
      );
    },
  );

  // 监听配置变化
  const configChangeListener = vscode.workspace.onDidChangeConfiguration(
    (event) => {
      if (event.affectsConfiguration("commandDock.buttons")) {
        // 重新初始化按钮
        ButtonManager.initializeButtons();
        // 面板会自动刷新（在 panelProvider 中监听）
      }

      if (event.affectsConfiguration("commandDock.panelLocation")) {
        // 当面板位置配置改变时，显示重启提示
        vscode.window
          .showInformationMessage(
            "面板位置配置已更改，请重新加载窗口以应用更改。",
            "重新加载",
          )
          .then((selection) => {
            if (selection === "重新加载") {
              vscode.commands.executeCommand("workbench.action.reloadWindow");
            }
          });
      }
    },
  );

  // 监听工作区变化
  const workspaceChangeListener = vscode.workspace.onDidChangeWorkspaceFolders(
    () => {
      panelProvider.refresh();
    },
  );

  // 将所有订阅添加到上下文中
  context.subscriptions.push(
    ...treeViews,
    addButtonCommand,
    removeButtonCommand,
    editButtonCommand,
    executeButtonCommand,
    openSettingsCommand,
    configChangeListener,
    workspaceChangeListener,
  );

  // 显示激活消息
  const panelLocation = vscode.workspace
    .getConfiguration()
    .get<string>("commandDock.panelLocation", "explorer");
  const panelLocationName =
    panelLocation === "scm" ? "源代码管理" : "资源管理器";
  vscode.window.showInformationMessage(
    `Command Dock 插件已就绪！面板已在${panelLocationName}中显示。`,
  );
}

/**
 * 插件停用函数
 */
export function deactivate() {
  console.log("Command Dock 插件已停用");

  // 清理资源
  ButtonManager.dispose();
}
