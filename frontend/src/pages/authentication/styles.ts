import styled from 'styled-components'

export const Logo = styled.img`
  max-height: 2rem;
`

export const CaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  & h1 {
    font-family: 'Roboto Slab', serif;
    font-size: large;
    font-weight: 500;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  & .code {
      text-align: center;
      letter-spacing: 1rem;
    }

  & .inline {
    display: flex;
    justify-content: space-between;
  }
`

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  &>button {
    flex: 1;
    margin-top: 0.5rem;
  }
`

export const Discaimer = styled.aside`
  font-weight: 600;
  font-size: 0.6rem;
  text-align: center;
  line-height: 1rem;
  margin: 0;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.dark.silver};
  
  & a {
    color: ${({ theme }) => theme.colors.dark.silver};
    transition: all ease-in-out 0.25s;
    
    &:hover {
      color: ${({ theme }) => theme.colors.dark.black};
      transition: all ease-in-out 0.25s;
    }
  }
`
