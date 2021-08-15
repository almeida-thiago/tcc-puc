import { HTMLProps } from 'react'

export interface Option {
  label: string;
  value?: string | number;
}

export interface InputLabelProps extends HTMLProps<HTMLLabelElement> {
  invalid?: boolean;
}

export interface InputContainerPops extends HTMLProps<HTMLSelectElement> {
  width?: string;
  block?: boolean;
  invalid?: boolean;
}

export interface InputSelectPops {
  id?: string;
  className?: string;
  label?: string;
  name?: string;
  width?: string;
  block?: boolean;
  options: Option[];
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  setValue?: string | number;
  getValue: (name: string, value: string | number) => void;
}
