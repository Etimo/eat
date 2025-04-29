import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { trpc } from '@/trpc';
import dayjs from 'dayjs';
import { DatePicker } from '../datepicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ActivityTypeAutocomplete } from '../activity-type-autocomplete';
import { useState } from 'react';

const formSchema = z.object({
  activityType: z.string().min(1, { message: 'Aktivitetstyp krävs' }),
  date: z.date(),
  time: z.coerce.number().min(1, { message: 'Minst 1 minut' }),
});
type FormInputs = z.infer<typeof formSchema>;

type Props = {
  onFinish: () => void;
};
export function AddActivityForm(props: Props) {
  const { onFinish } = props;

  const activityTypesQuery = trpc.activityTypes.list.useQuery();
  const submitForm = trpc.activities.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      onFinish();
    },
  });

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityType: '',
      date: dayjs().toDate(),
      time: 0,
    },
  });

  const onSubmit = (values: FormInputs) => {
    submitForm.mutate({
      activityType: values.activityType,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      minutes: values.time,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <h2 className="text-lg font-semibold text-etimo">Lägg till aktivtet</h2>
        <FormField
          control={form.control}
          name="activityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aktivtetstyp</FormLabel>
              <FormControl>
                <ActivityTypeAutocomplete
                  name="activityType"
                  selectedValue={field.value}
                  onSelectedValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minuter</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Datum</FormLabel>
              <FormControl>
                <DatePicker {...field} maxDate={dayjs().toDate()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit">Lägg till</Button>
        </div>
      </form>
    </Form>
  );
}
