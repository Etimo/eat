import classNames from 'classnames';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type TextInputProps = {
  label: string;
  name: string;
  type?: 'text' | 'number';
} & React.ComponentProps<'input'>;
export const TextInput: FC<TextInputProps> = (props) => {
  const { label, name, type = 'text', ...rest } = props;
  const { register } = useFormContext();
  const { fieldState } = useController({ name });
  return (
    <div className="flex-1 flex flex-col">
      <label
        htmlFor={name}
        className={classNames(
          'block text-sm font-medium leading-6 text-gray-900',
          fieldState.error ? 'text-red-600' : '',
        )}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={classNames(
          'block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300',
          'placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          fieldState.error ? 'ring-red-600' : '',
        )}
        autoComplete="off"
        autoCorrect="off"
        autoFocus={false}
        spellCheck={false}
        {...register(name)}
        {...rest}
      />
      <div className="text-sm text-red-600 h-5">
        {fieldState.error?.message}
      </div>
    </div>
  );
};
TextInput.displayName = 'TextInput';
