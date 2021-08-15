import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h1 {
    display: flex;
    align-items: center;

    & svg {
      margin-right: 0.5rem;
      color: ${({ theme }) => theme.colors.warning}; 
    }
  }

  & p {
   margin-bottom: 2rem;
  }
`
