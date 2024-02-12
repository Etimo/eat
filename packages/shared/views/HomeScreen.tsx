'use client';
import { HStack, Heading, VStack } from '@gluestack-ui/themed';
import { ActivityCard, StandingsCard } from '@shared/components/Card';
import { BaseScreenWrapper } from './BaseScreenWrapper';
import { RecentActivites } from '@shared/components/History';
import { useUsersStore, useDataStore } from '@shared/zustand';
import { HomeScreenAvatar } from '@shared/components/Profile';

export const HomeScreen = () => {
  const { getCurrentUser } = useUsersStore();
  const { getTeamTotalMinutes, getAllTeamsTotalMinutes } = useDataStore();

  return (
    <BaseScreenWrapper isMain>
      <>
        <VStack flex={1} space="xl" w="$full">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="2xl" color="$white">
              Summary
            </Heading>
            <HomeScreenAvatar />
          </HStack>

          <VStack
            space="lg"
            sx={{
              _ios: {
                display: 'none',
              },
              _android: {
                display: 'none',
              },
            }}
          >
            <HStack space="lg">
              <ActivityCard />
              <RecentActivites />
            </HStack>
            <HStack space="lg">
              <StandingsCard
                title="Team"
                data={getTeamTotalMinutes('2').map(({ name, time }) => ({
                  value: time,
                  label: name,
                }))}
                hightlightLabel={getCurrentUser().name}
              />
              <StandingsCard
                title="All"
                data={getAllTeamsTotalMinutes().map(({ name, time }) => ({
                  value: time,
                  label: name,
                }))}
                hightlightLabel={getCurrentUser().team.name}
              />
            </HStack>
          </VStack>
          <VStack
            space="xl"
            sx={{
              _web: {
                display: 'none',
              },
            }}
          >
            <ActivityCard />
            <RecentActivites />
          </VStack>
        </VStack>
      </>
    </BaseScreenWrapper>
  );
};
