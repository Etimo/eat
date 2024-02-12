import { Ref, forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheet } from './BottomSheet';
import { VStack, Text } from '@gluestack-ui/themed';

type ChangeRangeSheetProps = {};
export const ChangeRangeSheet = forwardRef<
  BottomSheetModal,
  ChangeRangeSheetProps
>((_, ref: Ref<BottomSheetModal>) => {
  return (
    <BottomSheet
      ref={ref}
      snapPoints={['25%', '50%']}
      bottomInset={100}
      detached
    >
      <VStack h="$full" px="$4" space="lg"></VStack>
    </BottomSheet>
  );
});
ChangeRangeSheet.displayName = 'ChangeRangeSheet';
