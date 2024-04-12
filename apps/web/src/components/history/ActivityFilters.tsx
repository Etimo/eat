import { getActivityTypesByUser } from '@/api';
import classNames from 'classnames';
import { FC } from 'react';

const currentUser = '941a7069-ba45-4670-ab27-6411b9049441';

export const ActivityFilters: FC = async () => {
  const activityTypes = await getActivityTypesByUser(currentUser);
  return (
    <div className="flex flex-row space-x-2 overflow-x-scroll">
      {activityTypes.map(({ name }, index) => (
        <div
          key={index}
          className={classNames(
            'px-5 py-2 font-medium rounded-full cursor-pointer',
            'bg-green-400 text-gray-800',
            'hover:bg-green-400/95 hover:text-gray-900 active:bg-green-400/85',
            'transition-all duration-200 ease-in-out',
          )}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
ActivityFilters.displayName = 'ActivityFilters';
