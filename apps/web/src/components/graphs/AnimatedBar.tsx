'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimatedBarProps = {
  currentUser: boolean;
  height: number;
  label: string;
  value: number;
};
export const AnimatedBar: FC<AnimatedBarProps> = (props) => {
  const { currentUser, height, label, value } = props;
  return (
    <motion.div
      className={cn(
        'flex flex-col justify-between items-center flex-1 rounded-t-lg',
        'font-medium text-white text-xs min-w-0 overflow-hidden',
        currentUser ? 'bg-green-400' : 'bg-red-400',
        value === 0 ? 'bg-gray-400' : '',
      )}
      initial={{
        height: 0,
        y: 168,
      }}
      animate={{
        height,
        y: 168 - height,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="mt-1">{value} min</div>
      <div className="mb-1 flex min-w-0 truncate">
        <span>{label}</span>
      </div>
    </motion.div>
  );
};
AnimatedBar.displayName = 'AnimatedBar';
