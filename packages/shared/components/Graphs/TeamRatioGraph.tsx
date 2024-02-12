import { Box } from '@gluestack-ui/themed';
import { FC, useEffect } from 'react';
import { Platform } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import Renimated, {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedCircle = Renimated.createAnimatedComponent(Circle);

type TeamRatioGraphProps = {
  size: number;
  data: number[];
};

export const TeamRatioGraph: FC<TeamRatioGraphProps> = ({ size }) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const user = 50;
  const team = 135;
  const total = user + team;

  const userAngle = (user / total) * 360;

  const userPercentage = useSharedValue(
    Platform.OS === 'web' ? (user / total) * 100 : 0,
  );
  const teamPercentage = useSharedValue(
    Platform.OS === 'web' ? (team / total) * 100 : 0,
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
    userPercentage.value = withTiming((user / total) * 100, { duration: 400 });
  }, []);

  useAnimatedReaction(
    () => {
      return userPercentage.value;
    },
    (currentValue) => {
      if (currentValue === (user / total) * 100) {
        teamPercentage.value = withTiming((team / total) * 100, {
          duration: 1000,
        });
      }
    },
  );

  return (
    <Box justifyContent="center" alignItems="flex-end">
      <Svg height={size} width={size} viewBox="0 0 180 180">
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
TeamRatioGraph.displayName = 'TeamRatioGraph';
