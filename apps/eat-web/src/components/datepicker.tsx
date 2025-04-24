import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ControllerRenderProps } from 'react-hook-form';

type DatePickerProps = ControllerRenderProps & { maxDate?: Date };
export function DatePicker(field: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full pl-3 text-left font-normal text-foreground',
            !field.value && 'text-muted-foreground',
          )}
        >
          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
          disabled={(date) => (field.maxDate ? date > field.maxDate : false)}
        />
      </PopoverContent>
    </Popover>
  );
}
