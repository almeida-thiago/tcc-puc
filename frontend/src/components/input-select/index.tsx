import { FormEvent, Fragment } from 'react'
import { InputSelectPops, Option } from './models'
import { InputLabel, InputContainer } from './styles'

const InputSelect = ({ id, className, label, name, getValue, setValue, width, block, options, invalid, disabled, required }: InputSelectPops): JSX.Element => {

  const onChangeValue = ({ currentTarget }: FormEvent<HTMLSelectElement>): void => {
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
        block={block}
        width={width}
        value={setValue}
        onChange={onChangeValue}
        invalid={invalid}
        disabled={disabled}
      >
        <option>-selecione-</option>
        {options.map(({ label, value }: Option, index: number) => (
          <option key={index} value={value}>{label}</option>
        ))}
      </InputContainer>
    </Fragment>
  )
}

export default InputSelect
