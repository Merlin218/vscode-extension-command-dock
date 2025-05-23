export interface CustomButton {
  id: string;
  name: string;
  command: string;
  icon?: string;
  color?: string;
}

export interface ButtonConfig {
  buttons: CustomButton[];
} 