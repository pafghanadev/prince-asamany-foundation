import React from 'react';

type Tone = 'paper' | 'ink';
type Width = 'full' | 'content' | 'narrow';

const toneClass: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-paper',
};

const widthClass: Record<Width, string> = {
  full: 'max-w-[1440px]',
  content: 'max-w-6xl',
  narrow: 'max-w-3xl',
};

interface SectionBandProps {
  tone: Tone;
  width?: Width;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionBand({ tone, width = 'content', id, className = '', children }: SectionBandProps) {
  return (
    <section id={id} className={`${toneClass[tone]} ${className}`}>
      <div className={`mx-auto w-full px-6 py-20 md:px-12 md:py-28 ${widthClass[width]}`}>{children}</div>
    </section>
  );
}
