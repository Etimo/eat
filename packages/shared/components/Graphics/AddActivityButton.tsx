import { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';

export const AddActivityButton: FC = () => {
  return (
    <Svg height="64" width="56" viewBox="0 0 55 64">
      <Path
        fill="#22c55e"
        d="M25.11473670974872 1.4999999999999998Q27.712812921102035 0 30.31088913245535 1.5L52.827549630850754 14.5Q55.42562584220407 16 55.42562584220407 19L55.42562584220407 45Q55.42562584220407 48 52.827549630850754 49.5L30.31088913245535 62.5Q27.712812921102035 64 25.11473670974872 62.5L2.598076211353316 49.5Q0 48 0 45L0 19Q0 16 2.598076211353316 14.5Z"
      />
      <G x={7} y={11}>
        <Path stroke="white" strokeWidth={2} d="M5 12h14" scale={1.7} />
        <Path stroke="white" strokeWidth={2} d="M12 5v14" scale={1.7} />
      </G>
    </Svg>
  );
};
AddActivityButton.displayName = 'AddActivityButton';
