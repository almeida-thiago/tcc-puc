import { HTMLProps } from 'react'

export interface BadgeProps extends HTMLProps<HTMLSpanElement> {
  textColor: 'dark' | 'clear';
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}
