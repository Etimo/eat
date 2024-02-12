import { FC, useMemo } from 'react';
import { Box, Heading, Pressable, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'solito/navigation';
import { useUsersStore, useDataStore } from '@shared/zustand';
import { HistoryItem } from './HistoryItem';
import Reanimated, { FadeInLeft } from 'react-native-reanimated';

export const RecentActivites: FC = () => {
  const router = useRouter();
  const { getCurrentUser } = useUsersStore();
  const { getAllUserActivities } = useDataStore();

  const recent = useMemo(() => {
    return getAllUserActivities(getCurrentUser())
      .reverse()
      .flatMap((x) =>
        x.data.flatMap((y) =>
          y.activities.map(({ activity, time }) => ({
            date: x.key,
            activity,
            time,
          })),
        ),
      )
      .slice(0, 3);
  }, []);

  return (
    <Box flex={1} height={266} flexDirection="column">
      <Pressable flex={1} onPress={() => router.push('/history')}>
        <Heading size="lg" color="$white" mb="$2">
          Recent
        </Heading>
        <VStack space="xs" flex={1} justifyContent="space-between">
          {recent.map(({ activity, date, time }, index) => (
            <Reanimated.View key={index} entering={FadeInLeft.duration(600)}>
              <HistoryItem
                key={index}
                name={activity.name}
                time={time}
                date={date}
              />
            </Reanimated.View>
          ))}
        </VStack>
      </Pressable>
    </Box>
  );
};
RecentActivites.displayName = 'RecentActivites';
