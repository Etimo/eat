import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/datepickerwithrange';
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

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  name: z.string(),
});

type Props = {
  onFinish: () => void;
};
export function AddCompetitionForm(props: Props) {
  const { onFinish } = props;

  const submitForm = trpc.competitions.create.useMutation({
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
      startDate: new Date(),
      endDate: dayjs().add(1, 'month').toDate(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitForm.mutate({
      name: values.name,
      startDate: dayjs(values.startDate).toISOString(),
      endDate: dayjs(values.endDate).toISOString(),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <h2 className="text-lg font-semibold text-etimo">Skapa ny tävling</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Namn</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datum</FormLabel>
              <FormControl>
                <DatePickerWithRange />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 flex justify-end">
          <Button type="submit">Skapa</Button>
        </div>
      </form>
    </Form>
  );
}
