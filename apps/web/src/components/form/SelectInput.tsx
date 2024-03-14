'use client';

import { Icon } from '@/icons';
import classNames from 'classnames';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

const slide: Variants = {
  hidden: {
    opacity: 0,
    maxHeight: 0,
  },
  visible: {
    opacity: 1,
    maxHeight: 160,
  },
  exit: {
    opacity: 0,
    maxHeight: 0,
  },
};

type SelectInputProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
} & React.ComponentProps<'input'>;
export const SelectInput: FC<SelectInputProps> = (props) => {
  const { label, name, options, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { setValue, register } = useFormContext();
  const { fieldState } = useController({ name });

  const selected = useWatch({ name });
  const selectedLabel = useMemo(() => {
    return options.find((option) => option.value === selected)?.label;
  }, [options, selected]);

  return (
    <div className="flex flex-col relative">
      <label
        htmlFor={name}
        className={classNames(
          'block text-sm font-medium leading-6 text-gray-900',
          fieldState.error ? 'text-red-600' : '',
        )}
      >
        {label}
      </label>
      <input type="hidden" id={name} {...rest} {...register(name)} />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'flex justify-between w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 cursor-pointer',
          'placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          fieldState.error ? 'ring-red-600' : '',
        )}
      >
        <div>{selectedLabel}</div>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
        >
          <Icon.Chevron direction="down" />
        </motion.div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isOpen && (
          <motion.div
            className="absolute z-40 top-[60px] w-full mt-1 flex flex-col bg-white border border-gray-300 rounded-md overflow-scroll"
            variants={slide}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.35,
              type: 'spring',
            }}
          >
            {options.length === 0 ? (
              <div className="flex justify-center items-center h-20 text-gray-400">
                No options loaded
              </div>
            ) : (
              options.map(({ value, label }, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setValue(name, value, { shouldValidate: true });
                    setIsOpen(false);
                  }}
                  className={classNames(
                    'hover:bg-gray-300 transition-colors duration-200 px-3 py-1 cursor-pointer text-sm',
                    selected === value ? 'bg-gray-300' : '',
                  )}
                >
                  {label}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-sm text-red-600 h-5">
        {fieldState.error?.message}
      </div>
    </div>
  );
};
SelectInput.displayName = 'SelectInput';
