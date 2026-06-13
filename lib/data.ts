import { Plot, Block, PlotStatus, Buyer, Installment } from './types'

export const SCHEME = {
  name: 'Lyallpur Smart City',
  tagline: 'Canal Expressway, Faisalabad',
  developer: 'Marwa Developers',
  chairman: 'Malik Mudassar Ali',
  pricePerMarla: 850000,
  currency: 'PKR',
}

export const PLOT_TYPES: Record<string, { marla: number, price: number, label: string }> = {
  '5-Marla':  { marla: 5,  price: 4250000,  label: '5 Marla'  },
  '10-Marla': { marla: 10, price: 8500000,  label: '10 Marla' },
  '1-Kanal':  { marla: 20, price: 17000000, label: '1 Kanal'  },
  '4-Marla-C':{ marla: 4,  price: 3400000,  label: '4 Marla (Comm.)' },
  '6-Marla-C':{ marla: 6,  price: 5100000,  label: '6 Marla (Comm.)' },
}

export const BLOCKS: Block[] = [
  { id: 'overseas', name: 'Overseas Block', description: 'Dedicated to overseas Pakistani investors', totalPlots: 48, plotType: '10-Marla' },
  { id: 'executive', name: 'Executive Block', description: 'Premium residential plots', totalPlots: 60, plotType: '1-Kanal' },
  { id: 'general', name: 'General Block', description: 'Affordable residential plots for families', totalPlots: 80, plotType: '5-Marla' },
  { id: 'commercial', name: 'Commercial Block', description: 'Commercial plots for businesses and investment', totalPlots: 24, plotType: '4-Marla-C' },
]

export const BUYERS: Buyer[] = [
  { id: 'B001', name: 'Ahmed Raza Khan',     cnic: '33100-1234567-1', phone: '+92 300 1234567', city: 'Faisalabad', type: 'local' },
  { id: 'B002', name: 'Fatima Malik',         cnic: '33100-2345678-2', phone: '+92 321 2345678', city: 'Faisalabad', type: 'local' },
  { id: 'B003', name: 'Muhammad Usman Tariq', cnic: '33100-3456789-3', phone: '+92 311 3456789', city: 'Dubai, UAE',  type: 'overseas' },
  { id: 'B004', name: 'Zainab Baig',          cnic: '33100-4567890-4', phone: '+92 333 4567890', city: 'Lahore',     type: 'local' },
  { id: 'B005', name: 'Muhammad Waqas',       cnic: '33100-5678901-5', phone: '+92 345 5678901', city: 'Faisalabad', type: 'local' },
  { id: 'B006', name: 'Sara Khan',            cnic: '33100-6789012-6', phone: '+92 300 6789012', city: 'London, UK', type: 'overseas' },
  { id: 'B007', name: 'Bilal Ahmed Sheikh',   cnic: '33100-7890123-7', phone: '+92 321 7890123', city: 'Faisalabad', type: 'local' },
  { id: 'B008', name: 'Ayesha Noor',          cnic: '33100-8901234-8', phone: '+92 311 8901234', city: 'Karachi',    type: 'local' },
  { id: 'B009', name: 'Hassan Ali Mirza',     cnic: '33100-9012345-9', phone: '+92 333 9012345', city: 'Riyadh, KSA',type: 'overseas' },
  { id: 'B010', name: 'Imran Sheikh',         cnic: '33100-0123456-0', phone: '+92 345 0123456', city: 'Faisalabad', type: 'local' },
  { id: 'B011', name: 'Sana Iqbal',           cnic: '33100-1122334-1', phone: '+92 300 1122334', city: 'Gujranwala', type: 'local' },
  { id: 'B012', name: 'Tariq Mahmood',        cnic: '33100-2233445-2', phone: '+92 321 2233445', city: 'Faisalabad', type: 'local' },
]

