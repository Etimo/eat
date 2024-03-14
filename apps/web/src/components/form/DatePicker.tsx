'use client';
import { Icon } from '@/icons';
import classNames from 'classnames';
import { motion, AnimatePresence, Variants, useAnimation } from 'framer-motion';
import { FC, useCallback, useMemo, useState } from 'react';
import { useFormContext, useController, useWatch } from 'react-hook-form';
import { dayjs } from '@/utils';

const slide: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 216,
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

type DatePickerProps = {
  label: string;
  name: string;
} & React.ComponentProps<'input'>;
export const DatePicker: FC<DatePickerProps> = (props) => {
  const { label, name, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeDate, setActiveDate] = useState(dayjs());

  const { setValue, register } = useFormContext();
  const { fieldState } = useController({ name });

  const animationControls = useAnimation();

  const selectedDate = useWatch({ name });

  const toggleIsOpen = useCallback(() => {
    setActiveDate(dayjs(selectedDate));
    setIsOpen(!isOpen);
    animationControls.start({ scale: [1, 1.05, 1] });
  }, [animationControls, isOpen, selectedDate, setActiveDate, setIsOpen]);

  const handleOnDateClick = useCallback(
    (fieldName: string, date: dayjs.Dayjs) => () => {
      setValue(fieldName, date.format('YYYY-MM-DD'));
      setActiveDate(date);
      setIsOpen(false);
    },
    [setActiveDate, setIsOpen, setValue],
  );

  const { startFill, endFill } = useMemo(() => {
    return {
      startFill: +activeDate.date(1).format('d') - 1, // -1 required due to swedish weeks starting on monday that has index 1.
      endFill:
        +activeDate.endOf('month').format('d') === 0
          ? 0
          : 7 - +activeDate.endOf('month').format('d'),
    };
  }, [activeDate]);

  return (
    <>
      <div className="flex-1 flex flex-col relative">
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
          onClick={toggleIsOpen}
          className={classNames(
            'flex justify-between w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 cursor-pointer',
            'placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
            fieldState.error ? 'ring-red-600' : '',
          )}
        >
          <div>{selectedDate}</div>
          <motion.div
            animate={animationControls}
            transition={{
              duration: 0.25,
              ease: 'circInOut',
            }}
            className="text-etimo"
          >
            <Icon.Calendar />
          </motion.div>
        </div>
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {isOpen && (
            <motion.div
              className="absolute top-[60px] w-[236px] mt-1 flex flex-col bg-white border border-gray-300 rounded-md overflow-y-scroll"
              variants={slide}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                duration: 0.35,
                type: 'spring',
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-full text-center flex justify-between px-1">
                  <button
                    onClick={() => {
                      setActiveDate(activeDate.subtract(1, 'month'));
                    }}
                    className="p-0.5 flex justify-center items-center"
                  >
                    <Icon.Chevron size={22} direction="left" />
                  </button>
                  <span className="capitalize">
                    {activeDate.format('MMMM')}
                  </span>
                  <button
                    onClick={() => {
                      setActiveDate(activeDate.add(1, 'month'));
                    }}
                    className="p-0.5 flex justify-center items-center"
                  >
                    <Icon.Chevron size={20} direction="right" />
                  </button>
                </div>
                <div className="flex-1 grid grid-cols-7 py-1 px-2 gap-1">
                  {Array.from({ length: 7 }).map((_, index) => {
                    const weekday = activeDate
                      .day(index + 1)
                      .format('dd')
                      .substring(0, 1);
                    return (
                      <div
                        key={index}
                        className="text-center text-sm font-medium text-gray-400 uppercase"
                      >
                        {weekday}
                      </div>
                    );
                  })}

                  {/* Fill the remaining of the first week with previous month's dates */}
                  {Array.from({
                    length: startFill,
                  }).map((_, index) => {
                    const fill = activeDate
                      .date(1)
                      .subtract(startFill - index, 'day');
                    return (
                      <div
                        key={`fill-${index}`}
                        className={classNames(
                          'flex justify-center items-center text-sm w-7  h-7 cursor-pointer',
                          'text-gray-300 rounded-full border border-transparent hover:border-gray-200',
                        )}
                        onClick={handleOnDateClick(name, fill)}
                      >
                        {fill.format('D')}
                      </div>
                    );
                  })}

                  {/* Generate all dates in the month */}
                  {Array.from({ length: activeDate.daysInMonth() }).map(
                    (_, index) => {
                      const date = activeDate.date(1);
                      const day = date.add(index, 'day');
                      return (
                        <div
                          key={day.format('D')}
                          onClick={handleOnDateClick(name, day)}
                          className={classNames(
                            'flex justify-center items-center text-sm w-7  h-7 rounded-full border cursor-pointer',
                            day.isSame(dayjs(), 'day')
                              ? 'border-green-400 hover:border-green-400'
                              : 'border-transparent hover:border-green-200',
                            day.isSame(dayjs(selectedDate), 'day')
                              ? 'bg-green-400'
                              : 'bg-transparent',
                          )}
                        >
                          {day.format('D')}
                        </div>
                      );
                    },
                  )}

                  {/* Fill the remaining of the last week with next month's dates */}
                  {Array.from({
                    length: endFill,
                  }).map((_, index) => {
                    const fill = activeDate
                      .endOf('month')
                      .add(index + 1, 'day');
                    return (
                      <div
                        key={`fill-${index}`}
                        className={classNames(
                          'flex justify-center items-center text-sm w-7 h-7 cursor-pointer',
                          'text-gray-300 rounded-full border border-transparent hover:border-gray-200',
                        )}
                        onClick={handleOnDateClick(name, fill)}
                      >
                        {fill.format('D')}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="text-sm text-red-600 h-5">
          {fieldState.error?.message}
        </div>
      </div>
    </>
  );
};
DatePicker.displayName = 'DatePicker';
