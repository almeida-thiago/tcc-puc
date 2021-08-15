import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { CardProps } from './models'

const Card = styled.div<CardProps>`
  ${({ width }: CardProps): FlattenSimpleInterpolation => width ? css`width: ${width};` : css`width: 100%;`}
  ${({ minWidth }: CardProps): FlattenSimpleInterpolation => minWidth ? css`min-width: ${minWidth};` : css``}
  ${({ maxWidth }: CardProps): FlattenSimpleInterpolation => maxWidth ? css`max-width: ${maxWidth};` : css``}
  ${({ height }: CardProps): FlattenSimpleInterpolation => height ? css`height: ${height};` : css``}
  ${({ minHeight }: CardProps): FlattenSimpleInterpolation => minHeight ? css`min-height: ${minHeight};` : css``}
  ${({ maxHeight }: CardProps): FlattenSimpleInterpolation => maxHeight ? css`max-height: ${maxHeight};` : css``}
  ${({ noPadding }: CardProps): FlattenSimpleInterpolation => !noPadding ? css`padding: 1.25rem;;` : css``}
  border-radius: 0.25rem;
  border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgb(31 45 61 / 15%);
`

export default Card
