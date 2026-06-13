"use client"

import React, { useState } from 'react'
import { Installment, Buyer } from '@/lib/types'
import { BUYERS, INSTALLMENTS } from '@/lib/data'
import { formatPKRFull, getInitials, daysOverdue, cn } from '@/lib/utils'
import { MessageCircle, Eye, CheckCircle2 } from 'lucide-react'
import WhatsAppReminderModal from './WhatsAppReminderModal'

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

type TabType = 'overdue' | 'upcoming' | 'paid'

export default function InstallmentsTable() {
  const [activeTab, setActiveTab] = useState<TabType>('overdue')
  const [installments, setInstallments] = useState(INSTALLMENTS)
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedInst, setSelectedInst] = useState<Installment | null>(null)
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null)

  const filteredInstallments = installments.filter((inst: Installment) => inst.status === activeTab)

  const handleSendReminderClick = (inst: Installment) => {
    const buyer = BUYERS.find(b => b.id === inst.buyerId) || null
    setSelectedInst(inst)
    setSelectedBuyer(buyer)
    setModalOpen(true)
  }

  const handleConfirmReminder = () => {
    if (selectedInst) {
      setInstallments((prev: Installment[]) => prev.map((inst: Installment) => 
        inst.id === selectedInst.id ? { ...inst, reminderSent: true } : inst
      ))
    }
    setModalOpen(false)
    setTimeout(() => {
      setSelectedInst(null)
      setSelectedBuyer(null)
    }, 300)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs + Controls */}
      <div className="flex items-center justify-between">
        <div className="flex border-b border-ds-outline-variant/30">
          {(['overdue', 'upcoming', 'paid'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-[14px] capitalize transition-colors",
                activeTab === tab 
                  ? "text-ds-secondary border-b-2 border-ds-secondary font-medium" 
                  : "text-ds-on-surface-variant hover:text-ds-on-surface"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-ds-on-surface-variant">SORT BY</span>
            <select className="border border-ds-outline-variant rounded px-2 h-9 text-[13px] bg-white text-ds-on-surface focus:outline-none focus:border-ds-secondary">
              <option>Due Date (Soonest)</option>
            </select>
          </div>
          <button className="bg-ds-secondary text-white px-4 h-9 rounded text-[13px] font-medium hover:bg-ds-secondary-dark transition-colors">
            + Create Invoice
          </button>
          <button className="border border-ds-outline rounded px-4 h-9 text-[13px] hover:bg-ds-surface-low transition-colors">
            ↓ Export PDF
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-ds-primary-dim">
              <tr>
                <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Buyer Name</th>
                <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Plot / Block</th>
                <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Amount (PKR)</th>
                <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Due Date</th>
                <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Status</th>
                <th className="text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-ds-surface text-ds-on-surface">
              {filteredInstallments.map((inst: Installment) => {
                const buyer = BUYERS.find(b => b.id === inst.buyerId)!
                const isOverdue = inst.status === 'overdue'

                return (
                  <tr key={inst.id} className="h-[60px] border-b border-[#F1F5F9] hover:bg-ds-surface-low transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-[32px] h-[32px] rounded-full bg-ds-surface-highest flex items-center justify-center shrink-0">
                          <span className="text-[12px] font-medium text-ds-on-surface">{getInitials(buyer.name)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-ds-on-surface leading-tight">{buyer.name}</span>
                          <span className="text-[11px] text-ds-on-surface-variant font-mono mt-0.5">
                            {buyer.cnic.substring(0, 5) + "-*******-" + buyer.cnic.slice(-1)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-ds-on-surface leading-tight">{inst.plotRef}</span>
                        <span className="text-[11px] text-ds-on-surface-variant mt-0.5">{inst.block}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-ds-on-surface leading-tight">
                          {formatPKRFull(inst.monthlyAmount)}
                        </span>
                        <span className="text-[11px] text-ds-on-surface-variant mt-0.5">
                          Installment {inst.installmentNo} of {inst.totalInstallments}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className={cn("text-[14px] leading-tight", isOverdue ? "text-ds-error font-medium" : "")}>
                          {formatDate(inst.dueDate)}
                        </span>
                        {isOverdue && (
                          <span className="text-ds-error text-[11px] mt-0.5">
                            {daysOverdue(inst.dueDate)} days overdue
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "rounded text-[11px] font-medium px-2.5 py-0.5 capitalize inline-flex",
                        inst.status === 'overdue' && "bg-ds-error-container text-ds-on-error-container",
                        inst.status === 'upcoming' && "bg-ds-tertiary-container text-ds-on-tertiary-container",
                        inst.status === 'paid' && "bg-[#dcfce7] text-[#166534]"
                      )}>
                        {inst.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isOverdue && (
                          inst.reminderSent ? (
                            <button className="flex items-center justify-center w-7 h-7 bg-ds-surface-container rounded cursor-default" title="Reminder sent">
                              <CheckCircle2 className="w-4 h-4 text-ds-on-surface-variant" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleSendReminderClick(inst)}
                              className="flex items-center justify-center w-7 h-7 bg-ds-secondary text-white rounded hover:bg-ds-secondary-dark transition-colors"
                              title="Send Reminder"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          )
                        )}
                        <button className="flex items-center justify-center w-7 h-7 border border-ds-outline-variant rounded hover:bg-ds-surface-container transition-colors" title="View Details">
                          <Eye className="w-4 h-4 text-ds-on-surface-variant" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredInstallments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-ds-on-surface-variant text-[14px]">
                    No {activeTab} installments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {filteredInstallments.length > 0 && (
          <div className="p-4 border-t border-[#F1F5F9] flex justify-between items-center text-[13px] text-ds-on-surface-variant">
            <span>Showing 1 to {filteredInstallments.length} of {filteredInstallments.length} {activeTab} Installments</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-ds-surface-low">{'<'}</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-ds-primary-dim text-white">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-ds-surface-low">{'>'}</button>
            </div>
          </div>
        )}
      </div>

      <WhatsAppReminderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        installment={selectedInst}
        buyer={selectedBuyer}
        onConfirm={handleConfirmReminder}
      />
    </div>
  )
}
