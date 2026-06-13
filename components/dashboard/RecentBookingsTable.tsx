import React from 'react'
import { RECENT_BOOKINGS } from '@/lib/data'
import { formatPKRFull, getInitials, cn } from '@/lib/utils'

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

export default function RecentBookingsTable() {
  return (
    <div className="bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-[18px] font-semibold text-ds-on-surface">Recent Bookings</h2>
        <button className="text-ds-secondary text-[13px] font-medium hover:text-ds-secondary-dark transition-colors">
          View All →
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-ds-primary-dim">
            <tr>
              <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Buyer Name</th>
              <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Plot Ref</th>
              <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Block</th>
              <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Plot Type</th>
              <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Amount (PKR)</th>
              <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Date</th>
              <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-ds-surface text-ds-on-surface">
            {RECENT_BOOKINGS.map((booking) => (
              <tr key={booking.id} className="h-[44px] border-b border-[#F1F5F9] hover:bg-ds-surface-low transition-colors group">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-[28px] h-[28px] rounded-full bg-ds-surface-highest flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-medium text-ds-on-surface">{getInitials(booking.buyerName)}</span>
                    </div>
                    <span className="text-[14px] font-medium">{booking.buyerName}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-[14px]">{booking.plotRef}</td>
                <td className="px-4 py-2.5 text-[14px]">{booking.block}</td>
                <td className="px-4 py-2.5 text-[14px]">{booking.type}</td>
                <td className="px-4 py-2.5 text-[14px] font-medium">{formatPKRFull(booking.amount)}</td>
                <td className="px-4 py-2.5 text-[14px]">{formatDate(booking.date)}</td>
                <td className="px-4 py-2.5">
                  <span className={cn(
                    "rounded-full text-[11px] font-medium px-2.5 py-0.5 capitalize",
                    booking.status === 'confirmed' && "bg-[#dcfce7] text-[#166534]",
                    booking.status === 'pending' && "bg-ds-tertiary-container text-ds-on-tertiary-container",
                    booking.status === 'cancelled' && "bg-ds-error-container text-ds-on-error-container"
                  )}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
