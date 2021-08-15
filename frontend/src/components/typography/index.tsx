import styled, { css } from 'styled-components'
import { ParagraphProps } from './models'

export const H1 = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`

export const H2 = styled.h2`
  font-weight: 400;
  font-size: 1.4rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`

export const H3 = styled.h3`
  font-weight: 400;
  font-size: 1.2rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`

export const H4 = styled.h4`
  font-weight: 400;
  font-size: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`

export const H5 = styled.h5`
  font-weight: 400;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`

export const H6 = styled.h6`
  font-weight: 400;
  font-size: 0.6rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`

export const Paragraph = styled.p<ParagraphProps>`
  font-weight: 400;
  font-size: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;

  ${({ isLabel }) => isLabel && css`
    font-weight: 600;
    font-size: 0.8rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.dark.silver};
  `}
`

export const Small = styled.small`
  font-size: 0.5rem;
`

export const Strong = styled.small`
  font-weight: 800;
`

export const A = styled.a`
  text-decoration: none;
  color: inherit;
  border-bottom: 0.15rem dotted;

  &:hover {
    border-bottom: 0.15rem solid;
  }

  &:active {
    font-weight: 800;
    border-bottom: none;
  }
`