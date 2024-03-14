import { FC } from 'react';
import { ModalProvider } from './modals';

type GlobalContextProvidersProps = {
  children: React.ReactNode;
};

/**
 * Component for all global context providers
 */
export const GlobalContextProviders: FC<GlobalContextProvidersProps> = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};
GlobalContextProviders.displayName = 'GlobalContextProviders';
