import {
  Badge,
  BadgeText,
  HStack,
  Pressable,
  ScrollView,
} from '@gluestack-ui/themed';
import { ActivityType } from '@shared/types';
import { FC, useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import Reaniamted, {
  SharedValue,
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ActivityFiltersProps = {
  active: string;
  setActive: (filter: string) => void;
  activityTypes: ActivityType[];
};
export const ActivityFilters: FC<ActivityFiltersProps> = (props) => {
  const { activityTypes, active, setActive } = props;
  const activeBadgeColor = useCallback(
    (badge: string) => {
      return {
        text: active == badge ? '$blueGray700' : '$white',
        background: active == badge ? '$green500' : '$blueGray700',
      };
    },
    [active],
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack>
        {activityTypes.map(({ name }) => (
          <Pressable key={name + '-index'} onPress={() => setActive(name)}>
            {/* <AnimatedBadge active={active} name={name} /> */}
            <Badge
              size="lg"
              px="$5"
              py="$2"
              mx="$1"
              variant="outline"
              borderRadius="$full"
              action="success"
              bg={activeBadgeColor(name).background}
              borderWidth={0}
            >
              <BadgeText color={activeBadgeColor(name).text}>{name}</BadgeText>
            </Badge>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
};
ActivityFilters.displayName = 'ActivityFilters';

const AnimatedView = Reaniamted.createAnimatedComponent(View);
const AnimatedText = Reaniamted.createAnimatedComponent(Text);
type AnimatedBadgeProps = {
  active: string;
  name: string;
};
const AnimatedBadge: FC<AnimatedBadgeProps> = ({ active, name }) => {
  const isActive = useSharedValue(0);

  useEffect(() => {
    if (active === name) {
      isActive.value = withTiming(1);
    } else {
      isActive.value = withTiming(0);
    }
  }, [active]);
  return (
    <AnimatedView
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: interpolateColor(
          isActive.value,
          [0, 1],
          ['red', 'green'],
        ),
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 999,
      }}
    >
      <AnimatedText
        style={{ color: 'white', fontSize: 16, textTransform: 'uppercase' }}
      >
        {name}
      </AnimatedText>
    </AnimatedView>
  );
};
AnimatedBadge.displayName = 'AnimatedBadge';
