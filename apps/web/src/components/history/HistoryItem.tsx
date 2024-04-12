import { Icon } from '@/icons';
import { Activity } from '@/types/Activity';
import { FC } from 'react';

type HistoryItemProps = {
  activity: Activity;
};
export const HistoryItem: FC<HistoryItemProps> = ({ activity }) => {
  return (
    <div className="flex items-center gap-2 w-full bg-etimo py-2 pl-3 pr-4 rounded-xl">
      <div className="w-12 h-12 bg-green-400 text-gradient-start rounded-full flex justify-center items-center">
        {/* 
          TODO: André, 2024-03-07
          Replace the sun icon, ideally with an icon related to the acitvity. 
          Placeholder for new activity types without icon  
        */}
        <Icon.Sun size={30} />
      </div>
      <div className="flex-1 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-lg">{activity.activityType.name}</div>
          <div className="text-xl font-medium">{activity.time} min</div>
        </div>
        <div className="text-lg">{activity.date}</div>
      </div>
    </div>
  );
};
HistoryItem.displayName = 'HistoryItem';
