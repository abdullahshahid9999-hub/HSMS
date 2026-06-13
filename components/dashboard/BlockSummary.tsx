import React from 'react'

const SUMMARY_DATA = [
  { name: 'Overseas', sold: 10, booked: 14, available: 24, total: 48 },
  { name: 'Executive', sold: 12, booked: 15, available: 33, total: 60 },
  { name: 'General', sold: 12, booked: 20, available: 48, total: 80 },
  { name: 'Commercial', sold: 4, booked: 7, available: 13, total: 24 },
]

export default function BlockSummary() {
  return (
    <div className="bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card p-5 col-span-1 flex flex-col h-full">
      <h2 className="text-[15px] font-semibold text-ds-on-surface mb-4">Inventory by Block</h2>
      
      <div className="flex flex-col flex-1 justify-between gap-4">
        {SUMMARY_DATA.map((block, index) => {
          const soldPct = (block.sold / block.total) * 100
          const bookedPct = (block.booked / block.total) * 100
          const availPct = (block.available / block.total) * 100

          return (
            <div key={block.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[13px] font-medium text-ds-on-surface">
                <span>{block.name}</span>
                <span className="text-ds-on-surface-variant">{block.total} total</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-ds-surface-container">
                <div style={{ width: `${soldPct}%` }} className="bg-[#166534] h-full" />
                <div style={{ width: `${bookedPct}%` }} className="bg-ds-tertiary h-full" />
                <div style={{ width: `${availPct}%` }} className="bg-ds-surface-dim h-full" />
              </div>
              
              {/* Stat Pills */}
              <div className="flex items-center gap-1.5 text-[11px] text-ds-on-surface-variant font-medium mt-0.5">
                <span className="text-[#166534]">{block.sold} Sold</span>
                <span>·</span>
                <span className="text-ds-tertiary">{block.booked} Booked</span>
                <span>·</span>
                <span>{block.available} Available</span>
              </div>

              {/* Divider (except for last item) */}
              {index < SUMMARY_DATA.length - 1 && (
                <div className="h-px w-full bg-[#E2E8F0] mt-2" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
