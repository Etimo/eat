import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FC } from 'react';

type TabProps = {
  active: boolean;
  name: string;
  onClick: () => void;
};
export const Tab: FC<TabProps> = (props) => {
  const { active, name, onClick } = props;
  return (
    <motion.div
      layout
      className={classNames(
        active ? 'text-white' : 'text-gray-300',
        'hover:border-etimo hover:text-white',
        'transition-colors duration-200',
        'border border-transparent rounded-md px-3 py-2 text-sm font-medium cursor-pointer relative',
      )}
      onClick={onClick}
    >
      <div className="relative z-20">{name}</div>
      {active && (
        <motion.div
          className="absolute bg-etimo rounded-md top-0 bottom-0 left-0 right-0 z-10"
          layoutId="background"
        />
      )}
    </motion.div>
  );
};
Tab.displayName = 'Tab';
