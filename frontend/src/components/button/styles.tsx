import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import lightenDarkenColor from '@utils/lighten-darken-color'
import { ButtonProps } from './models'

export const ButtonContainer = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
  text-transform: uppercase;
  width: ${({ block }) => block ? '100%' : 'auto'};
  font-family: ${({ theme }) => theme.fonts.text}, sans-serif;
  font-weight: 800;
  padding: 0.5rem 1rem;
  margin: ${({ noMargin }): string => noMargin ? 'none' : '0.5rem'};
  border-radius: 0.25rem;
  border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
  background-color: ${({ theme }) => theme.colors.snow.normal};
  box-shadow: 0 2px 8px rgb(31 45 61 / 15%);
  transition: all ease-in-out 0.15s;
  cursor: pointer;

  &:not(:disabled):hover {
    transition: all ease-in-out 0.15s;
    background: ${({ theme }) => theme.colors.snow.dark}; 
  }

  &:not(:disabled):active , &:disabled  {
    transition: all ease-in-out 0.15s;
    background: ${({ theme }) => theme.colors.snow.normal}; 
    outline: none;
  }

  &:not(:disabled):focus {
    transition: all ease-in-out 0.15s;
    outline: ${({ theme }) => theme.colors.dark.steel} dashed 0.05rem;;
  }           

  & svg {
    height: 1.25rem;
    width: 2rem;

    &.loading {
      height: 1rem;
      width: 5rem;
    }
  }

  ${({ color, textColor, theme }): FlattenSimpleInterpolation | undefined => {
    if (color) {
      const colorName: string = color.toLowerCase()
      return css`
        color: ${textColor && textColor === 'clear' ? 'white' : 'inherit'};
        border: ${lightenDarkenColor(theme.colors[colorName], -50)} solid 0.025rem;
        background-color: ${theme.colors[colorName]};

        &:not(:disabled):hover {
          background-color: ${lightenDarkenColor(theme.colors[colorName], -25)}; 
        }

        &:not(:disabled):active, &:disabled {
          background-color: ${lightenDarkenColor(theme.colors[colorName], 25)}; 
        }

        & .loading {
          fill: ${textColor && textColor === 'clear' ? 'white' : 'inherit'};
        }
      `
    }
  }}

  ${({ flat }): FlattenSimpleInterpolation | undefined => flat ? css`
    background: transparent;
    border: none;
    box-shadow: none;
  `: undefined } 
`
