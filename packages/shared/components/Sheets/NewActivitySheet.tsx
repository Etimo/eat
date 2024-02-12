import {
  Box,
  Button,
  ButtonText,
  Heading,
  Input,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ref, forwardRef } from 'react';
import { BottomSheet } from './BottomSheet';
import { PlusIcon } from 'lucide-react-native';

type NewActivitySheetProps = {};

export const NewActivitySheet = forwardRef<
  BottomSheetModal,
  NewActivitySheetProps
>((_, ref: Ref<BottomSheetModal>) => {
  return (
    <BottomSheet
      ref={ref}
      snapPoints={['25%', '50%']}
      bottomInset={100}
      detached
    >
      <VStack h="$full" px="$4" space="lg">
        <Heading color="$white" size="xl">
          New Activity
        </Heading>
        <Box>
          <Text color="$white" size="lg">
            Activity
          </Text>
          <Input size="xl" />
          <Text size="xs" color="$white">
            The performed activity
          </Text>
        </Box>
        <Box>
          <Text color="$white" size="lg">
            Time
          </Text>
          <Input size="xl" />
          <Text size="xs" color="$white">
            Activity duration in minutes
          </Text>
        </Box>
        <Button mt="$6">
          <PlusIcon color="#ffffff" />
          <ButtonText ml="$2">ADD ACTIVITY</ButtonText>
        </Button>
      </VStack>
    </BottomSheet>
  );
});
NewActivitySheet.displayName = 'NewActivitySheet';
