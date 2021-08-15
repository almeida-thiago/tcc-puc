import { HTMLProps } from 'react'

export interface InputLabelProps extends HTMLProps<HTMLLabelElement> {
  invalid?: boolean;
}

export interface InputTextlProps extends HTMLProps<HTMLInputElement> {
  invalid?: boolean;
}

export interface InputOptionsProps extends HTMLProps<HTMLUListElement> {
  invalid?: boolean;
}

export interface AutocompleteOption {
  label: string;
  value?: string | number;
}

export interface InputContainerProps {
  width?: string;
  block?: boolean;
  invalid?: boolean;
  disabled?: boolean;
}

export interface InputTextAutocompleteProps {
  id?: string;
  className?: string;
  label?: string;
  name: string;
  width?: string;
  block?: boolean;
  showOptionValue?: boolean;
  options: AutocompleteOption[];
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  setValue?: string | number;
  getValue: Function;
}
