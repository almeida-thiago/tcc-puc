import styled, { keyframes } from 'styled-components'

const showAnimation = keyframes`
  0% { 
    transform: translateY(-10rem);
  }
  100% {
    transform: translateY(0);
  }
`

const hideAnimation = keyframes`
  0% { 
    transform: translateX(0);
  }
  100% {
    transform: translateY(-10rem);
  }
`

export const ToastContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  max-height: 100vh;
  overflow: hidden;
  z-index: 1010;
`

export const ToastCardContainer = styled.div`
  position: relative;
  padding: 1.25rem;
  border-radius: 0.25rem;
  width: 20rem;
  margin: 0.5rem;
  border: ${({ theme }) => theme.colors.dark.black} solid 0.025rem;
  background: white;
  box-shadow: 0 2px 12px rgb(31 45 61 / 25%);
  overflow: hidden;

  & .bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.5rem;

    &>div {
      height: 0.25rem;
      background-color: ${({ theme }) => theme.colors.dark.black};
    }
  }

  & h6 {
    font-size: small;
    font-weight: 800;
    text-transform: uppercase;
    user-select: none;
    cursor: default;
  }

  & p {
    font-size: small;
    user-select: none;
    cursor: default;
  }

  &.danger {
    border-color: ${({ theme }) => theme.colors.danger};
    & .bar>div {
      background-color: ${({ theme }) => theme.colors.danger};
    }

    & h6, & p {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  &.success {
    border-color: ${({ theme }) => theme.colors.success};

    & .bar>div {
      background-color: ${({ theme }) => theme.colors.success};
    }

    & h6, & p {
      color: ${({ theme }) => theme.colors.success};
    }
  }

  &.warning {
    border-color: ${({ theme }) => theme.colors.warning};

    & .bar>div {
      background-color: ${({ theme }) => theme.colors.warning};
    }

    & h6, & p {
      color: ${({ theme }) => theme.colors.warning};
    }
  }

  &.info {
    border-color: ${({ theme }) => theme.colors.info};

    & .bar>div {
      background-color: ${({ theme }) => theme.colors.info};
    }

    & h6, & p {
      color: ${({ theme }) => theme.colors.info};
    }
  }

  &.show {
    animation: ${showAnimation} 1s forwards;
  }

  &.hide {
    animation: ${hideAnimation} 1s forwards;
  }
`
