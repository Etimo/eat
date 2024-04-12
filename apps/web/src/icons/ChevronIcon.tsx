import { FC } from 'react';
import { IconBase, IconBaseProps } from './IconBase';

type Directions = 'up' | 'down' | 'left' | 'right';
const Rotations: { [key in Directions]: number } = {
  down: 0,
  left: 90,
  up: 180,
  right: 270,
};

type ChevronIconProps = {
  direction?: Directions;
} & Omit<IconBaseProps, 'children'>;
export const ChevronIcon: FC<ChevronIconProps> = ({
  direction = 'down',
  ...props
}) => {
  return (
    <IconBase {...props}>
      <g
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center',
          transform: `rotate(${Rotations[direction]}deg)`,
        }}
      >
        <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
      </g>
    </IconBase>
  );
};
ChevronIcon.displayName = 'ChevronIcon';
