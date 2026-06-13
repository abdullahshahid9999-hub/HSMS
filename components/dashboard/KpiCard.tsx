import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  label: string
  value: React.ReactNode
  context: React.ReactNode
  icon: LucideIcon
  iconClassName?: string
  topAccentColor: 'secondary' | 'error' | 'primary-dim'
}

export default function KpiCard({
  label,
  value,
  context,
  icon: Icon,
  iconClassName,
  topAccentColor
}: KpiCardProps) {
  return (
    <div className="relative bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card p-5 flex flex-col gap-1 overflow-hidden">
      {/* Top Accent */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-[3px]",
          topAccentColor === 'secondary' && "bg-ds-secondary",
          topAccentColor === 'error' && "bg-ds-error",
          topAccentColor === 'primary-dim' && "bg-ds-primary-dim",
        )} 
      />
      
      {/* Row 1 */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-ds-on-surface-variant">
          {label}
        </span>
        <Icon className={cn("w-[18px] h-[18px]", iconClassName)} />
      </div>

      {/* Row 2 */}
      <div className="text-[32px] font-semibold leading-[40px] tracking-[-0.01em]">
        {value}
      </div>

      {/* Row 3 */}
      <div className="text-[12px] mt-1">
        {context}
      </div>
    </div>
  )
}
