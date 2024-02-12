'use client';
import { HStack, Heading, VStack } from '@gluestack-ui/themed';
import { StandingsCard } from '@shared/components/Card';
import { FC } from 'react';
import { BaseScreenWrapper } from './BaseScreenWrapper';
import {
  useAnimationStore,
  useDataStore,
  useUsersStore,
} from '@shared/zustand';
import { ScrollBasedOpacityWrapper } from '@shared/components/Animation';

const title = 'Standings';

export const StandingsScreen: FC = () => {
  const { titleScrollOffsetTrigger } = useAnimationStore();
  const { getCurrentUser } = useUsersStore();
  const { getTeamTotalMinutes, getAllTeamsTotalMinutes } = useDataStore();

  return (
    <BaseScreenWrapper title={title} scrollable hideMenu>
      <VStack space="md">
        <ScrollBasedOpacityWrapper trigger={titleScrollOffsetTrigger}>
          <HStack justifyContent="space-between" alignItems="baseline">
            <Heading size="2xl" color="$white">
              {title}
            </Heading>
          </HStack>
        </ScrollBasedOpacityWrapper>
        <VStack space="xl">
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
        </VStack>
      </VStack>
    </BaseScreenWrapper>
  );
};
StandingsScreen.displayName = 'StandingsScreen';
