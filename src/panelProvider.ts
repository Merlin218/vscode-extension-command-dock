import * as vscode from 'vscode';
import { CommandDockButton } from './types';
import { ConfigManager } from './configManager';

export class CommandDockPanelProvider implements vscode.TreeDataProvider<CommandDockItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<CommandDockItem | undefined | null | void> = new vscode.EventEmitter<CommandDockItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<CommandDockItem | undefined | null | void> = this._onDidChangeTreeData.event;

  constructor() {
    // 监听配置变化
    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('commandDock.buttons')) {
        this.refresh();
      }
    });
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: CommandDockItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: CommandDockItem): Thenable<CommandDockItem[]> {
    if (!element) {
      // 根级别：显示工作区分组
      return Promise.resolve(this.getWorkspaceGroups());
    } else if (element.contextValue === 'workspace') {
      // 工作区级别：显示该工作区的按钮
      return Promise.resolve(this.getButtonsForWorkspace(element.workspacePath!));
    }
    return Promise.resolve([]);
  }

  private getWorkspaceGroups(): CommandDockItem[] {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      return [];
    }

    if (workspaceFolders.length === 1) {
      // 单工作区：直接显示按钮列表
      return this.getButtonsForWorkspace(workspaceFolders[0].uri.fsPath);
    }

    // 多工作区：显示工作区分组
    return workspaceFolders.map(folder => {
      const buttonCount = this.getButtonCountForWorkspace(folder.uri.fsPath);
      return new CommandDockItem(
        folder.name,
        `${buttonCount} buttons`,
        vscode.TreeItemCollapsibleState.Expanded,
        'workspace',
        undefined,
        folder.uri.fsPath
      );
    });
  }

  private getButtonsForWorkspace(workspacePath: string): CommandDockItem[] {
    const buttons = ConfigManager.getButtons();
    
    if (buttons.length === 0) {
      return [new CommandDockItem(
        'No buttons configured',
        'Click + to add a button',
        vscode.TreeItemCollapsibleState.None,
        'empty'
      )];
    }

    return buttons.map(button => {
      const item = new CommandDockItem(
        button.name,
        button.command,
        vscode.TreeItemCollapsibleState.None,
        'commandDockButton',
        button
      );

      // 设置图标
      if (button.icon) {
        item.iconPath = new vscode.ThemeIcon(button.icon);
      } else {
        item.iconPath = new vscode.ThemeIcon('terminal');
      }

      // 设置命令
      item.command = {
        command: 'commandDock.executeFromPanel',
        title: 'Execute',
        arguments: [button]
      };

      return item;
    });
  }

  private getButtonCountForWorkspace(workspacePath: string): number {
    // 目前所有按钮都是全局的，后续可以扩展为工作区特定
    return ConfigManager.getButtons().length;
  }
}

export class CommandDockItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly description: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly contextValue: string,
    public readonly button?: CommandDockButton,
    public readonly workspacePath?: string
  ) {
    super(label, collapsibleState);
    this.description = description;
    this.contextValue = contextValue;
    
    if (contextValue === 'commandDockButton') {
      this.tooltip = `${this.label}\nCommand: ${this.description}\nClick to execute`;
    } else if (contextValue === 'workspace') {
      this.tooltip = `Workspace: ${this.label}`;
    }
  }
} 