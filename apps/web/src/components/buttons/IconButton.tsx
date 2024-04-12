'use client';

import { Icon, IconVariants } from '@/icons';
import { FC, useCallback, useMemo } from 'react';
import { ColorVariants, Colors } from './variants';
import classNames from 'classnames';

type IconButtonProps = {
  color?: ColorVariants;
  variant: IconVariants;
  onClick: () => void;
} & React.ComponentProps<'button'>;

export const IconButton: FC<IconButtonProps> = (props) => {
  const {
    color = 'primary',
    variant,
    disabled,
    onClick,
    ...buttonProps
  } = props;

  const icon = useMemo(() => {
    const Variant = Icon[variant];
    return <Variant size={22} />;
  }, [variant]);

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button
      className={classNames(
        `${Colors[color]}`,
        'rounded-full p-1',
        'active:scale-[0.99] duration-200 transition-colors',
        disabled
          ? 'text-white/75 bg-gray-400/75 border border-transparent pointer-events-none'
          : '',
      )}
      onClick={handleClick}
      disabled={disabled}
      {...buttonProps}
    >
      {icon}
    </button>
  );
};
IconButton.displayName = 'IconButton';
