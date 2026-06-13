export type PlotStatus = 'available' | 'booked' | 'sold'

export interface Plot {
  id: string         // e.g. "OVS-001"
  blockId: string
  number: number
  type: string       // '5-Marla' etc.
  price: number
  status: PlotStatus
  buyerId?: string   // if booked/sold
}

export interface Block {
  id: string
  name: string
  description: string
  totalPlots: number
  plotType: string
}

export interface Buyer {
  id: string
  name: string
  cnic: string
  phone: string
  city: string
  type: 'local' | 'overseas'
}

export interface Installment {
  id: string
  buyerId: string
  plotRef: string
  block: string
  plotType: string
  totalAmount: number
  downPayment: number
  monthlyAmount: number
  dueDate: string
  paidDate: string | null
  status: 'upcoming' | 'paid' | 'overdue'
  reminderSent: boolean
  installmentNo: number
  totalInstallments: number
}
