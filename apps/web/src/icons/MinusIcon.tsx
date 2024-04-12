import { FC } from 'react';
import { IconBase, IconBaseProps } from './IconBase';

type MinusIconProps = Omit<IconBaseProps, 'children'>;
export const MinusIcon: FC<MinusIconProps> = (props) => {
  return (
    <IconBase {...props}>
      <path d="M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z" />
    </IconBase>
  );
};
MinusIcon.displayName = 'MinusIcon';
