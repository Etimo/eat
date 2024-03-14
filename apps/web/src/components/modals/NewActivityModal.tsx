'use client';
import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ModalCloseButton } from '.';
import { DatePicker, SelectInput, TextInput } from '../form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../buttons';
import { ActivityType, CreateActivity } from '@/types';
import { useModal } from '@/hooks';

const currentUser = '941a7069-ba45-4670-ab27-6411b9049441';

const formSchema = z.object({
  activityType: z.string(),
  date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
  time: z.preprocess(
    (t) => parseInt(z.string().parse(t || '0'), 10),
    z.number().gte(1, 'Must be larger than 0'),
  ),
});
type FormData = Omit<CreateActivity, 'user'>;

export const NewActivityModal: FC = () => {
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const { closeModal } = useModal();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const body: CreateActivity = {
      user: currentUser,
      ...data,
    };

    const act = await fetch('/api/activity', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (act) {
      closeModal();
    }
  };

  useEffect(() => {
    const getAcitivtyTypes = async () => {
      const response: { activityTypes: ActivityType[] } = await fetch(
        '/api/activitytypes',
      ).then((res) => res.json());

      setActivityTypes(response.activityTypes);
    };

    getAcitivtyTypes();
  }, []);

  return (
    <div className="bg-white text-gray-800 relative rounded-t-lg md:rounded-lg flex flex-col p-4 pt-8 h-[40%] xs:h-auto">
      <h2 className="text-xl font-semibold -mt-4 text-center">New activity</h2>
      <ModalCloseButton />
      <FormProvider {...form}>
        <div className="flex flex-col -gap-1">
          <SelectInput
            label="Activity"
            name="activityType"
            options={activityTypes.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
          />
          <div className="flex gap-4">
            <DatePicker label="Date" name="date" />
            <TextInput label="Time" name="time" type="number" />
          </div>
          <div className="flex justify-end">
            <Button
              label="Log activity"
              onClick={form.handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
NewActivityModal.displayName = 'NewActivityModal';
