export interface Alert {
  style: 'info' | 'success' | 'warning'| 'danger';
  title: string;
  message: string;
  icon?: string;
  time?: number;
}

export interface Notification {
  title: string;
  message: string;
  page?: string;
}
