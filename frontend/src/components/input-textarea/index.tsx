import { FormEvent, Fragment } from 'react'
import { InputTextProps } from './models'
import { InputLabel, InputContainer } from './styles'

const InputTextArea = ({ id, className, label, name, getValue, children, width, block, placeholder, maxLength, rows, invalid, disabled, required, }: InputTextProps): JSX.Element => {
  const setValue = ({ currentTarget }: FormEvent<HTMLTextAreaElement>): void => {
    const name: string = currentTarget.name
    const value: any = currentTarget.value
    getValue(name, value)
  }

  return (
    <Fragment>
      {label && (<InputLabel invalid={invalid}>{required ? `${label}*` : label}</InputLabel>)}
      <InputContainer
        id={id}
        className={className}
        name={name}
        width={width}
        block={block}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        onChange={setValue}
        invalid={invalid}
        disabled={disabled}
      >{children}</InputContainer>
    </Fragment>
  )
}

export default InputTextArea
