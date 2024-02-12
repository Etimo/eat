import { Heading, VStack } from '@gluestack-ui/themed';
import { ReactNode, FC } from 'react';
import Reanimated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';

type HistoryMonthGroupProps = {
  children: ReactNode;
  month: string;
};
export const HistoryMonthGroup: FC<HistoryMonthGroupProps> = ({
  children,
  month,
}) => {
  return (
    <VStack space="xs">
      <Reanimated.View entering={FadeInLeft} exiting={FadeOutRight}>
        <Heading size="lg" color="$white" my="$2">
          {month}
        </Heading>
        <VStack space="xs">{children}</VStack>
      </Reanimated.View>
    </VStack>
  );
};
HistoryMonthGroup.displayName = 'HistoryMonthGroup';
