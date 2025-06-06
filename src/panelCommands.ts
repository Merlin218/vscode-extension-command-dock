import * as vscode from 'vscode';
import { CustomButton } from './types';
import { CustomButtonPanelProvider, CustomButtonItem } from './panelProvider';
import { ButtonManager } from './buttonManager';
import { UIHandler } from './uiHandler';
import { ConfigManager } from './configManager';

export class PanelCommands {
  constructor(
    private panelProvider: CustomButtonPanelProvider
  ) {}

  /**
   * 刷新面板
   */
  public refreshPanel(): void {
    this.panelProvider.refresh();
  }

  /**
   * 从面板执行按钮命令
   */
  public async executeFromPanel(button: CustomButton): Promise<void> {
    await ButtonManager.executeButtonCommand(button);
  }

  /**
   * 从面板添加按钮
   */
  public async addButtonFromPanel(): Promise<void> {
    try {
      await UIHandler.showAddButtonDialog();
      this.panelProvider.refresh();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`添加按钮失败: ${errorMessage}`);
    }
  }

  /**
   * 从面板编辑按钮
   */
  public async editButtonFromPanel(item: CustomButtonItem): Promise<void> {
    if (!item.button) {
      return;
    }

    try {
      const originalButton = item.button;

      // 编辑按钮名称
      const name = await vscode.window.showInputBox({
        prompt: '修改按钮名称',
        value: originalButton.name,
        validateInput: (value: string) => {
          if (!value || value.trim().length === 0) {
            return '按钮名称不能为空';
          }
          return null;
        }
      });

      if (!name) {
        return;
      }

      // 编辑命令
      const command = await vscode.window.showInputBox({
        prompt: '修改执行命令',
        value: originalButton.command,
        validateInput: (value: string) => {
          if (!value || value.trim().length === 0) {
            return '命令不能为空';
          }
          return null;
        }
      });

      if (!command) {
        return;
      }

      // 编辑图标
      const icon = await vscode.window.showInputBox({
        prompt: '修改图标名称（可选）',
        value: originalButton.icon || '',
      });

      // 编辑颜色
      const colorOptions = [
        { label: '默认', value: undefined },
        { label: '红色', value: '#ff0000' },
        { label: '绿色', value: '#00ff00' },
        { label: '蓝色', value: '#0000ff' },
        { label: '黄色', value: '#ffff00' },
        { label: '橙色', value: '#ffa500' },
        { label: '紫色', value: '#800080' }
      ];

      const selectedColor = await vscode.window.showQuickPick(colorOptions, {
        placeHolder: '选择按钮颜色（可选）'
      });

      // 更新按钮配置
      const updatedButton: CustomButton = {
        id: originalButton.id,
        name: name.trim(),
        command: command.trim(),
        icon: icon?.trim() || undefined,
        color: selectedColor?.value
      };

      // 保存配置
      await ConfigManager.updateButton(originalButton.id, updatedButton);
      
      // 更新按钮
      ButtonManager.updateButton(updatedButton);
      
      // 刷新面板
      this.panelProvider.refresh();

      vscode.window.showInformationMessage(`按钮 "${updatedButton.name}" 已更新`);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`编辑按钮失败: ${errorMessage}`);
    }
  }

  /**
   * 从面板删除按钮
   */
  public async removeButtonFromPanel(item: CustomButtonItem): Promise<void> {
    if (!item.button) {
      return;
    }

    try {
      const button = item.button;

      // 确认删除
      const confirmation = await vscode.window.showWarningMessage(
        `确定要删除按钮 "${button.name}" 吗？`,
        { modal: true },
        '删除'
      );

      if (confirmation === '删除') {
        await ConfigManager.removeButton(button.id);
        ButtonManager.removeButton(button.id);
        this.panelProvider.refresh();
        vscode.window.showInformationMessage(`按钮 "${button.name}" 已删除`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`删除按钮失败: ${errorMessage}`);
    }
  }

  /**
   * 注册所有面板相关命令
   */
  public registerCommands(context: vscode.ExtensionContext): void {
    // 刷新面板
    const refreshCommand = vscode.commands.registerCommand(
      'customButton.refreshPanel',
      () => this.refreshPanel()
    );

    // 从面板执行命令
    const executeCommand = vscode.commands.registerCommand(
      'customButton.executeFromPanel',
      (button: CustomButton) => this.executeFromPanel(button)
    );

    // 从面板添加按钮
    const addCommand = vscode.commands.registerCommand(
      'customButton.addButtonFromPanel',
      () => this.addButtonFromPanel()
    );

    // 从面板编辑按钮
    const editCommand = vscode.commands.registerCommand(
      'customButton.editButtonFromPanel',
      (item: CustomButtonItem) => this.editButtonFromPanel(item)
    );

    // 从面板删除按钮
    const removeCommand = vscode.commands.registerCommand(
      'customButton.removeButtonFromPanel',
      (item: CustomButtonItem) => this.removeButtonFromPanel(item)
    );

    // 添加到订阅列表
    context.subscriptions.push(
      refreshCommand,
      executeCommand,
      addCommand,
      editCommand,
      removeCommand
    );
  }
} 