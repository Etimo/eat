import { FC, ReactNode } from 'react';

type CardProps = {
  title?: string;
  children: ReactNode;
};
export const Card: FC<CardProps> = (props) => {
  const { children, title } = props;
  return (
    <section className="drop-shadow-xl">
      {title && <h2 className="font-medium text-xl mb-2">{title}</h2>}
      <div className="w-full rounded-xl bg-etimo px-6 py-4">{children}</div>
    </section>
  );
};
Card.displayName = 'Card';
