import React from 'react';
import Image from 'next/image';

interface PhotoCaptionProps {
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  priority?: boolean;
  position?: string;
  aspect?: string;
}

export function PhotoCaption({
  src,
  alt,
  caption,
  credit,
  priority = false,
  position = 'object-center',
  aspect = 'aspect-[4/5]',
}: PhotoCaptionProps) {
  return (
    <figure className="w-full">
      <div className={`relative w-full overflow-hidden rounded-editorial ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-cover ${position}`}
        />
      </div>
      <figcaption className="mt-3 text-sm">
        {caption}
        {credit && <span className="block text-xs opacity-70">{credit}</span>}
      </figcaption>
    </figure>
  );
}
