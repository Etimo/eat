'use client';
import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ModalCloseButton } from '.';
import { MultiSelectInput, TextInput } from '../form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../buttons';
import { CreateTeam, User } from '@/types';
import { useModal } from '@/hooks';
import { usePathname } from 'next/navigation';

const formSchema = z.object({
  name: z.string(),
  users: z.optional(z.string()),
});
type FormData = {
  name: string;
  users: string;
};

export const AddTeamModal: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { closeModal } = useModal();
  const pathname = usePathname();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const competition = pathname.substring(pathname.lastIndexOf('/') + 1);
    const body: CreateTeam = {
      name: data.name,
      users: data.users.length ? data.users.split(',').filter(Boolean) : [],
      competition,
    };

    try {
      const team = await fetch('/api/team', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (team) {
        closeModal();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response: { users: User[] } = await fetch('/api/users').then(
        (res) => res.json(),
      );

      setUsers(response.users);
    };

    getUsers();
  }, []);

  return (
    <div className="bg-white text-gray-800 relative rounded-t-lg md:rounded-lg flex flex-col p-4 pt-8 h-[40%] xs:h-auto">
      <h2 className="text-xl font-semibold -mt-4 text-center">New team</h2>
      <ModalCloseButton />
      <FormProvider {...form}>
        <div className="flex flex-col -gap-1">
          <TextInput label="Name" name="name" />
          <MultiSelectInput
            label="Users"
            name="users"
            options={users.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
          />
          <div className="flex justify-end">
            <Button label="Create team" onClick={form.handleSubmit(onSubmit)} />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
AddTeamModal.displayName = 'AddTeamModal';
