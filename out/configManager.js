"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const vscode = require("vscode");
class ConfigManager {
    static getButtons() {
        const config = vscode.workspace.getConfiguration();
        return config.get(this.CONFIG_KEY, []);
    }
    static async addButton(button) {
        const buttons = this.getButtons();
        if (buttons.some(b => b.id === button.id)) {
            throw new Error(`Button with ID "${button.id}" already exists`);
        }
        buttons.push(button);
        await this.saveButtons(buttons);
    }
    static async updateButton(buttonId, updatedButton) {
        const buttons = this.getButtons();
        const index = buttons.findIndex(b => b.id === buttonId);
        if (index === -1) {
            throw new Error(`Button with ID "${buttonId}" not found`);
        }
        buttons[index] = updatedButton;
        await this.saveButtons(buttons);
    }
    static async removeButton(buttonId) {
        const buttons = this.getButtons();
        const filteredButtons = buttons.filter(b => b.id !== buttonId);
        if (filteredButtons.length === buttons.length) {
            throw new Error(`Button with ID "${buttonId}" not found`);
        }
        await this.saveButtons(filteredButtons);
    }
    static async saveButtons(buttons) {
        const config = vscode.workspace.getConfiguration();
        await config.update(this.CONFIG_KEY, buttons, vscode.ConfigurationTarget.Workspace);
    }
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
exports.ConfigManager = ConfigManager;
ConfigManager.CONFIG_KEY = 'customButton.buttons';
//# sourceMappingURL=configManager.js.map