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
  name: z.string().min(1, { message: 'Namn är obligatoriskt' }),
  teams: z.preprocess(
    (a) => parseInt(z.coerce.string().parse(a), 10),
    z.number().min(1).max(100),
  ),
  range: z.object({
    from: z.date(),
    to: z.date(),
  }),
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
      range: {
        from: new Date(),
        to: dayjs().add(1, 'month').toDate(),
      },
      teams: 4,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitForm.mutate({
      name: values.name,
      teams: values.teams,
      startDate: dayjs(values.range.from).format('YYYY-MM-DD'),
      endDate: dayjs(values.range.to).format('YYYY-MM-DD'),
    });
  };

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
          name="teams"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Antal lag</FormLabel>
              <FormControl>
                <Input {...field} value={field.value.toString()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datum</FormLabel>
              <FormControl>
                <DatePickerWithRange {...field} />
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
