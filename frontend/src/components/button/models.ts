import { HTMLProps } from 'react'

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  textColor?: 'dark' | 'clear';
  noMargin?: boolean;
  loading?: boolean;
  block?: boolean;
  flat?: boolean;
}
