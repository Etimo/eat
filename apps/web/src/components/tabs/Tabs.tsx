'use client';
import { FC, ReactElement, useMemo, useState } from 'react';
import { Tab } from './Tab';
import { AnimatePresence, motion } from 'framer-motion';
import { CompetitionsTab, TeamsTab } from './views';

const TabViews: Record<string, ReactElement> = {
  //   Competitions: <CompetitionsTab />,
  Teams: <TeamsTab />,
  'Activity Types': <div>Activity Types</div>,
};

type TabsProps = {};
export const Tabs: FC<TabsProps> = (props) => {
  const {} = props;
  const [activeTab, setActiveTab] = useState('Teams');

  const activeContent = useMemo(() => TabViews[activeTab], [activeTab]);
  return (
    <div>
      <div className="flex gap-2">
        {Object.keys(TabViews).map((tab, index) => (
          <Tab
            key={index}
            name={tab}
            active={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      <section>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};
Tabs.displayName = 'Tabs';
