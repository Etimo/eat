import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { CalendarIcon, MenuIcon } from 'lucide-react-native';
import { FC, useCallback, useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Reaniamted, {
  FadeInDown,
  FadeInUp,
  FadeOut,
  interpolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// const items = ['Today', 'Week', 'Month', 'Total'];

type DropdownMenuProps = {
  backgroundStyles?: StyleProp<ViewStyle>;
  items: string[];
};

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const { backgroundStyles, items } = props;
  const [selected, setSelected] = useState(items[1]);
  const [visible, setVisible] = useState(false);

  const isLast = useCallback(
    (item: string) => {
      const index = items.indexOf(item);
      return index === items.length - 1;
    },
    [items],
  );
  const isFirst = useCallback(
    (item: string) => {
      const index = items.indexOf(item);
      return index === 0;
    },
    [items],
  );

  return (
    <Box position="relative" flex={1} alignItems="flex-end">
      <Pressable onPress={() => setVisible((prev) => !prev)}>
        <HStack alignItems="center" space="xs">
          <Text size="md" color="$white">
            {selected}
          </Text>
          <CalendarIcon size={16} color="white" />
        </HStack>
      </Pressable>
      {visible && (
        <Reaniamted.View
          entering={FadeInUp}
          exiting={FadeOut}
          style={[
            {
              backgroundColor: '#ffffff',
              elevation: 5,
              position: 'absolute',
              right: 0,
              top: 30,
              zIndex: 5,
              borderRadius: 8,
            },
            backgroundStyles,
          ]}
        >
          <VStack w="$full">
            {items.map((item, index) => (
              <Pressable
                key={item}
                onPress={() => {
                  setSelected(item);
                  setVisible(false);
                }}
                // borderBottomWidth={index === items.length - 1 ? 0 : 1}
                px="$5"
                pr="$12"
                borderStartStartRadius={isFirst(item) ? 8 : 0}
                borderStartEndRadius={isFirst(item) ? 8 : 0}
                borderBottomEndRadius={isLast(item) ? 8 : 0}
                borderBottomStartRadius={isLast(item) ? 8 : 0}
                bg={selected === item ? '$blueGray300' : '$white'}
              >
                <Text py="$2">{item}</Text>
              </Pressable>
            ))}
          </VStack>
        </Reaniamted.View>
      )}
    </Box>
  );
};
DropdownMenu.displayName = 'DropdownMenu';
