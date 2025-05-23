import * as vscode from 'vscode';
import { CustomButton } from './types';
import { CommandExecutor } from './commandExecutor';

export class ButtonManager {
  private static statusBarItems: Map<string, vscode.StatusBarItem> = new Map();

  /**
   * 初始化所有按钮
   */
  public static initializeButtons(): void {
    this.clearAllButtons();
    const buttons = vscode.workspace.getConfiguration().get<CustomButton[]>('customButton.buttons', []);
    
    buttons.forEach(button => {
      this.createButton(button);
    });
  }

  /**
   * 创建状态栏按钮
   */
  public static createButton(button: CustomButton): void {
    const statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );

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
  public static updateButton(button: CustomButton): void {
    this.removeButton(button.id);
    this.createButton(button);
  }

  /**
   * 移除指定按钮
   */
  public static removeButton(buttonId: string): void {
    const statusBarItem = this.statusBarItems.get(buttonId);
    if (statusBarItem) {
      statusBarItem.dispose();
      this.statusBarItems.delete(buttonId);
    }
  }

  /**
   * 清理所有按钮
   */
  public static clearAllButtons(): void {
    this.statusBarItems.forEach(item => item.dispose());
    this.statusBarItems.clear();
  }

  /**
   * 执行按钮命令
   */
  public static async executeButtonCommand(button: CustomButton): Promise<void> {
    await CommandExecutor.executeCommand(button.command, button.name);
  }

  /**
   * 释放资源
   */
  public static dispose(): void {
    this.clearAllButtons();
    CommandExecutor.disposeAllCustomTerminals();
  }
} 