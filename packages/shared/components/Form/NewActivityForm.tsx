import { useForm } from 'react-hook-form';

import { FC } from 'react';
import { z } from 'zod';
import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { PlusIcon } from 'lucide-react-native';
import { PlusCircleIcon, TimerIcon } from 'lucide-react-native';
import { NumberInput, TextInput } from './FormInput';

const newActivitySchema = z.object({
  activity: z.string(),
  time: z.string().optional(),
});

type NewActivitySchema = z.infer<typeof newActivitySchema>;

export const NewActivityForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewActivitySchema>();

  const onSubmit = (data: NewActivitySchema) => console.log(data);

  return (
    <View>
      <TextInput
        name="activity"
        control={control}
        rules={{ required: { value: true, message: 'Activity is required' } }}
        placeholder="Enter activity"
        label="Activity"
        errors={errors}
        icon={<PlusCircleIcon color={'#ffffff'} />}
        assistiveText="The performed activity"
      />
      <NumberInput
        name="time"
        control={control}
        rules={{
          validate: (value: string) =>
            parseInt(value, 10) > 0 || 'Value must be greater than 0',
          required: { value: true, message: 'Time is required' },
          pattern: {
            value: /^[0-9]*$/,
            message: 'Only numbers are allowed',
          },
        }}
        placeholder="Enter time"
        label="Time"
        errors={errors}
        icon={<TimerIcon color={'#ffffff'} />}
        assistiveText="Activity duration in minutes"
      />
      <Button onPress={handleSubmit(onSubmit)} mt="$6">
        <PlusIcon color="#ffffff" />
        <ButtonText ml="$2">ADD ACTIVITY</ButtonText>
      </Button>
    </View>
  );
};
NewActivityForm.displayName = 'NewActivityForm';
