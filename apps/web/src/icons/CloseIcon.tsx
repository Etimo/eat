import { FC } from 'react';
import { IconBase, IconBaseProps } from './IconBase';

type CloseIconProps = Omit<IconBaseProps, 'children'>;
export const CloseIcon: FC<CloseIconProps> = (props) => {
  return (
    <IconBase {...props}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </IconBase>
  );
};
CloseIcon.displayName = 'CloseIcon';
