import { FC, ReactElement } from 'react';

export type IconBaseProps = {
  children: ReactElement;
  className?: string;
  size?: number;
};
export const IconBase: FC<IconBaseProps> = (props) => {
  const { children, className, size = 24 } = props;
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size}
        viewBox="0 -960 960 960"
        width={size}
        fill="currentColor"
      >
        {children}
      </svg>
    </div>
  );
};
IconBase.displayName = 'IconBase';
