import { FC, useEffect } from 'react';
import { Card } from './Card';
import { Box, Divider, HStack, Text, VStack } from '@gluestack-ui/themed';
import { TeamRatioGraph } from '../Graphs';
import {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedTextValue } from '../Animation';
import { Platform } from 'react-native';
import { useDataStore, useUsersStore } from '@shared/zustand';

export const ActivityCard: FC = () => {
  const { getCurrentUser } = useUsersStore();
  const { getUserDayMinutes, getTeamDayMinutes } = useDataStore();

  const totalUser = getUserDayMinutes(getCurrentUser(), '2023-05-03');
  const totalTeam = getTeamDayMinutes(
    getCurrentUser().teamId,
    '2023-05-03',
  ).reduce((total, { time }) => total + time, 0);

  const userMinutes = useSharedValue(Platform.OS === 'web' ? totalUser : 0);
  const animatedUserMinutes = useDerivedValue(
    () => `${userMinutes.value.toFixed(0)} min`,
  );

  const teamMinutes = useSharedValue(Platform.OS === 'web' ? totalTeam : 0);
  const animatedTeamMinutes = useDerivedValue(
    () => `${teamMinutes.value.toFixed(0)} min`,
  );

  useEffect(() => {
    userMinutes.value = withTiming(totalUser, { duration: 400 });
  }, []);

  useAnimatedReaction(
    () => {
      return userMinutes.value;
    },
    (currentValue) => {
      if (currentValue === totalUser) {
        teamMinutes.value = withTiming(totalTeam, {
          duration: 1000,
        });
      }
    },
  );

  return (
    <Card title="Today's activity">
      <VStack>
        <HStack px="$6" alignItems="center" justifyContent="space-between">
          <VStack space="xs">
            <Box>
              <Text size="xl" color="$white" fontWeight="$semibold" mb={-6}>
                You
              </Text>
              <AnimatedTextValue
                text={animatedUserMinutes}
                style={{ fontSize: 24, color: '#22c55e' }}
              />
            </Box>
            <Box>
              <Text size="xl" color="$white" fontWeight="$semibold" mb={-6}>
                Team
              </Text>
              <AnimatedTextValue
                text={animatedTeamMinutes}
                style={{ fontSize: 24, color: '#f87171' }}
              />
            </Box>
          </VStack>
          <TeamRatioGraph size={120} data={[50, 135]} />
        </HStack>
        <Divider my="$4" bgColor="#161F28" h="$0.5" />
        <HStack px="$6" justifyContent="space-between">
          <Text size="3xl" color="$white" fontWeight="$semibold">
            Total
          </Text>
          <Text size="3xl" color="$white" fontWeight="$semibold">
            {totalUser + totalTeam} min
          </Text>
        </HStack>
      </VStack>
    </Card>
  );
};
ActivityCard.displayName = 'ActivityCard';
