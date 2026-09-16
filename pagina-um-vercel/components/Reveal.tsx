'use client';

import { useReveal } from '@/hooks/useReveal';

type Props = {
  as?: 'div' | 'article' | 'section';
  className?: string;
  children: React.ReactNode;
};

export default function Reveal({ as: Tag = 'div', className = '', children }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
