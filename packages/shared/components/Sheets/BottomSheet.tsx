import { Pressable } from '@gluestack-ui/themed';
import {
  BottomSheetModal,
  BottomSheetProps,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { FC, ReactNode, Ref, forwardRef } from 'react';

type CustomBottomSheetProps = {
  children: ReactNode;
  backdropComponent?: ReactNode;
} & BottomSheetProps;
export const BottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(
  (props, ref: Ref<BottomSheetModal>) => {
    const {
      backdropComponent,
      children,
      enableDynamicSizing = false,
      snapPoints = ['25%', '80%'],
    } = props;
    return (
      <>
        <BottomSheetModal
          ref={ref}
          index={1}
          snapPoints={snapPoints}
          enableDynamicSizing={enableDynamicSizing}
          backdropComponent={() => (
            <BlurTrigger>{backdropComponent}</BlurTrigger>
          )}
          backgroundStyle={{ backgroundColor: '#2c3e50' }}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
        >
          {children}
        </BottomSheetModal>
      </>
    );
  },
);
BottomSheet.displayName = 'BottomSheet';

type BlurTriggerProps = {
  children?: ReactNode;
};
const BlurTrigger: FC<BlurTriggerProps> = ({ children }) => {
  const { dismiss } = useBottomSheetModal();
  return (
    <Pressable
      onPress={() => dismiss()}
      position="absolute"
      w="$full"
      h="$full"
    >
      {children}
    </Pressable>
  );
};
BlurTrigger.displayName = 'BlurTrigger';
