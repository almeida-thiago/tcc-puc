/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, Fragment, ReactNode, useEffect, useState } from 'react'
import { FiX, FiChevronDown } from 'react-icons/fi'
import { InputTextAutocompleteProps, AutocompleteOption } from './models'
import { InputLabel, InputContainer, InputText, InputOptions } from './styles'

const InputTextAutocomplete = ({ id, className, label, name, getValue, setValue, options, showOptionValue, width, block, invalid, disabled, required }: InputTextAutocompleteProps): JSX.Element => {
  const [showValues, setShowValues] = useState<boolean>(false)
  const [valuesDisplay, setValuesDisplay] = useState<AutocompleteOption[]>(options)
  const [selectedValue, setSelectedValue] = useState<AutocompleteOption>()
  const [inputValue, setInputValue] = useState<string>('-selecione-')

  useEffect(() => {
    setInitialValue(setValue)
  }, [setValue])

  useEffect(() => {
    if (inputValue && inputValue.length) {
      setValuesDisplay(options.filter(({ label, value }: AutocompleteOption) => {
        const regex = new RegExp(`\\b${inputValue}.*\\b`, 'gi')
        return label.match(regex) || String(value).match(regex) ? true : false
      }))
    } else {
      setValuesDisplay(options)
    }
  }, [inputValue])

  const setInitialValue = (initialValue?: string | number): void => {
    if (initialValue) {
      const valueToSelect: AutocompleteOption = options
        .filter((option: AutocompleteOption) =>
          (String(initialValue) === String(option.value))
        )[0]
      selectValue(valueToSelect)
    }
  }

  const selectValue = (option: AutocompleteOption | null): void => {
    if (option) {
      setSelectedValue(option)
      setInputValue(option?.label!)
      getValue(name, option.value)
    } else {
      setSelectedValue(undefined)
      setInputValue('-selecione-')
      getValue(name, undefined)
    }
    setShowValues(false)
  }

  const inputFocus = (): void => {
    if (selectedValue) {
      setInputValue(selectedValue?.label!)
    } else {
      setInputValue('')
    }
    setShowValues(true)
  }

  return (
    <Fragment>
      {label && (<InputLabel invalid={invalid}>{required ? `${label}*` : label}</InputLabel>)}
      <InputContainer id={id} className={className} width={width} block={block} invalid={invalid} disabled={disabled}>
        {(selectedValue || showValues) ? (<FiX onClick={() => selectValue(null)} />) : (<FiChevronDown onClick={() => inputFocus()} />)}
        <InputText
          value={inputValue}
          onFocus={() => inputFocus()}
          onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => setInputValue(currentTarget.value)}
          disabled={disabled}
          invalid={invalid}
        />
        {showValues ? valuesDisplay.length ? (
          <InputOptions invalid={invalid}>
            {valuesDisplay.map((option: AutocompleteOption): ReactNode =>
              <li key={option.value} onClick={() => selectValue(option)}>
                <strong>{option.label}</strong>
                {showOptionValue && (<small>{option.value}</small>)}
              </li>
            )}
          </InputOptions>
        ) : (
          <InputOptions invalid={invalid}>
            <li className="none">Nenhuma opção encontrada</li>
          </InputOptions>
        ) : null}
      </InputContainer>
    </Fragment>
  )
}

export default InputTextAutocomplete
