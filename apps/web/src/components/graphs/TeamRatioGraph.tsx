import { transform } from 'framer-motion';
import { FC } from 'react';

type TeamRatioGraphProps = {
  data: { user: number; team: number };
};
export const TeamRatioGraph: FC<TeamRatioGraphProps> = ({ data }) => {
  const total = data.team + data.user;
  const user = transform(data.user, [0, total], [0, 100]);

  return (
    <div className="relative">
      {/* No data */}
      <div
        className="text-[0px]"
        style={{ position: total === 0 ? 'relative' : 'absolute' }}
      >
        <div className="pie" style={{ '--p': 100, '--c': '#1C2732' } as any} />
      </div>

      {/* USER */}
      <div
        className="text-[0px]"
        style={{ position: data.team === 0 ? 'relative' : 'absolute' }}
      >
        {data.user > 0 && (
          <div
            className="pie rounded animate"
            style={{ '--p': user, '--c': '#4ade80' } as any}
          />
        )}
      </div>

      {/* TEAM */}
      <div
        className="relative text-[0px]"
        style={{
          transform: `rotate(${(data.user / (data.user + data.team)) * 360}deg)`,
        }}
      >
        {data.team > 0 && (
          <div
            className="pie rounded animate"
            style={{ '--p': 100 - user, '--c': '#f87171' } as any}
          />
        )}
      </div>
    </div>
  );
};
TeamRatioGraph.displayName = 'TeamRatioGraph';
