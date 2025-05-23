"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonManager = void 0;
const vscode = require("vscode");
const commandExecutor_1 = require("./commandExecutor");
class ButtonManager {
    /**
     * 初始化所有按钮
     */
    static initializeButtons() {
        this.clearAllButtons();
        const buttons = vscode.workspace.getConfiguration().get('customButton.buttons', []);
        buttons.forEach(button => {
            this.createButton(button);
        });
    }
    /**
     * 创建状态栏按钮
     */
    static createButton(button) {
        const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        // 设置按钮文本和图标
        const icon = button.icon ? `$(${button.icon})` : '$(play)';
        statusBarItem.text = `${icon} ${button.name}`;
        // 设置颜色
        if (button.color) {
            statusBarItem.color = button.color;
        }
        // 设置点击命令
        statusBarItem.command = {
            command: 'customButton.execute',
            title: button.name,
            arguments: [button]
        };
        // 设置提示
        statusBarItem.tooltip = `Execute: ${button.command}`;
        // 显示按钮
        statusBarItem.show();
        // 存储按钮引用
        this.statusBarItems.set(button.id, statusBarItem);
    }
    /**
     * 更新按钮
     */
    static updateButton(button) {
        this.removeButton(button.id);
        this.createButton(button);
    }
    /**
     * 移除指定按钮
     */
    static removeButton(buttonId) {
        const statusBarItem = this.statusBarItems.get(buttonId);
        if (statusBarItem) {
            statusBarItem.dispose();
            this.statusBarItems.delete(buttonId);
        }
    }
    /**
     * 清理所有按钮
     */
    static clearAllButtons() {
        this.statusBarItems.forEach(item => item.dispose());
        this.statusBarItems.clear();
    }
    /**
     * 执行按钮命令
     */
    static async executeButtonCommand(button) {
        await commandExecutor_1.CommandExecutor.executeCommand(button.command, button.name);
    }
    /**
     * 释放资源
     */
    static dispose() {
        this.clearAllButtons();
        commandExecutor_1.CommandExecutor.disposeAllCustomTerminals();
    }
}
exports.ButtonManager = ButtonManager;
ButtonManager.statusBarItems = new Map();
//# sourceMappingURL=buttonManager.js.map