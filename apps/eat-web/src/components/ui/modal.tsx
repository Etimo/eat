import { useModal } from '@/hooks/use-modal';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XIcon } from 'lucide-react';

type Props = {
  isOpen: boolean;
};

export const Modal = (props: React.PropsWithChildren<Props>) => {
  const { children, isOpen } = props;

  const { closeModal } = useModal();

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="absolute top-[8px] right-[12px] hidden sm:block">
              <button
                data-testid="close-modal-button"
                type="button"
                className="cursor-pointer rounded-md text-etimo hover:text-etimo/75 focus:outline-none"
                onClick={closeModal}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
