'use client';

import { FC, useMemo } from 'react';
import { AnimatedBar } from './AnimatedBar';
import { transform } from 'framer-motion';

type BarGraphProps = {
  data: { value: number; label: string }[];
};
export const BarGraph: FC<BarGraphProps> = ({ data }) => {
  const max = useMemo(
    () => Math.max(...data.map(({ value }) => value)),
    [data],
  );

  return (
    <div className="h-[168px] flex-1 flex justify-between gap-2.5 relative overflow-hidden">
      {data.map(({ value, label }, index) => {
        const barHeight = transform(value, [0, max], [40, 168]);
        return (
          <AnimatedBar
            key={index}
            currentUser={!index}
            height={barHeight}
            label={label}
            value={value}
          />
        );
      })}
    </div>
  );
};
BarGraph.displayName = 'BarGraph';
