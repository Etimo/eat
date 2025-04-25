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

const formSchema = z.object({
  name: z.string().min(1, { message: 'Namn är obligatoriskt' }),
});

type Props = {
  onFinish: () => void;
};
export function AddActivityTypeForm(props: Props) {
  const { onFinish } = props;

  const submitForm = trpc.activityTypes.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      onFinish();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    submitForm.mutate({
      name: values.name,
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

        <div className="pt-4 flex justify-end">
          <Button type="submit">Skapa</Button>
        </div>
      </form>
    </Form>
  );
}
