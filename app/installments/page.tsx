import React from 'react'
import AppShell from '@/components/AppShell'
import InstallmentsTable from '@/components/installments/InstallmentsTable'
import CollectionSummary from '@/components/installments/CollectionSummary'
import { MessageCircle } from 'lucide-react'

export default function InstallmentsPage() {
  return (
    <AppShell currentPage="Installments">
      <div className="p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
        
        {/* WhatsApp Automation Stats Bar */}
        <div className="bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <div className="flex-1 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-ds-secondary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-ds-secondary" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[15px] font-semibold text-ds-on-surface">WhatsApp Automation Logs</h2>
                <p className="text-[13px] text-ds-on-surface-variant">
                  Real-time tracking of automated payment reminders via official API.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 md:pr-8">
              <div className="flex flex-col">
                <span className="text-[28px] font-bold text-ds-on-surface leading-none mb-1">142</span>
                <span className="text-[11px] uppercase text-ds-on-surface-variant font-medium tracking-[0.05em]">Sent Today</span>
              </div>
              <div className="h-10 w-px bg-[#E2E8F0]" />
              <div className="flex flex-col">
                <span className="text-[28px] font-bold text-[#166534] leading-none mb-1">138</span>
                <span className="text-[11px] uppercase text-ds-on-surface-variant font-medium tracking-[0.05em]">Successful</span>
              </div>
              <div className="h-10 w-px bg-[#E2E8F0]" />
              <div className="flex flex-col">
                <span className="text-[28px] font-bold text-ds-error leading-none mb-1">4</span>
                <span className="text-[11px] uppercase text-ds-on-surface-variant font-medium tracking-[0.05em]">Failed</span>
              </div>
            </div>
          </div>
        </div>

        <InstallmentsTable />
        <CollectionSummary />
        
      </div>
    </AppShell>
  )
}
