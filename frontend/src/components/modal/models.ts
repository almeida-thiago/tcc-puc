import { HTMLProps, ReactNode } from 'react'

export interface ModalProps {
  title?: string;
  children: ReactNode;
  show: boolean;
  showAction: Function;
  width?: string;
  height?: string;
  noPadding?: boolean;
}

export interface ModalContainerProps extends HTMLProps<HTMLDivElement> {
  show: boolean;
}

export interface ModalBodyProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  show: boolean;
  width?: string;
  height?: string;
  noPadding?: boolean;
}