import { Box, HStack, Text } from '@gluestack-ui/themed';
import { TrophyIcon } from 'lucide-react-native';
import { FC } from 'react';
import Reanimated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';

type HistoryItemProps = {
  name: string;
  time: number;
  date: string;
};
export const HistoryItem: FC<HistoryItemProps> = ({ date, name, time }) => {
  return (
    <Reanimated.View entering={FadeInLeft} exiting={FadeOutRight}>
      <Box borderRadius="$xl" my="$0" py="$2.5" bg="#273646" softShadow="1">
        <HStack px="$4" space="md" alignItems="center">
          <Box
            alignItems="center"
            justifyContent="space-between"
            bg="$green500"
            p="$3.5"
            borderRadius="$full"
          >
            <TrophyIcon size={24} color="#161f28" />
          </Box>
          <HStack flex={1} alignItems="center" justifyContent="space-between">
            <Box>
              <Text size="md" color="$white" fontWeight="$semibold">
                {name}
              </Text>
              <Text size="lg" color="$white" mt={-4} fontWeight="$light">
                {time} min
              </Text>
            </Box>
            <Text color="$white" size="md">
              {date}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </Reanimated.View>
  );
};
HistoryItem.displayName = 'RecentItem';
