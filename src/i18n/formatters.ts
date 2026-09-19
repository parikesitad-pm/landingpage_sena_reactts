import type { SupportedLocale } from '@/features/preferences/types';

export function formatLocalizedDate(
  isoDate: string,
  locale: SupportedLocale = 'en'
): string {
  try {
    const date = new Date(isoDate + 'T00:00:00');
    const intlLocale = locale === 'zh-CN' ? 'zh-Hans-CN' : locale;
    return new Intl.DateTimeFormat(intlLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return isoDate;
  }
}

export function formatLocalizedAge(
  age: { years: number; months: number; days: number },
  locale: SupportedLocale = 'en'
): string {
  const { years, months, days } = age;

  if (locale === 'id') {
    if (years > 0) {
      return months > 0 ? `${years} tahun, ${months} bulan` : `${years} tahun`;
    }
    return months > 0 ? `${months} bulan` : `${days} hari`;
  }

  if (locale === 'zh-CN') {
    if (years > 0) {
      return months > 0 ? `${years}岁${months}个月` : `${years}岁`;
    }
    return months > 0 ? `${months}个月` : `${days}天`;
  }

  if (locale === 'ja') {
    if (years > 0) {
      return months > 0 ? `${years}歳${months}か月` : `${years}歳`;
    }
    return months > 0 ? `生後${months}か月` : `生後${days}日`;
  }

  if (locale === 'ko') {
    if (years > 0) {
      return months > 0 ? `${years}살 ${months}개월` : `${years}살`;
    }
    return months > 0 ? `생후 ${months}개월` : `생후 ${days}일`;
  }

  // English (default)
  if (years > 0) {
    if (months > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${
        months === 1 ? 'month' : 'months'
      }`;
    }
    return `${years} ${years === 1 ? 'year' : 'years'} old`;
  }
  if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} old`;
  }
  return `${days} ${days === 1 ? 'day' : 'days'} old`;
}
