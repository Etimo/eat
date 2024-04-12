import { FC, ReactNode } from 'react';
import { Overlay } from './Overlay';
import { Variants, motion } from 'framer-motion';

const fade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

const slide: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.35,
      type: 'tween',
      ease: 'circInOut',
    },
  },
  exit: {
    y: '100%',
  },
};

type ModalProps = {
  handleClose: () => void;
  content: ReactNode;
};
export const Modal: FC<ModalProps> = ({ handleClose, content }) => {
  return (
    <Overlay onClick={handleClose}>
      <div className="hidden md:flex justify-center items-center">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col w-[400px]"
          variants={fade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div>{content}</div>
        </motion.div>
      </div>
      <div className="flex flex-col md:hidden w-full h-full">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="w-full flex-1 flex flex-col"
          variants={slide}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex-1 flex flex-col">
            <div className="flex-1" onClick={handleClose} />
            {content}
          </div>
        </motion.div>
      </div>
    </Overlay>
  );
};
Modal.displayName = 'Modal';
