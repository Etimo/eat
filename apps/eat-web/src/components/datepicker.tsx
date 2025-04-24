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
import { useState } from 'react';

type DatePickerProps = ControllerRenderProps & { maxDate?: Date };
export function DatePicker(field: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
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
          onSelect={(value) => {
            field.onChange(value);
            setOpen(false);
          }}
          initialFocus
          disabled={(date) => (field.maxDate ? date > field.maxDate : false)}
        />
      </PopoverContent>
    </Popover>
  );
}
