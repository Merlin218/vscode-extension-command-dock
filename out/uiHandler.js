"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIHandler = void 0;
const vscode = require("vscode");
const configManager_1 = require("./configManager");
const buttonManager_1 = require("./buttonManager");
class UIHandler {
    /**
     * 显示添加按钮的输入界面
     */
    static async showAddButtonDialog() {
        try {
            // 获取按钮名称
            const name = await vscode.window.showInputBox({
                prompt: '输入按钮名称',
                placeHolder: '例如: Build Project',
                validateInput: (value) => {
                    if (!value || value.trim().length === 0) {
                        return '按钮名称不能为空';
                    }
                    return null;
                }
            });
            if (!name) {
                return;
            }
            // 获取执行命令
            const command = await vscode.window.showInputBox({
                prompt: '输入要执行的终端命令',
                placeHolder: '例如: npm run build',
                validateInput: (value) => {
                    if (!value || value.trim().length === 0) {
                        return '命令不能为空';
                    }
                    return null;
                }
            });
            if (!command) {
                return;
            }
            // 获取图标（可选）
            const icon = await vscode.window.showInputBox({
                prompt: '输入图标名称（可选，使用VSCode图标）',
                placeHolder: '例如: play, gear, terminal 等',
            });
            // 获取颜色（可选）
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
            // 创建按钮配置
            const button = {
                id: configManager_1.ConfigManager.generateId(),
                name: name.trim(),
                command: command.trim(),
                icon: icon?.trim() || undefined,
                color: selectedColor?.value
            };
            // 保存配置
            await configManager_1.ConfigManager.addButton(button);
            // 创建按钮
            buttonManager_1.ButtonManager.createButton(button);
            vscode.window.showInformationMessage(`自定义按钮 "${button.name}" 已创建`);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`创建按钮失败: ${errorMessage}`);
        }
    }
    /**
     * 显示删除按钮的选择界面
     */
    static async showRemoveButtonDialog() {
        try {
            const buttons = configManager_1.ConfigManager.getButtons();
            if (buttons.length === 0) {
                vscode.window.showInformationMessage('没有自定义按钮可删除');
                return;
            }
            const buttonItems = buttons.map(button => ({
                label: button.name,
                description: button.command,
                detail: `ID: ${button.id}`,
                button: button
            }));
            const selectedItem = await vscode.window.showQuickPick(buttonItems, {
                placeHolder: '选择要删除的按钮'
            });
            if (!selectedItem) {
                return;
            }
            // 确认删除
            const confirmation = await vscode.window.showWarningMessage(`确定要删除按钮 "${selectedItem.button.name}" 吗？`, { modal: true }, '删除');
            if (confirmation === '删除') {
                await configManager_1.ConfigManager.removeButton(selectedItem.button.id);
                buttonManager_1.ButtonManager.removeButton(selectedItem.button.id);
                vscode.window.showInformationMessage(`按钮 "${selectedItem.button.name}" 已删除`);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`删除按钮失败: ${errorMessage}`);
        }
    }
    /**
     * 显示编辑按钮的界面
     */
    static async showEditButtonDialog() {
        try {
            const buttons = configManager_1.ConfigManager.getButtons();
            if (buttons.length === 0) {
                vscode.window.showInformationMessage('没有自定义按钮可编辑');
                return;
            }
            const buttonItems = buttons.map(button => ({
                label: button.name,
                description: button.command,
                detail: `ID: ${button.id}`,
                button: button
            }));
            const selectedItem = await vscode.window.showQuickPick(buttonItems, {
                placeHolder: '选择要编辑的按钮'
            });
            if (!selectedItem) {
                return;
            }
            const originalButton = selectedItem.button;
            // 编辑按钮名称
            const name = await vscode.window.showInputBox({
                prompt: '修改按钮名称',
                value: originalButton.name,
                validateInput: (value) => {
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
                validateInput: (value) => {
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
            const currentColorOption = colorOptions.find(opt => opt.value === originalButton.color) || colorOptions[0];
            const selectedColor = await vscode.window.showQuickPick(colorOptions, {
                placeHolder: '选择按钮颜色（可选）'
            });
            // 更新按钮配置
            const updatedButton = {
                id: originalButton.id,
                name: name.trim(),
                command: command.trim(),
                icon: icon?.trim() || undefined,
                color: selectedColor?.value
            };
            // 保存配置
            await configManager_1.ConfigManager.updateButton(originalButton.id, updatedButton);
            // 更新按钮
            buttonManager_1.ButtonManager.updateButton(updatedButton);
            vscode.window.showInformationMessage(`按钮 "${updatedButton.name}" 已更新`);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`编辑按钮失败: ${errorMessage}`);
        }
    }
}
exports.UIHandler = UIHandler;
//# sourceMappingURL=uiHandler.js.map