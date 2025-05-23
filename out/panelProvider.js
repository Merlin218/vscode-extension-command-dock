"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomButtonItem = exports.CustomButtonPanelProvider = void 0;
const vscode = require("vscode");
const configManager_1 = require("./configManager");
class CustomButtonPanelProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        // 监听配置变化
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('customButton.buttons')) {
                this.refresh();
            }
        });
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            // 根级别：显示工作区分组
            return Promise.resolve(this.getWorkspaceGroups());
        }
        else if (element.contextValue === 'workspace') {
            // 工作区级别：显示该工作区的按钮
            return Promise.resolve(this.getButtonsForWorkspace(element.workspacePath));
        }
        return Promise.resolve([]);
    }
    getWorkspaceGroups() {
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
            return new CustomButtonItem(folder.name, `${buttonCount} buttons`, vscode.TreeItemCollapsibleState.Expanded, 'workspace', undefined, folder.uri.fsPath);
        });
    }
    getButtonsForWorkspace(workspacePath) {
        const buttons = configManager_1.ConfigManager.getButtons();
        if (buttons.length === 0) {
            return [new CustomButtonItem('No buttons configured', 'Click + to add a button', vscode.TreeItemCollapsibleState.None, 'empty')];
        }
        return buttons.map(button => {
            const item = new CustomButtonItem(button.name, button.command, vscode.TreeItemCollapsibleState.None, 'customButton', button);
            // 设置图标
            if (button.icon) {
                item.iconPath = new vscode.ThemeIcon(button.icon);
            }
            else {
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
    getButtonCountForWorkspace(workspacePath) {
        // 目前所有按钮都是全局的，后续可以扩展为工作区特定
        return configManager_1.ConfigManager.getButtons().length;
    }
}
exports.CustomButtonPanelProvider = CustomButtonPanelProvider;
class CustomButtonItem extends vscode.TreeItem {
    constructor(label, description, collapsibleState, contextValue, button, workspacePath) {
        super(label, collapsibleState);
        this.label = label;
        this.description = description;
        this.collapsibleState = collapsibleState;
        this.contextValue = contextValue;
        this.button = button;
        this.workspacePath = workspacePath;
        this.description = description;
        this.contextValue = contextValue;
        if (contextValue === 'customButton') {
            this.tooltip = `${this.label}\nCommand: ${this.description}\nClick to execute`;
        }
        else if (contextValue === 'workspace') {
            this.tooltip = `Workspace: ${this.label}`;
        }
    }
}
exports.CustomButtonItem = CustomButtonItem;
//# sourceMappingURL=panelProvider.js.map