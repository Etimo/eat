'use client';

import { Icon } from '@/icons';
import classNames from 'classnames';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FC, useCallback, useMemo, useState } from 'react';
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

type MultiSelectInputProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
} & React.ComponentProps<'input'>;
export const MultiSelectInput: FC<MultiSelectInputProps> = (props) => {
  const { label, name, options, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { setValue, register } = useFormContext();
  const { fieldState } = useController({ name });

  const selected: string = useWatch({ name });
  const selectedLabel = useMemo(() => {
    const current = (selected ?? '').split(',');
    return options
      .filter((option) => current.includes(option.value))
      .map((option) => option.label)
      .join(', ');
  }, [options, selected]);

  const handleSelect = useCallback(
    (id: string) => () => {
      const current = (selected ?? '').split(',');
      if (current.includes(id)) {
        const filtered = current.filter((item) => item !== id);
        setValue(name, filtered.join(','), { shouldValidate: true });
      } else {
        current.push(id);
        setValue(name, current.join(','), { shouldValidate: true });
      }
    },
    [name, selected, setValue],
  );

  const getIsSelected = useCallback(
    (id: string) => {
      const current = (selected ?? '').split(',');
      return current.includes(id);
    },
    [selected],
  );

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
        <div className="truncate">{selectedLabel}</div>
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
                  onClick={handleSelect(value)}
                  className={classNames(
                    'hover:bg-gray-300 transition-colors duration-200 px-3 py-1 cursor-pointer text-sm',
                    getIsSelected(value) ? 'bg-gray-300' : '',
                  )}
                >
                  <div className="flex gap-1.5 items-center">
                    <div className="flex-1">{label}</div>
                    <div>
                      {getIsSelected(value) && <Icon.Check size={16} />}
                    </div>
                  </div>
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
MultiSelectInput.displayName = 'MultiSelectInput';
