import { Notification } from '@models/messages'
import{ MouseEventHandler, ReactNode, HTMLProps } from 'react'

export interface LayoutProps extends HTMLProps<HTMLDivElement> {
  logo: string;
  children: ReactNode;
  menuTop?: MenuItemTop[];
  mainMenu?: MenuItem[];
  notifications?: Notification[];
  menuState: boolean;
  menuActionHandler: Function;
}

export interface ContainerProps extends HTMLProps<HTMLDivElement> {
  navMenu: boolean;
}

export interface HeaderProps extends HTMLProps<HTMLDivElement> {
  collapse: boolean;
  collapseHander: Function;
  logo?: string;
}

export interface HeaderContainerProps extends HTMLProps<HTMLDivElement> {
  collapse: boolean;
}

export interface MenuItemTop extends MenuItem {
  subItem?: MenuItem[];
}

export interface NavProps extends HTMLProps<HTMLDivElement> {
  logo?: string;
  collapse: boolean;
  collapseHander: Function;
}

export interface ContentLoadingProps {
  background?: string;
}

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  action?: MouseEventHandler<HTMLLIElement>;
}

export interface ContentProps extends HTMLProps<HTMLDivElement> {
  type: 'flex' | 'grid';
  margin?: boolean;
  centerContent?: boolean;
  direction?: 'column' | 'row';
  cols?: number;
  gap?: boolean;
  full?: boolean;
}

export interface ColumnProps extends HTMLProps<HTMLDivElement> {
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
}
