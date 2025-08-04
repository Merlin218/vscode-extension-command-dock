import * as vscode from 'vscode';

export class CommandExecutor {
  private static terminalExitListeners: Map<string, vscode.Disposable> = new Map();

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

      // 获取配置
      const config = vscode.workspace.getConfiguration('commandDock');
      const autoCloseTerminal = config.get<boolean>('autoCloseTerminal', false);

      // 创建或获取终端
      const terminal = this.getOrCreateTerminal(buttonName);
      
      // 如果启用了自动关闭，设置监听器
      if (autoCloseTerminal) {
        this.setupAutoCloseListener(terminal, buttonName);
      }
      
      // 确保终端在正确的工作目录
      terminal.sendText(`cd "${workspaceFolder.uri.fsPath}"`);
      
      // 执行命令，如果启用自动关闭，在命令后添加 exit
      if (autoCloseTerminal) {
        terminal.sendText(`${command} && exit || exit`);
      } else {
        terminal.sendText(command);
      }
      
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
    const terminalName = `Command Dock: ${buttonName}`;
    
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
   * 设置自动关闭监听器
   */
  private static setupAutoCloseListener(terminal: vscode.Terminal, buttonName: string): void {
    const terminalKey = `Command Dock: ${buttonName}`;
    
    // 移除已存在的监听器
    const existingListener = this.terminalExitListeners.get(terminalKey);
    if (existingListener) {
      existingListener.dispose();
    }

    // 创建新的监听器
    const exitListener = vscode.window.onDidCloseTerminal((closedTerminal) => {
      if (closedTerminal.name === terminalKey) {
        // 清理监听器
        this.terminalExitListeners.delete(terminalKey);
        exitListener.dispose();
      }
    });

    // 存储监听器引用
    this.terminalExitListeners.set(terminalKey, exitListener);
  }

  /**
   * 清理所有自定义按钮终端
   */
  public static disposeAllCustomTerminals(): void {
    // 清理所有监听器
    this.terminalExitListeners.forEach((listener) => {
      listener.dispose();
    });
    this.terminalExitListeners.clear();

    // 清理所有自定义终端
    vscode.window.terminals
      .filter(terminal => terminal.name.startsWith('Command Dock:'))
      .forEach(terminal => terminal.dispose());
  }
} 