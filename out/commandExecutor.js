"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
const vscode = require("vscode");
class CommandExecutor {
    /**
     * 在终端中执行命令
     */
    static async executeCommand(command, buttonName) {
        try {
            // 获取当前工作区路径
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder found');
                return;
            }
            // 创建或获取终端
            const terminal = this.getOrCreateTerminal(buttonName);
            // 确保终端在正确的工作目录
            terminal.sendText(`cd "${workspaceFolder.uri.fsPath}"`);
            // 执行命令
            terminal.sendText(command);
            // 显示终端
            terminal.show();
            vscode.window.showInformationMessage(`Executed: ${command}`);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Failed to execute command: ${errorMessage}`);
        }
    }
    /**
     * 获取或创建专用终端
     */
    static getOrCreateTerminal(buttonName) {
        const terminalName = `Custom Button: ${buttonName}`;
        // 查找是否已存在同名终端
        const existingTerminal = vscode.window.terminals.find(terminal => terminal.name === terminalName);
        if (existingTerminal) {
            return existingTerminal;
        }
        // 创建新终端
        return vscode.window.createTerminal({
            name: terminalName,
            cwd: vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
        });
    }
    /**
     * 清理所有自定义按钮终端
     */
    static disposeAllCustomTerminals() {
        vscode.window.terminals
            .filter(terminal => terminal.name.startsWith('Custom Button:'))
            .forEach(terminal => terminal.dispose());
    }
}
exports.CommandExecutor = CommandExecutor;
//# sourceMappingURL=commandExecutor.js.map