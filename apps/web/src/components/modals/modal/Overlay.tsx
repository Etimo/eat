import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

type OverlayProps = {
  children: ReactNode;
  onClick: () => void;
};
export const Overlay: FC<OverlayProps> = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="bg-black/30 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
