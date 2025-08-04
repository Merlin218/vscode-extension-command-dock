export interface CommandDockButton {
  id: string;
  name: string;
  command: string;
  icon?: string;
  color?: string;
}

// Backward compatibility alias
export type CustomButton = CommandDockButton;

export interface ButtonConfig {
  buttons: CommandDockButton[];
} 