export interface MenuItem {
    label: string;
    route?: string;
    action?: () => void;
    type: 'text' | 'button';
  }