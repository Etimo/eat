import { FC } from 'react';

type GlobalContextProvidersProps = {
  children: React.ReactNode;
};

/**
 * Component for all global context providers
 */
export const GlobalContextProviders: FC<GlobalContextProvidersProps> = ({
  children,
}) => {
  return <>{children}</>;
};
GlobalContextProviders.displayName = 'GlobalContextProviders';
