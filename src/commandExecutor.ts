import * as vscode from 'vscode';

export class CommandExecutor {
  /**
   * 在终端中执行命令
   */
  public static async executeCommand(command: string, buttonName: string): Promise<void> {
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
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`Failed to execute command: ${errorMessage}`);
    }
  }

  /**
   * 获取或创建专用终端
   */
  private static getOrCreateTerminal(buttonName: string): vscode.Terminal {
    const terminalName = `Custom Button: ${buttonName}`;
    
    // 查找是否已存在同名终端
    const existingTerminal = vscode.window.terminals.find(
      terminal => terminal.name === terminalName
    );
    
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
  public static disposeAllCustomTerminals(): void {
    vscode.window.terminals
      .filter(terminal => terminal.name.startsWith('Custom Button:'))
      .forEach(terminal => terminal.dispose());
  }
} 