'use client';
import { Icon, IconVariants } from '@/icons';
import classNames from 'classnames';
import { FC, useCallback, useMemo } from 'react';
import {
  ColorVariants,
  SizeVariants,
  Colors,
  IconSizes,
  Sizes,
} from './variants';

type ButtonProps = {
  label: string;
  color?: ColorVariants;
  size?: SizeVariants;
  icon?: { placement: 'left' | 'right'; variant: IconVariants };
  onClick: () => void;
} & React.ComponentProps<'button'>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    label,
    color = 'primary',
    size = 'medium',
    icon: hasIcon,
    disabled,
    onClick,
    ...buttonProps
  } = props;

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  const icon = useMemo(() => {
    if (hasIcon) {
      const Variant = Icon[hasIcon?.variant];
      return <Variant size={IconSizes[size]} />;
    }
    return <></>;
  }, [hasIcon, size]);

  return (
    <div className="inline-block">
      <button
        className={classNames(
          `${Sizes[size]} ${Colors[color]}`,
          'font-bold active:scale-[0.99] duration-200 transition-colors',
          disabled
            ? 'text-white/75 bg-gray-400/75 border border-transparent pointer-events-none'
            : '',
        )}
        onClick={handleClick}
        disabled={disabled}
        {...buttonProps}
      >
        <div className="flex gap-0.5 items-center">
          {hasIcon && hasIcon.placement === 'left' && <div>{icon}</div>}
          <div>{label}</div>
          {hasIcon && hasIcon.placement === 'right' && <div>{icon}</div>}
        </div>
      </button>
    </div>
  );
};
Button.displayName = 'Button';
