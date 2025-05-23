import * as vscode from 'vscode';
import { CustomButton } from './types';

export class ConfigManager {
  private static readonly CONFIG_KEY = 'customButton.buttons';

  public static getButtons(): CustomButton[] {
    const config = vscode.workspace.getConfiguration();
    return config.get<CustomButton[]>(this.CONFIG_KEY, []);
  }

  public static async addButton(button: CustomButton): Promise<void> {
    const buttons = this.getButtons();
    
    if (buttons.some(b => b.id === button.id)) {
      throw new Error(`Button with ID "${button.id}" already exists`);
    }
    
    buttons.push(button);
    await this.saveButtons(buttons);
  }

  public static async updateButton(buttonId: string, updatedButton: CustomButton): Promise<void> {
    const buttons = this.getButtons();
    const index = buttons.findIndex(b => b.id === buttonId);
    
    if (index === -1) {
      throw new Error(`Button with ID "${buttonId}" not found`);
    }
    
    buttons[index] = updatedButton;
    await this.saveButtons(buttons);
  }

  public static async removeButton(buttonId: string): Promise<void> {
    const buttons = this.getButtons();
    const filteredButtons = buttons.filter(b => b.id !== buttonId);
    
    if (filteredButtons.length === buttons.length) {
      throw new Error(`Button with ID "${buttonId}" not found`);
    }
    
    await this.saveButtons(filteredButtons);
  }

  private static async saveButtons(buttons: CustomButton[]): Promise<void> {
    const config = vscode.workspace.getConfiguration();
    await config.update(this.CONFIG_KEY, buttons, vscode.ConfigurationTarget.Workspace);
  }

  public static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
