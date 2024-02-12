import {
  Box,
  Divider,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { FC, useMemo, useState } from 'react';
import { BarGraph } from '../Graphs';
import { CalendarIcon } from 'lucide-react-native';
import { DropdownMenu } from '../Menu';

type StandingsCardProps = {
  title: string;
  data: { value: number; label: string }[];
  hightlightLabel?: string;
};
export const StandingsCard: FC<StandingsCardProps> = (props) => {
  const { title, hightlightLabel, data } = props;

  const total = useMemo(
    () => data.reduce((total, { value }) => total + value, 0),
    [data],
  );

  const [visible, setVisible] = useState(false);

  return (
    <Box flex={1}>
      <HStack justifyContent="space-between" alignItems="baseline">
        <Pressable onPress={() => setVisible(false)}>
          <Heading size="lg" color="$white" mb="$2">
            {title}
          </Heading>
        </Pressable>

        <DropdownMenu items={['Today', 'Week', 'Month', 'Total']} />
      </HStack>
      <Box
        borderRadius="$xl"
        my="$0"
        py="$4"
        bg="#273646"
        softShadow="4"
        zIndex={-5}
        elevation={-5}
      >
        <Box px="$6">
          <BarGraph
            height={225}
            data={data}
            hightlightLabel={hightlightLabel}
          />
        </Box>
        <Divider my="$4" bgColor="#161F28" h="$0.5" />
        <HStack m="$0" px="$6" justifyContent="space-between">
          <Text size="3xl" color="$white" fontWeight="$semibold">
            Total
          </Text>
          <Text size="3xl" color="$white" fontWeight="$semibold">
            {total} min
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
StandingsCard.displayName = 'StandingsCard';