export const INSTALLMENTS: Installment[] = [
  { id: 'INS001', buyerId: 'B001', plotRef: 'OVS-012', block: 'Overseas Block', plotType: '10-Marla', totalAmount: 8500000, downPayment: 2125000, monthlyAmount: 175694, dueDate: '2024-05-10', paidDate: null, status: 'overdue', reminderSent: false, installmentNo: 4, totalInstallments: 36 },
  { id: 'INS002', buyerId: 'B002', plotRef: 'GEN-034', block: 'General Block', plotType: '5-Marla', totalAmount: 4250000, downPayment: 1062500, monthlyAmount: 87847, dueDate: '2024-05-28', paidDate: null, status: 'overdue', reminderSent: true, installmentNo: 2, totalInstallments: 36 },
  { id: 'INS003', buyerId: 'B003', plotRef: 'OVS-007', block: 'Overseas Block', plotType: '10-Marla', totalAmount: 8500000, downPayment: 2125000, monthlyAmount: 175694, dueDate: '2024-05-15', paidDate: null, status: 'overdue', reminderSent: false, installmentNo: 3, totalInstallments: 36 },
  { id: 'INS004', buyerId: 'B004', plotRef: 'EXE-021', block: 'Executive Block', plotType: '1-Kanal', totalAmount: 17000000, downPayment: 4250000, monthlyAmount: 351389, dueDate: '2024-06-20', paidDate: null, status: 'upcoming', reminderSent: false, installmentNo: 1, totalInstallments: 36 },
  { id: 'INS005', buyerId: 'B005', plotRef: 'GEN-056', block: 'General Block', plotType: '5-Marla', totalAmount: 4250000, downPayment: 1062500, monthlyAmount: 87847, dueDate: '2024-06-25', paidDate: null, status: 'upcoming', reminderSent: false, installmentNo: 2, totalInstallments: 36 },
  { id: 'INS006', buyerId: 'B006', plotRef: 'OVS-031', block: 'Overseas Block', plotType: '10-Marla', totalAmount: 8500000, downPayment: 2125000, monthlyAmount: 175694, dueDate: '2024-06-28', paidDate: null, status: 'upcoming', reminderSent: true, installmentNo: 5, totalInstallments: 36 },
  { id: 'INS007', buyerId: 'B007', plotRef: 'COM-008', block: 'Commercial Block', plotType: '4-Marla-C', totalAmount: 3400000, downPayment: 850000, monthlyAmount: 70278, dueDate: '2024-07-05', paidDate: null, status: 'upcoming', reminderSent: false, installmentNo: 1, totalInstallments: 36 },
  { id: 'INS008', buyerId: 'B008', plotRef: 'EXE-015', block: 'Executive Block', plotType: '1-Kanal', totalAmount: 17000000, downPayment: 4250000, monthlyAmount: 351389, dueDate: '2024-05-01', paidDate: '2024-04-29', status: 'paid', reminderSent: false, installmentNo: 3, totalInstallments: 36 },
  { id: 'INS009', buyerId: 'B009', plotRef: 'OVS-003', block: 'Overseas Block', plotType: '10-Marla', totalAmount: 8500000, downPayment: 2125000, monthlyAmount: 175694, dueDate: '2024-05-18', paidDate: '2024-05-17', status: 'paid', reminderSent: false, installmentNo: 6, totalInstallments: 36 },
  { id: 'INS010', buyerId: 'B010', plotRef: 'GEN-072', block: 'General Block', plotType: '5-Marla', totalAmount: 4250000, downPayment: 1062500, monthlyAmount: 87847, dueDate: '2024-05-22', paidDate: '2024-05-22', status: 'paid', reminderSent: false, installmentNo: 4, totalInstallments: 36 },
  { id: 'INS011', buyerId: 'B011', plotRef: 'GEN-041', block: 'General Block', plotType: '5-Marla', totalAmount: 4250000, downPayment: 1062500, monthlyAmount: 87847, dueDate: '2024-06-30', paidDate: null, status: 'upcoming', reminderSent: false, installmentNo: 1, totalInstallments: 36 },
  { id: 'INS012', buyerId: 'B012', plotRef: 'EXE-044', block: 'Executive Block', plotType: '1-Kanal', totalAmount: 17000000, downPayment: 4250000, monthlyAmount: 351389, dueDate: '2024-05-05', paidDate: null, status: 'overdue', reminderSent: true, installmentNo: 2, totalInstallments: 36 },
]

