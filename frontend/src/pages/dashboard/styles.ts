import styled from 'styled-components'

export const HelpdeskNav = styled.nav`
  display: flex;
  & button {
    flex: 1;
    margin-top: 0;
    margin-bottom: 0;

    &.active {
      background: ${({ theme }) => theme.colors.dark.black}; 
      color: white;
    }

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`
