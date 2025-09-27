import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentWeekNumber(): number {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDays = Math.floor(
    (today.getTime() - startOfYear.getTime()) / 86400000
  ); // 86400000 = ms in a day

  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7) + 1;
}