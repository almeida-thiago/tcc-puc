import{ HTMLProps } from 'react'

export interface ParagraphProps extends HTMLProps<HTMLParagraphElement> {
  isLabel?: boolean;
}
