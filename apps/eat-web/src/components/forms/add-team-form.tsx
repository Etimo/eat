import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { trpc } from '@/trpc';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type FormInput = {
  name: string;
};
const formSchema = z.object({
  name: z.string(),
});

type Props = {
  onFinish: () => void;
};

export const AddTeamForm = (props: Props) => {
  const { onFinish } = props;
  const submitForm = trpc.teams.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      onFinish();
    },
  });
  const formMethods = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  });
  const { control, handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<FormInput> = (values) => {
    submitForm.mutate({ name: values.name });
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-etimo">Skapa nytt lag</h2>
        <FormField
          control={control}
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
};
