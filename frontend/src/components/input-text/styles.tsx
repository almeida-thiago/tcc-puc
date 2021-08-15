import styled, { css } from 'styled-components'
import {InputLabelProps, InputContainerProps } from './models'

export const InputLabel = styled.label<InputLabelProps>`
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0;
  color: ${({ invalid, theme }) => invalid ? theme.colors.danger : theme.colors.dark.silver};
  transition: all ease-in-out 0.25s;
`

export const InputContainer = styled.input<InputContainerProps>`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
  background: #FFFFFF;
  font-family: ${({ theme }) => theme.fonts.text}, sans-serif;
  box-shadow: none;
  transition: all ease-in-out 0.25s;
  width: ${({ width, block }) => block ? '100%' : width ? width : 'auto'};

  &::placeholder {
    color: ${({ theme }) => theme.colors.smoke.extra};
    font-style: italic;
  }

  &:focus{
    transition: all ease-in-out 0.25s;
    box-shadow: 0 2px 8px rgb(31 45 61 / 5%);
    border: ${({ theme }) => theme.colors.smoke.extra}  solid 0.025rem;
  }

  &:disabled{
    transition: all ease-in-out 0.25s;
    color: ${({ theme }) => theme.colors.dark.silver};
    background-color: ${({ theme }) => theme.colors.snow.dark};
    cursor: not-allowed;
  }

  ${({ invalid, theme }) => invalid && css`
    border-color: ${theme.colors.danger} !important;
    color: ${theme.colors.danger} !important;
  `}
`
