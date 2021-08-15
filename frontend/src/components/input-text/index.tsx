import { Fragment } from 'react'
import { FormEvent } from 'react'
import { InputTextProps } from './models'
import { InputLabel, InputContainer } from './styles'

const InputText = ({ id, className, label, name, getValue, setValue, width, block, maxLength, placeholder, invalid, disabled, required, password }: InputTextProps): JSX.Element => {

  const onChangeValue = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
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
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        maxLength={maxLength}
        value={setValue}
        onChange={onChangeValue}
        invalid={invalid}
        disabled={disabled}
      />
    </Fragment>
  )
}

export default InputText
