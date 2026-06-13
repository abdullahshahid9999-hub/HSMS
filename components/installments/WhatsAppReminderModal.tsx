import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MessageCircle } from 'lucide-react'
import { Installment, Buyer } from '@/lib/types'
import { formatPKRFull, daysOverdue } from '@/lib/utils'

interface WhatsAppReminderModalProps {
  isOpen: boolean
  onClose: () => void
  installment: Installment | null
  buyer: Buyer | null
  onConfirm: () => void
}

export default function WhatsAppReminderModal({
  isOpen,
  onClose,
  installment,
  buyer,
  onConfirm
}: WhatsAppReminderModalProps) {
  if (!installment || !buyer) return null

  const overdueDays = daysOverdue(installment.dueDate)
  const formattedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(installment.dueDate))

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[480px] bg-ds-surface p-0 border-none shadow-modal gap-0 overflow-hidden sm:max-w-[480px]">
        <DialogHeader className="p-5 border-b border-[#E2E8F0]">
          <DialogTitle className="flex items-center gap-2 text-[16px] font-semibold text-ds-on-surface">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            Send Payment Reminder
          </DialogTitle>
        </DialogHeader>

        <div className="p-5">
          {/* Buyer Info */}
          <div className="bg-ds-surface-low rounded p-4 mb-4 flex flex-col gap-1 border border-[#E2E8F0]">
            <span className="text-[15px] font-semibold text-ds-on-surface">{buyer.name}</span>
            <span className="text-[13px] text-ds-on-surface-variant">{installment.plotRef}, {installment.block}</span>
            <span className="text-[13px] text-ds-error mt-1 font-medium">
              {formatPKRFull(installment.monthlyAmount)} · {overdueDays} days overdue
            </span>
          </div>

          {/* Message Preview */}
          <div className="text-[12px] uppercase font-medium text-ds-on-surface-variant mb-2">
            Message Preview
          </div>
          <div className="bg-[#dcfce7] rounded p-4 text-[14px] text-ds-on-surface font-mono leading-relaxed border border-[#86efac] whitespace-pre-wrap">
            {`Assalam o Alaikum ${buyer.name} sahab,

Yeh aapke Lyallpur Smart City plot ${installment.plotRef} ki
installment reminder hai.

📍 Plot: ${installment.plotRef}, ${installment.block}
💰 Amount Due: ${formatPKRFull(installment.monthlyAmount)}
📅 Due Date: ${formattedDate}

Baraye meharbani payment confirm karein ya
hamse raabta karein.

Shukriya
Lyallpur Smart City Management
📞 +92 311 0088776`}
          </div>

          <div className="flex items-center gap-2 mt-4 text-[13px] text-ds-on-surface-variant">
            <span>Sending via: WhatsApp Business API</span>
            <span className="flex items-center gap-1 text-[#166534] font-medium ml-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#166534]" /> Connected
            </span>
          </div>
        </div>

        <div className="p-5 pt-0 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 h-10 text-[14px] font-medium text-ds-on-surface-variant hover:text-ds-on-surface transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 h-10 bg-[#25D366] text-white font-medium rounded hover:bg-[#128C7E] transition-colors flex items-center gap-2"
          >
            Send via WhatsApp ✓
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
