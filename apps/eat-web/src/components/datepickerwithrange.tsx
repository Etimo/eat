import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import dayjs from 'dayjs';
import { ControllerRenderProps } from 'react-hook-form';

type DatePickerWithRangeProps = ControllerRenderProps & { maxDate?: Date };
export const DatePickerWithRange = (field: DatePickerWithRangeProps) => {
  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal text-foreground',
              !field.value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {field.value.from ? (
              field.value.to ? (
                <>
                  {dayjs(field.value.from).format('YYYY-MM-DD')} -{' '}
                  {dayjs(field.value.to).format('YYYY-MM-DD')}
                </>
              ) : (
                dayjs(field.value.from).format('YYYY-MM-DD')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={field.value?.from}
            selected={field.value as DateRange}
            onSelect={field.onChange as (date: DateRange | undefined) => void}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
