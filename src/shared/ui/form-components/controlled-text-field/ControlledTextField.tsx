import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@atpradical/picopico-ui-kit'

type ControlledTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'disabled' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorText,
  name,
  rules,
  shouldUnregister,
  ...props
}: ControlledTextFieldProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <TextField
      {...props}
      errorText={errorText ?? error?.message}
      onBlur={onBlur}
      onChange={onChange}
      ref={ref}
      value={value ?? ''}
      {...field}
    />
  )
}
