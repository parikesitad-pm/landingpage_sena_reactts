import type { ImgHTMLAttributes } from 'react';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { cn } from '@/lib/utils';

export interface LucaLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  alt?: string;
}

export default function LucaLogo({
  className,
  width = 600,
  height = 300,
  alt = 'LUCA — Muhammad Gabriel Luca Senna',
  ...props
}: LucaLogoProps) {
  const { resolvedTheme } = usePreferences();

  return (
    <img
      src={
        resolvedTheme === 'dark'
          ? '/branding/luca-logo-dark.webp'
          : '/branding/luca-logo-light.webp'
      }
      alt={alt}
      width={width}
      height={height}
      className={cn('h-auto object-contain transition-opacity duration-200', className)}
      {...props}
    />
  );
}
