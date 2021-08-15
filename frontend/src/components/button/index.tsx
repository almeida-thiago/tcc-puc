import React from 'react'
import { ButtonProps } from './models'
import { ButtonContainer } from './styles'

const Button = ({ id, className, children, onClick, loading, color, textColor, noMargin, block, flat }: ButtonProps): JSX.Element => {

  const Loading = (): JSX.Element => (
    <svg className="loading" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="15 35 25 28" enableBackground="new 0 0 0 0">
      <circle stroke="none" cx="6" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
      </circle>
      <circle stroke="none" cx="26" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
      </circle>
      <circle stroke="none" cx="46" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
      </circle>
    </svg>
  )

  return (
    <ButtonContainer
      id={id}
      className={className}
      onClick={onClick}
      disabled={loading}
      color={color}
      textColor={textColor}
      noMargin={noMargin}
      block={block}
      flat={flat}
    >{loading ? <Loading /> : children}</ButtonContainer>
  )
}

export default Button
