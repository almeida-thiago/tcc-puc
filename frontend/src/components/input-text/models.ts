import { HTMLProps } from 'react'

export interface InputLabelProps extends HTMLProps<HTMLLabelElement> {
  invalid?: boolean;
}

export interface InputContainerProps extends HTMLProps<HTMLInputElement> {
  width?: string;
  block?: boolean;
  invalid?: boolean;
}

export interface InputTextProps {
  id?: string;
  className?: string;
  label?: string;
  name?: string;
  width?: string;
  block?: boolean;
  password?: boolean;
  maxLength?: number;
  placeholder?: string; 
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  setValue?: string | number;
  getValue: (name: string, value: string | number) => void;
}
