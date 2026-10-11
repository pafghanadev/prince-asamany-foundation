import React from 'react';

interface EditorialHeadlineProps {
  eyebrow?: string;
  title: string;
  level?: 1 | 2 | 3;
  lead?: string;
  tone?: 'paper' | 'ink';
  align?: 'left' | 'right';
}

const titleSize = {
  1: 'text-5xl md:text-7xl',
  2: 'text-3xl md:text-5xl',
  3: 'text-2xl md:text-3xl',
} as const;

export function EditorialHeadline({ eyebrow, title, level = 2, lead, tone = 'paper', align = 'left' }: EditorialHeadlineProps) {
  const eyebrowColor = tone === 'ink' ? 'text-brand-gold' : 'text-brand-red-dark';
  const alignClass = align === 'right' ? 'ml-auto text-center md:text-right' : 'mx-auto text-center md:mx-0 lg:text-left';
  const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}>{eyebrow}</p>
      )}
      <Tag className={`font-display leading-[1.02] ${titleSize[level]}`}>{title}</Tag>
      {lead && <p className="mx-auto mt-6 max-w-xl font-body text-lg opacity-75 md:mx-0">{lead}</p>}
    </div>
  );
}
