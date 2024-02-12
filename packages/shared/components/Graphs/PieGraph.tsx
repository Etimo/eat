import { Box } from '@gluestack-ui/themed';
import { FC, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import Renimated, {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

const ReanimatedCircle = Renimated.createAnimatedComponent(Circle);

const calculateCircleCircumference = (radius: number) => 2 * Math.PI * radius;
const calculatePercentage = (value: number, total: number) =>
  (value / total) * 100;

type PieGraphProps = {
  size: number;
  data: any;
};

export const PieGraph: FC<PieGraphProps> = ({ size }) => {
  const radius = 70;

  const user = 50;
  const team = 135;
  const total = user + team;

  const userAngle = (user / total) * 360;
  const circleCircumference = useMemo(
    () => calculateCircleCircumference(radius),
    [],
  );

  const userPercentage = useSharedValue(
    Platform.OS === 'web' ? calculatePercentage(user, total) : 0,
  );
  const teamPercentage = useSharedValue(
    Platform.OS === 'web' ? calculatePercentage(team, total) : 0,
  );

  const userStrokeDashoffset = useDerivedValue(
    () =>
      circleCircumference - (circleCircumference * userPercentage.value) / 100,
  );
  const teamStrokeDashoffset = useDerivedValue(
    () =>
      circleCircumference - (circleCircumference * teamPercentage.value) / 100,
  );

  useEffect(() => {
    userPercentage.value = withTiming(calculatePercentage(user, total), {
      duration: 400,
    });
  }, []);

  useAnimatedReaction(
    () => {
      return userPercentage.value;
    },
    (currentValue) => {
      if (currentValue === calculatePercentage(user, total)) {
        teamPercentage.value = withTiming(calculatePercentage(team, total), {
          duration: 1000,
        });
      }
    },
  );

  return (
    <Box justifyContent="center" alignItems="flex-end">
      <Svg
        height={size}
        width={size}
        viewBox="0 0 180 180"
        style={{ backgroundColor: 'blue' }}
      >
        <G rotation={-90} originX="90" originY="90">
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#1C2732"
            fill="transparent"
            strokeWidth="40"
          />
          <ReanimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#f87171"
            fill="transparent"
            strokeWidth="40"
            strokeDasharray={circleCircumference}
            strokeDashoffset={teamStrokeDashoffset}
            rotation={userAngle}
            originX="90"
            originY="90"
            strokeLinecap="round"
          />
          <ReanimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#22c55e"
            fill="transparent"
            strokeWidth="40"
            strokeDasharray={circleCircumference}
            strokeDashoffset={userStrokeDashoffset}
            rotation={0}
            originX="90"
            originY="90"
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </Box>
  );
};
PieGraph.displayName = 'PieGraph';
