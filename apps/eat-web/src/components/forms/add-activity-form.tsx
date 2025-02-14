import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { trpc } from '@/trpc';
import dayjs from 'dayjs';
import { DatePicker } from '../datepicker';

const formSchema = z.object({
  activityType: z.string(),
  date: z.date(),
  time: z.number(),
});

type Props = {
  onFinish: () => void;
};
export function AddActivityForm(props: Props) {
  const { onFinish } = props;

  const submitForm = trpc.activities.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      onFinish();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityType: '',
      date: new Date(),
      time: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    submitForm.mutate({
      activityType: values.activityType,
      date: dayjs(values.date).toISOString(),
      minutes: values.time,
    });
  }

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
                <Input {...field} />
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
                <DatePicker />
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
