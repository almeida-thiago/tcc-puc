import { HTMLProps } from 'react'

export interface CardProps extends HTMLProps<HTMLDivElement> {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  noPadding?: boolean;
}
