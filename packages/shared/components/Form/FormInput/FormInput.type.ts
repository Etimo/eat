import { ReactElement } from 'react';
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { TextInputProps } from 'react-native';

export type FormInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: object;
  placeholder: string;
  label: string;
  errors: FieldErrors<TFieldValues>;
  icon?: ReactElement;
  assistiveText?: string;
} & TextInputProps;
