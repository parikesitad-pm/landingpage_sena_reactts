/**
 * Dynamic age calculation from birth date string (ISO "YYYY-MM-DD")
 * Never hardcodes current age, adapting accurately over time.
 */

export interface CalculatedAge {
  years: number;
  months: number;
  days: number;
  formatted: string;
}

export function calculateAge(
  birthDateString: string = '2025-02-13',
  referenceDate: Date = new Date()
): CalculatedAge {
  const birth = new Date(birthDateString + 'T00:00:00');
  const current = referenceDate;

  let years = current.getFullYear() - birth.getFullYear();
  let months = current.getMonth() - birth.getMonth();
  let days = current.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    // Days in the previous month of current
    const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Format human-readable string
  let formatted = '';
  if (years > 0) {
    if (months > 0) {
      formatted = `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${
        months === 1 ? 'month' : 'months'
      }`;
    } else {
      formatted = `${years} ${years === 1 ? 'year' : 'years'} old`;
    }
  } else if (months > 0) {
    if (days > 0) {
      formatted = `${months} ${months === 1 ? 'month' : 'months'}, ${days} ${
        days === 1 ? 'day' : 'days'
      }`;
    } else {
      formatted = `${months} ${months === 1 ? 'month' : 'months'} old`;
    }
  } else {
    formatted = `${days} ${days === 1 ? 'day' : 'days'} old`;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    formatted,
  };
}
