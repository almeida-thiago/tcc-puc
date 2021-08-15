import styled, { css, FlattenSimpleInterpolation, keyframes } from 'styled-components'
import { ModalContainerProps, ModalBodyProps } from './models'

const showBgAnimation = keyframes`
  0% { 
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const hideBgAnimation = keyframes`
  0% { 
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const showBodyAnimation = keyframes`
  0% { 
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
`

const hideBodyAnimation = keyframes`
  0% { 
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100vh);
  }
`

export const ModalContainer = styled.div<ModalContainerProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background : ${({ theme }) => `${theme.colors.dark.black}50`}; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  ${({ show }: ModalContainerProps): FlattenSimpleInterpolation => show ? css`animation: ${showBgAnimation} 1s forwards;` : css`animation: ${hideBgAnimation} 1s 0.5s forwards;`}
`

export const ModalBody = styled.div<ModalBodyProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  border: ${({ theme }): string => theme.colors.smoke.normal} solid 0.025rem;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgb(31 45 61 / 15%);
  width: ${({ width }: ModalBodyProps): string => width ? width : '100%'};
  height: ${({ height }: ModalBodyProps): string => height ? height : '100%'};
  min-width: 25rem;
  min-height: 25rem;
  max-width: 80vw;
  max-height: 80vh;
  transform: translateY(-100vh);
  overflow: hidden;
  z-index: 100;
  ${({ show }: ModalContainerProps): FlattenSimpleInterpolation => show ? css`animation: ${showBodyAnimation} 1s 0.5s forwards;` : css`animation: ${hideBodyAnimation} 1s forwards;`}

  @media(max-width: 770px) {
    border-radius: 0;
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
  }

  & header {
    display: flex;
    justify-content: ${({ title }: ModalBodyProps): string => title ? 'space-between' : 'flex-end'};
    align-items: center;
    padding: 1rem;
    border-bottom: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;

    & h2 {
      margin: 0;
      user-select: none;
    }

    & button {
      background: none;
      border: none;
      cursor: pointer;

      & svg {
        color: ${({ theme }) => theme.colors.dark.black};
      }

      &:hover svg {
      transition: all ease -in -out 0.15s;
      color: ${({ theme }) => theme.colors.dark.silver};
    }

      &:active svg {
      transition: all ease -in -out 0.15s;
      color: ${({ theme }) => theme.colors.smoke.extra};
    }
  }

    & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

& section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${({ noPadding }: ModalBodyProps): string => noPadding ? '0' : '1rem'};

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
}

`
