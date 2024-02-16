import React, { FC } from 'react';

import { Controller } from 'react-hook-form';
import { Box, Input, InputField, InputSlot, Text } from '@gluestack-ui/themed';
import { FormInputProps } from './FormInput.type';

export const TextInput: FC<FormInputProps<any>> = ({
  name,
  control,
  rules,
  placeholder,
  label,
  errors,
  icon,
  assistiveText,
  ...textInputProps
}) => {
  const errorMessage = errors[name]?.message;
  return (
    <Box>
      <Text color="$white" size="lg">
        {label}
      </Text>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input size="xl" px="$2">
            {icon && <InputSlot>{icon}</InputSlot>}
            <InputField
              type="text"
              placeholder={placeholder}
              color="$white"
              borderColor="$white"
              placeholderTextColor="#ffffff"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...textInputProps}
            />
          </Input>
        )}
      />

      {assistiveText && (
        <Text size="xs" color="$white">
          {assistiveText}
        </Text>
      )}
      {errorMessage && (
        <Text size="xs" color="$red">
          {typeof errorMessage === 'string' ? errorMessage : 'Error'}
        </Text>
      )}
    </Box>
  );
};
TextInput.displayName = 'TextInput';
