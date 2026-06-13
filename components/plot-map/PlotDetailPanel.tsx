import React from 'react'
import { X } from 'lucide-react'
import { Plot } from '@/lib/types'
import { BLOCKS, BUYERS } from '@/lib/data'
import { formatPKRFull, getInitials, cn } from '@/lib/utils'

interface PlotDetailPanelProps {
  plot: Plot | null
  isOpen: boolean
  onClose: () => void
}

export default function PlotDetailPanel({ plot, isOpen, onClose }: PlotDetailPanelProps) {
  if (!plot) {
    return (
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-[360px] bg-ds-surface border-l border-[#E2E8F0] shadow-xl transition-transform duration-300 z-50 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      />
    )
  }

  const block = BLOCKS.find(b => b.id === plot.blockId)
  const isAvailable = plot.status === 'available'

  // Just pick a random buyer for booked/sold demo, since generatePlots doesn't assign buyerIds deterministically
  const demoBuyer = BUYERS[plot.number % BUYERS.length]

  return (
    <div 
      className={cn(
        "fixed right-0 top-0 h-full w-[360px] bg-ds-surface border-l border-[#E2E8F0] shadow-xl transition-transform duration-300 z-50 flex flex-col overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center sticky top-0 bg-ds-surface z-10">
        <h2 className="text-[16px] font-semibold text-ds-on-surface">Plot Details</h2>
        <button onClick={onClose} className="p-1 hover:bg-ds-surface-container rounded transition-colors text-ds-on-surface-variant hover:text-ds-on-surface">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Selected Plot Badge */}
      <div className="p-5 bg-ds-surface-low border-b border-[#E2E8F0] flex flex-col gap-2">
        <div className="text-[11px] font-medium uppercase tracking-[0.05em] text-ds-on-surface-variant">Selected Plot</div>
        <div className="text-[28px] font-bold text-ds-on-surface leading-none">#{plot.id}</div>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-ds-secondary/10 text-ds-secondary px-2.5 py-0.5 rounded-full text-[12px] font-medium">
            {block?.name}
          </span>
          <span className="bg-ds-primary-fixed text-ds-on-primary-container px-2.5 py-0.5 rounded-full text-[12px] font-medium">
            {plot.type}
          </span>
        </div>
        
        <div className="mt-2 text-[20px] font-semibold text-ds-secondary">
          {formatPKRFull(plot.price)}
        </div>
      </div>

      {/* Body Content */}
      {isAvailable ? (
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ds-on-surface">Buyer Full Name</label>
            <input type="text" className="h-10 border border-ds-outline-variant rounded px-3 text-[14px] focus:outline-none focus:border-ds-secondary" placeholder="e.g. Ali Ahmed" />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ds-on-surface">CNIC Number</label>
            <input type="text" className="h-10 border border-ds-outline-variant rounded px-3 text-[14px] focus:outline-none focus:border-ds-secondary" placeholder="00000-0000000-0" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ds-on-surface">Contact Number</label>
            <input type="text" className="h-10 border border-ds-outline-variant rounded px-3 text-[14px] focus:outline-none focus:border-ds-secondary" placeholder="+92 3XX XXXXXXX" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ds-on-surface">Buyer Type</label>
            <select className="h-10 border border-ds-outline-variant rounded px-3 text-[14px] focus:outline-none focus:border-ds-secondary bg-white">
              <option>Local</option>
              <option>Overseas</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ds-on-surface">Initial Deposit (PKR)</label>
            <input type="text" className="h-10 border border-ds-outline-variant rounded px-3 text-[14px] focus:outline-none focus:border-ds-secondary" placeholder={`Min. PKR ${formatPKRFull(plot.price * 0.25)}`} />
          </div>

          <div className="bg-ds-surface-container rounded p-4 mt-2 flex flex-col gap-3">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-ds-on-surface-variant">Processing Fee</span>
              <span className="text-ds-on-surface font-medium">PKR 15,000</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-ds-on-surface-variant">Advance Deposit</span>
              <span className="text-ds-on-surface font-medium">{formatPKRFull(plot.price * 0.25)}</span>
            </div>
            <div className="h-px bg-ds-outline-variant w-full" />
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-semibold text-ds-on-surface">Total Payable</span>
              <span className="text-[16px] font-bold text-ds-secondary">{formatPKRFull(plot.price * 0.25 + 15000)}</span>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <button className="w-full h-10 bg-ds-secondary text-white rounded text-[14px] font-medium hover:bg-ds-secondary-dark transition-colors">
              Generate Digital Receipt
            </button>
            <p className="text-[11px] text-ds-on-surface-variant text-center">
              System will send WhatsApp confirmation to buyer.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-5 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <h3 className="text-[15px] font-semibold text-ds-on-surface">Ownership Record</h3>
            <span className={cn(
              "rounded-full text-[11px] font-medium px-2.5 py-0.5 capitalize",
              plot.status === 'booked' && "bg-ds-tertiary-container text-ds-on-tertiary-container",
              plot.status === 'sold' && "bg-ds-error-container text-ds-on-error-container"
            )}>
              {plot.status}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ds-surface-highest flex items-center justify-center">
                <span className="text-[13px] font-medium text-ds-on-surface">{getInitials(demoBuyer.name)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-medium text-ds-on-surface">{demoBuyer.name}</span>
                <span className="text-[13px] text-ds-on-surface-variant capitalize">{demoBuyer.type} Buyer</span>
              </div>
            </div>

            <div className="bg-ds-surface-low rounded border border-[#E2E8F0] p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-ds-on-surface-variant">CNIC</span>
                <span className="font-mono text-ds-on-surface">{demoBuyer.cnic.replace(/\d(?=\d{4})/g, "*")}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-ds-on-surface-variant">Contact</span>
                <span className="font-mono text-ds-on-surface">{demoBuyer.phone.replace(/\d(?=\d{4})/g, "*")}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-ds-on-surface-variant">Booking Date</span>
                <span className="text-ds-on-surface">12 May 2024</span>
              </div>
            </div>
          </div>

          <button className="w-full h-10 border border-ds-secondary text-ds-secondary rounded text-[14px] font-medium hover:bg-ds-secondary hover:text-white transition-colors mt-2">
            View Full History
          </button>
        </div>
      )}
    </div>
  )
}
