export interface FormFieldValue {
  value: string;
  type: string;
  isValid: boolean;
}

interface ValidationField {
  field: string;
  empty?: boolean;
  format?: string;
}

/**
 * Set value from form input to form field object
 * @param {Function} setform set form values function
 * @param {string} name form field name
 * @param {string} type form field type
 * @param {string | number | undefined} value form field value
 * @param {boolean} [isValid] form field is valid
 */
export const setValueToFrom = (setForm: Function, name: string, type: string, value: string | number | undefined): void => {
  let isValid = false
  if (value === undefined) {
    isValid = true
  } else if (value && String(value).length && validateInputType(value, type)) {
    isValid = true
  }
  setForm((formField: any) => ({
    ...formField,
    [name]: { isValid, value, type }
  }))
}

/**
 * Set value from form object to form field input
 * @param {any} form form object
 * @param {string} name form field name
 * @returns {string | number} form field value
 */
export const setValueToInput = (form: any, name: string): string | number =>
  form && form[name] ? form[name].value : ''

/**
 * Check if form field is invalid
 * @param {any} form form object
 * @param {string} name form field name
 * @returns {boolean} true or false
 */
export const isInvalid = (form: any, name: string): boolean => {
  if (!form || !form[name]) {
    return false
  }
  return form[name] ? !form[name].isValid : true
}

/**
 * Check if form has inalid field and highlight them
 * @param {string[]} fields form filelds to verify
 * @param {any} form form object
 * @param {Function} setform set form values function
 */
export const hasInvalidFields = (fields: ValidationField[], form: any, setForm: Function): boolean => {
  const emptyValidation: ValidationField[] = fields.filter(({ empty }: ValidationField) => !empty)
  const formatValidation: ValidationField[] = fields.filter(({ format }: ValidationField) => format !== undefined)
  emptyValidation.forEach((field: ValidationField) => {
    if (form[field.field].value === undefined) {
      setValueToFrom(setForm, field.field, form[field.field].type, '')
    }
  })
  formatValidation.forEach((field: ValidationField) => {
    if (validateInputType(form[field.field].value, field.format)) {
      setValueToFrom(setForm, field.field, form[field.field].type, form[field.field].value)
    }
  })
  const fieldsValues: FormFieldValue[] = Object.values(form)
  const values: any[] = fieldsValues.map((item: FormFieldValue) => item.value)
  const isValidValues: boolean[] = fieldsValues.map((item: FormFieldValue) => item.isValid)
  return isValidValues.includes(false) || values.includes(undefined) ? true : false
}

/**
 * Masks input value
 * @param {string | number} value value to mask
 * @param {string | null} mask presset regex
 * @returns {string} masked value
 */
export const maskInput = (value: string | number, mask: 'numbers' | 'phone' | 'email' | 'cpf' | ' cnpj'): string => {
  value = String(value)
  switch (mask.toUpperCase()) {
    case 'NUMBERS':
      return value.replace(/\D/g, '')
    case 'PHONE':
      return value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
    case 'CPF':
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    case 'CNPJ':
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    default:
      return value
  }
}

/**
 * Validate input format with regex
 * @param {string | number} value value to validate
 * @param {string | null} presset presset regex
 * @param {RegExp} [regex] regex expression to validate
 * @returns {boolean} true or false
 */
export const validateInputType = (value: string | number, presset: 'number' | 'phone' | 'email' | 'cpf' | 'cnpj' | string | null = null, regex: RegExp | null = null): boolean => {
  if (presset) {
    switch (presset.toUpperCase()) {
      case 'PHONE':
        regex = /\(([11-99]{2}\)) ([9]?[0-9]{4})[-](\d{4})/gm
        break;
      case 'EMAIL':
        regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
        break;
      case 'CPF':
        regex = /^([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11})|([0-9]{9}-[0-9]{2})$/g
        break;
      case 'CNPJ':
        regex = /(\d{2}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s/]?\d{4}[-.\s]?\d{2})/g
        break;
      default:
        return true
    }
  }
  if (regex) {
    return regex.test(String(value))
  }
  return true
}