export const DASHBOARD_STATS = {
  totalPlots: 212,
  plotsSold: 38,
  plotsBooked: 56,
  plotsAvailable: 118,
  collectionsThisMonth: 3847000,   // PKR
  collectionTarget: 5200000,        // PKR
  overdueAccounts: 4,
  overdueAmount: 790825,            // PKR
  totalRevenue: 42500000,           // PKR
  agentsActive: 14,
}

export const RECENT_BOOKINGS = [
  { id: 'BK001', buyerName: 'Hassan Ali Mirza', plotRef: 'OVS-003', block: 'Overseas', type: '10 Marla', amount: 8500000, date: '2024-05-30', status: 'confirmed' },
  { id: 'BK002', buyerName: 'Fatima Malik',      plotRef: 'GEN-034', block: 'General',  type: '5 Marla',  amount: 4250000, date: '2024-05-28', status: 'pending' },
  { id: 'BK003', buyerName: 'Bilal Ahmed Sheikh', plotRef: 'EXE-021', block: 'Executive',type: '1 Kanal',  amount: 17000000,date: '2024-05-25', status: 'confirmed' },
  { id: 'BK004', buyerName: 'Sara Khan',          plotRef: 'OVS-031', block: 'Overseas', type: '10 Marla', amount: 8500000, date: '2024-05-22', status: 'confirmed' },
  { id: 'BK005', buyerName: 'Tariq Mahmood',      plotRef: 'COM-008', block: 'Commercial',type:'4 Marla',  amount: 3400000, date: '2024-05-20', status: 'pending' },
  { id: 'BK006', buyerName: 'Sana Iqbal',         plotRef: 'GEN-056', block: 'General',  type: '5 Marla',  amount: 4250000, date: '2024-05-18', status: 'cancelled' },
]

export const REVENUE_TREND = [
  { month: 'Dec',  bookings: 12500000, collections: 8200000  },
  { month: 'Jan',  bookings: 18700000, collections: 11400000 },
  { month: 'Feb',  bookings: 14200000, collections: 9800000  },
  { month: 'Mar',  bookings: 21500000, collections: 14600000 },
  { month: 'Apr',  bookings: 19800000, collections: 13200000 },
  { month: 'May',  bookings: 28400000, collections: 17900000 },
  { month: 'Jun',  bookings: 38600000, collections: 21400000 },
]

export function generatePlots(block: Block): Plot[] {
  const plots: Plot[] = []
  const blockPrefix = block.id === 'overseas' ? 'OVS' : block.id === 'executive' ? 'EXE' : block.id === 'general' ? 'GEN' : 'COM'
  
  for (let i = 1; i <= block.totalPlots; i++) {
    const id = `${blockPrefix}-${i.toString().padStart(3, '0')}`
    const price = PLOT_TYPES[block.plotType].price
    
    let status: PlotStatus = 'available'
    const mod = i % 10
    
    if (mod === 0 || mod === 1) {
      status = 'sold'
    } else if (mod === 2 || mod === 3) {
      status = 'booked'
    } else if (mod === 4) {
      if (block.id === 'overseas' || block.id === 'commercial') {
        status = 'booked'
      } else {
        status = 'available'
      }
    } else if (mod === 5) {
      if (block.id === 'executive') {
        status = 'sold'
      } else if (block.id === 'commercial') {
        status = 'booked'
      }
    }
    
    plots.push({
      id,
      blockId: block.id,
      number: i,
      type: block.plotType,
      price,
      status
    })
  }
  return plots
}
