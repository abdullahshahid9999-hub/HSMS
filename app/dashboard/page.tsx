import AppShell from '@/components/AppShell'
import KpiCard from '@/components/dashboard/KpiCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import BlockSummary from '@/components/dashboard/BlockSummary'
import RecentBookingsTable from '@/components/dashboard/RecentBookingsTable'
import { TrendingUp, Wallet, AlertTriangle, MapPin } from 'lucide-react'

export default function DashboardPage() {
  return (
    <AppShell currentPage="Dashboard">
      <div className="p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
        {/* Section A — KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Sales Value"
            icon={TrendingUp}
            iconClassName="text-ds-secondary"
            topAccentColor="secondary"
            value={<span className="text-ds-on-surface">PKR 4.25 Cr</span>}
            context={<span className="text-green-600 font-medium">↑ 12% vs last month</span>}
          />
          <KpiCard
            label="Collected This Month"
            icon={Wallet}
            iconClassName="text-ds-secondary"
            topAccentColor="secondary"
            value="PKR 38.47 L"
            context={
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="w-full h-1.5 bg-ds-surface-container rounded-full overflow-hidden">
                  <div className="bg-ds-secondary h-full" style={{ width: '74%' }} />
                </div>
                <span className="text-ds-on-surface-variant">74% of PKR 52L target</span>
              </div>
            }
          />
          <KpiCard
            label="Overdue Amount"
            icon={AlertTriangle}
            iconClassName="text-ds-error"
            topAccentColor="error"
            value={<span className="text-ds-error">PKR 7.91 L</span>}
            context={<span className="text-ds-error/80">4 accounts · 90+ days pending</span>}
          />
          <KpiCard
            label="Available Plots"
            icon={MapPin}
            iconClassName="text-ds-on-surface-variant"
            topAccentColor="primary-dim"
            value="118 Units"
            context={<span className="text-ds-on-surface-variant">Out of 212 total · 56 booked</span>}
          />
        </div>

        {/* Section B — Two Column Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart />
          <BlockSummary />
        </div>

        {/* Section C — Recent Bookings Table */}
        <RecentBookingsTable />
      </div>
    </AppShell>
  )
}
