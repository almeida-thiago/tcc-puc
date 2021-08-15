import styled, { css } from 'styled-components'
import { InputLabelProps, InputContainerProps, InputTextlProps, InputOptionsProps } from './models'

export const InputLabel = styled.label<InputLabelProps>`
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0;
  color: ${({ invalid, theme }) => invalid ? theme.colors.danger : theme.colors.dark.silver};
  transition: all ease-in-out 0.25s;
`

export const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  width: ${({ width, block }) => block ? '100%' : width ? width : 'auto'};

  &>svg {
    position: absolute;
    top: 1rem;
    right: 0.5rem;
    cursor: pointer;
  }
`

export const InputText = styled.input<InputTextlProps>`
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  border-radius: 0.25rem;
  border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
  background: #FFFFFF;
  font-family: ${({ theme }) => theme.fonts.text}, sans-serif;
  box-shadow: none;
  transition: all ease-in-out 0.25s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.smoke.extra};
    font-style: italic;
  }

  &:focus{
    transition: all ease-in-out 0.25s;
    box-shadow: 0 2px 8px rgb(31 45 61 / 5%);
    border: ${({ theme }) => theme.colors.smoke.extra} solid 0.025rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:disabled{
    transition: all ease-in-out 0.25s;
    color: ${({ theme }) => theme.colors.smoke.normal};
    background-color: ${({ theme }) => theme.colors.snow.dark};
    cursor: not-allowed;
  }

  ${({ invalid, theme }) => invalid && css`
    border-color: ${theme.colors.danger} !important;
    color: ${theme.colors.danger} !important;
  `}
`

export const InputOptions = styled.ul<InputOptionsProps>`
  position: absolute;
  margin-top: -0.55rem;
  width: 100%;
  max-height: 10rem;
  list-style: none;
  border-radius: 0.25rem;
  border-start-end-radius: 0;
  border-start-start-radius: 0;
  border: ${({ theme }) => theme.colors.smoke.extra} solid 0.025rem;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgb(31 45 61 / 5%);
  transition: all ease-in-out 0.25s;
  overflow-y: auto;
  overflow-x: hidden;
  user-select: none;
  z-index: 10;

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

  &::-webkit-scrollbar {
    width: 0.5rem;

      &-track {
      background: ${({ theme }) => theme.colors.smoke.normal};
    }

      &-thumb {
      background: ${({ theme }) => theme.colors.smoke.extra};
        
        &:hover {
        background: ${({ theme }) => theme.colors.smoke.extra};
      }
    }
  }

  & li{
    padding: 0.5rem;
    border-bottom: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
    font-family: ${({ theme }) => theme.fonts.text}, sans-serif;
    font-size: 0.8rem;
    transition: all ease-in-out 0.15s;

    &:not(.none) {
      cursor: pointer;
    }

    & strong, small {
      display: block;
      font-weight: normal;
    }

    &:not(.none):hover {
      transition: all ease-in-out 0.15s;
      background: ${({ theme }) => theme.colors.snow.dark}; 
    }

    &:not(.none):active {
      transition: all ease-in-out 0.15s;
      background: ${({ theme }) => theme.colors.smoke.normal};
    }

    &:last-of-type {
      border: none;
    }
  }

  ${({ invalid, theme }) => invalid && css`
    border-color: ${theme.colors.danger} !important;
    color: ${theme.colors.danger} !important;
  `}
`
