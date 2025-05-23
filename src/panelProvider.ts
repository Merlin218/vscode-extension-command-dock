import * as vscode from 'vscode';
import { CustomButton } from './types';
import { ConfigManager } from './configManager';

export class CustomButtonPanelProvider implements vscode.TreeDataProvider<CustomButtonItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<CustomButtonItem | undefined | null | void> = new vscode.EventEmitter<CustomButtonItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<CustomButtonItem | undefined | null | void> = this._onDidChangeTreeData.event;

  constructor() {
    // 监听配置变化
    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('customButton.buttons')) {
        this.refresh();
      }
    });
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: CustomButtonItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: CustomButtonItem): Thenable<CustomButtonItem[]> {
    if (!element) {
      // 根级别：显示工作区分组
      return Promise.resolve(this.getWorkspaceGroups());
    } else if (element.contextValue === 'workspace') {
      // 工作区级别：显示该工作区的按钮
      return Promise.resolve(this.getButtonsForWorkspace(element.workspacePath!));
    }
    return Promise.resolve([]);
  }

  private getWorkspaceGroups(): CustomButtonItem[] {
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
      return new CustomButtonItem(
        folder.name,
        `${buttonCount} buttons`,
        vscode.TreeItemCollapsibleState.Expanded,
        'workspace',
        undefined,
        folder.uri.fsPath
      );
    });
  }

  private getButtonsForWorkspace(workspacePath: string): CustomButtonItem[] {
    const buttons = ConfigManager.getButtons();
    
    if (buttons.length === 0) {
      return [new CustomButtonItem(
        'No buttons configured',
        'Click + to add a button',
        vscode.TreeItemCollapsibleState.None,
        'empty'
      )];
    }

    return buttons.map(button => {
      const item = new CustomButtonItem(
        button.name,
        button.command,
        vscode.TreeItemCollapsibleState.None,
        'customButton',
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
        command: 'customButton.executeFromPanel',
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

export class CustomButtonItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly description: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly contextValue: string,
    public readonly button?: CustomButton,
    public readonly workspacePath?: string
  ) {
    super(label, collapsibleState);
    this.description = description;
    this.contextValue = contextValue;
    
    if (contextValue === 'customButton') {
      this.tooltip = `${this.label}\nCommand: ${this.description}\nClick to execute`;
    } else if (contextValue === 'workspace') {
      this.tooltip = `Workspace: ${this.label}`;
    }
  }
} 