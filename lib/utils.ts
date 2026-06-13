import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format PKR amounts
export function formatPKR(amount: number): string {
  if (amount >= 10000000) return `PKR ${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000)   return `PKR ${(amount / 100000).toFixed(2)} L`
  return `PKR ${amount.toLocaleString('en-PK')}`
}

// Format PKR full with commas
export function formatPKRFull(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`
}

// Days overdue
export function daysOverdue(dueDateStr: string): number {
  const due = new Date(dueDateStr)
  const now = new Date()
  return Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
}

// Initials from name
export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}
