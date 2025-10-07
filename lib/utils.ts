import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentWeekNumber(): number {
  const today = normalizeDate(new Date());
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDays = Math.floor(
    (today.getTime() - startOfYear.getTime()) / 86400000
  ); // 86400000 = ms in a day

  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
}

export const normalizeDate = (date: any): Date => {
  if (!date) {
    // Return today's date as Date object for fallback
    const today = new Date()
    return createDateFromComponents(today.getFullYear(), today.getMonth(), today.getDate())
  }

  // Handle dayjs objects from MUI DatePicker
  if (date && typeof date === 'object' && date.$d instanceof Date) {
    // For dayjs objects, extract the local date components directly from the internal Date
    // This preserves the exact date the user selected without timezone conversion
    const jsDate = date.$d
    return createDateFromComponents(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate())
  }

  // Handle regular Date objects
  if (date instanceof Date) {
    return createDateFromComponents(date.getFullYear(), date.getMonth(), date.getDate())
  }

  // Handle string dates
  if (typeof date === 'string' || typeof date === 'number') {
    const jsDate = new Date(date)
    return createDateFromComponents(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate())
  }

  // Fallback
  const today = new Date()
  return createDateFromComponents(today.getFullYear(), today.getMonth(), today.getDate())
}


// Helper function to create a Date object from date components
// This preserves the exact local date without timezone conversion
export const createDateFromComponents = (year: number, month: number, day: number): Date => {
  // Create Date using local timezone - month is 0-based in Date constructor
  // Set time to noon to avoid any daylight saving time edge cases
  const localDate = new Date(year, month, day, 12, 0, 0, 0)

  return localDate
}