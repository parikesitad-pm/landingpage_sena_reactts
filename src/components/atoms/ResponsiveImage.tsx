import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ResponsiveImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'srcSet'
> {
  basePath: string; // e.g. "/images/senna/muhammad-gabriel-luca-senna-hero"
  alt: string;
  widths?: number[];
  sizes?: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export default function ResponsiveImage({
  basePath,
  alt,
  widths = [480, 768, 1024, 1280],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  width,
  height,
  className,
  imgClassName,
  priority = false,
  ...rest
}: ResponsiveImageProps) {
  const avifSrcSet = widths
    .map((w) => `${basePath}-${w}.avif ${w}w`)
    .join(', ');

  const webpSrcSet = widths
    .map((w) => `${basePath}-${w}.webp ${w}w`)
    .join(', ');

  const fallbackSrc = `${basePath}.webp`;

  return (
    <picture className={cn('block overflow-hidden', className)}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={cn(
          'w-full h-full object-cover transition-transform duration-500',
          imgClassName
        )}
        {...rest}
      />
    </picture>
  );
}
