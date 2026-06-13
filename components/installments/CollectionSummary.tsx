import React from 'react'
import { RefreshCw } from 'lucide-react'

export default function CollectionSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
      {/* Card 1 — Collection Efficiency */}
      <div className="bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card p-5 flex flex-col gap-1">
        <div className="text-[11px] font-medium uppercase tracking-[0.05em] text-ds-on-surface-variant mb-1">
          Collection Efficiency
        </div>
        <div className="text-[32px] font-semibold text-ds-secondary leading-none">
          82.4%
        </div>
        <div className="text-[13px] text-[#166534] font-medium mt-1 mb-3">
          +2.1% vs last month
        </div>
        <div className="w-full h-2 rounded-full bg-ds-surface-container overflow-hidden mt-auto">
          <div className="bg-ds-secondary h-full" style={{ width: '82.4%' }} />
        </div>
      </div>

      {/* Card 2 — Outstanding Amount */}
      <div className="bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card p-5 flex flex-col gap-1">
        <div className="text-[11px] font-medium uppercase tracking-[0.05em] text-ds-on-surface-variant mb-1">
          Outstanding Amount
        </div>
        <div className="text-[32px] font-semibold text-ds-error leading-none">
          PKR 7.91 L
        </div>
        <div className="text-[12px] text-ds-on-surface-variant mt-2">
          Estimated recovery by end of week: PKR 1.8L
        </div>
      </div>

      {/* Card 3 — Action Button */}
      <div className="bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card p-5 flex flex-col justify-center items-center text-center">
        <button className="border-2 border-ds-secondary text-ds-secondary font-medium px-6 h-12 rounded flex items-center justify-center gap-2 hover:bg-ds-secondary hover:text-white transition-colors w-full sm:w-auto">
          <RefreshCw className="w-5 h-5" />
          Sync Payment Records
        </button>
        <div className="text-[11px] text-ds-on-surface-variant mt-3">
          Last synced: 2 minutes ago
        </div>
      </div>
    </div>
  )
}
