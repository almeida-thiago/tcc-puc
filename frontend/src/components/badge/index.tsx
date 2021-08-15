import styled from 'styled-components'
import { BadgeProps } from './models'

const Badge = styled.span<BadgeProps>`
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0;
  padding: 0.05rem 0.25rem;
  border-radius: 0.25rem;
  background: ${({ theme, color }): string => theme.colors[color]};
  color: ${({ color }): string => color === 'warning' ? 'black' : 'white'};
`

export default Badge
