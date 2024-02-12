'use client';
import { Heading, VStack } from '@gluestack-ui/themed';
import { FC, useCallback, useMemo, useState } from 'react';
import { BaseScreenWrapper } from './BaseScreenWrapper';
import {
  useAnimationStore,
  useDataStore,
  useUsersStore,
} from '@shared/zustand';
import dayjs from 'dayjs';
import {
  ActivityFilters,
  HistoryItem,
  HistoryMonthGroup,
} from '@shared/components/History';
import { ScrollBasedOpacityWrapper } from '@shared/components/Animation';

const title = 'History';

export const HistoryScreen: FC = () => {
  const { titleScrollOffsetTrigger } = useAnimationStore();
  const { getCurrentUser } = useUsersStore();
  const { getUserActivityTypes, getAllUserActivities } = useDataStore();

  const [activeFilter, setActiveFilter] = useState('All');

  const months = useMemo(() => {
    return [
      ...new Set(
        getAllUserActivities(getCurrentUser())
          .reverse()
          .map((x) => {
            const hasActivities = !!x.data.flatMap((x) =>
              x.activities.filter(
                (z) =>
                  activeFilter == 'All' || z.activity.name === activeFilter,
              ),
            ).length;
            if (hasActivities) {
              return dayjs(x.key).format('MMMM YYYY');
            }
            return null;
          }),
      ),
    ].filter(Boolean);
  }, [activeFilter]);

  const activityPerMonth = useCallback(
    (month: string) => {
      return getAllUserActivities(getCurrentUser())
        .reverse()
        .filter((x) => dayjs(x.key).format('MMMM YYYY') === month)
        .flatMap((x) =>
          x.data.flatMap((y) =>
            y.activities.filter(
              (z) => activeFilter == 'All' || z.activity.name === activeFilter,
            ),
          ),
        );
    },
    [activeFilter],
  );

  return (
    <BaseScreenWrapper title={title} scrollable hideMenu>
      <VStack space="md">
        <ScrollBasedOpacityWrapper trigger={titleScrollOffsetTrigger}>
          <Heading size="2xl" color="$white">
            {title}
          </Heading>
        </ScrollBasedOpacityWrapper>
        <ActivityFilters
          active={activeFilter}
          setActive={setActiveFilter}
          activityTypes={[
            { name: 'All', id: '-1' },
            ...getUserActivityTypes(getCurrentUser()),
          ]}
        />
        {months.map((month, index) => (
          <HistoryMonthGroup month={month ?? ''} key={month + '-' + index}>
            {activityPerMonth(month ?? '').map(({ activity, time }, i) => (
              <HistoryItem
                key={activity.name + '-' + i}
                date={''}
                time={time}
                name={activity.name}
              />
            ))}
          </HistoryMonthGroup>
        ))}
      </VStack>
    </BaseScreenWrapper>
  );
};
HistoryScreen.displayName = 'HistoryScreen';
