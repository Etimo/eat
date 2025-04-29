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
import { useEffect } from 'react';

type FormInput = {
  name: string;
};
const formSchema = z.object({
  name: z.string(),
});

type Props = {
  id: string;
  onFinish: () => void;
};

export const UpdateTeamForm = (props: Props) => {
  const { onFinish } = props;
  const { data: team } = trpc.teams.get.useQuery(props.id, {
    enabled: !!props.id,
  });

  const submitForm = trpc.teams.update.useMutation({
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

  useEffect(() => {
    if (team) {
      formMethods.setValue('name', team.name);
    }
  }, [team, formMethods]);

  const onSubmit: SubmitHandler<FormInput> = (values) => {
    submitForm.mutate({ id: props.id, name: values.name });
  };
  console.log(props.id)

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-etimo">Redigera lag</h2>
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
          <Button type="submit">Spara</Button>
        </div>
      </form>
    </Form>
  );
};
