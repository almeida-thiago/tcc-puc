import styled from 'styled-components'

export const MessageHead = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;

  & h2 {
    font-family: ${({ theme }) => theme.fonts.text};
    text-align: left;
    font-size: medium;
    text-transform: capitalize;
    width: 100%;
  }

  & p {
    display: flex;
    width: 100%;
    flex: 1;
    font-size: small;
    font-weight: 600;
    text-transform: capitalize;
  }
`

export const MessageBody = styled.div`
  flex: 1;
  margin-top: 1rem;
`
