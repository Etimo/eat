import { Heading, VStack } from '@gluestack-ui/themed';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ref, forwardRef } from 'react';
import { BottomSheet } from './BottomSheet';
import { NewActivityForm } from '../Form/NewActivityForm';

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
        <NewActivityForm />
      </VStack>
    </BottomSheet>
  );
});
NewActivitySheet.displayName = 'NewActivitySheet';
