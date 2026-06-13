"use client"

import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { REVENUE_TREND } from '@/lib/data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded shadow-modal p-3 border border-[#E2E8F0]">
        <p className="text-[13px] font-semibold text-ds-on-surface mb-2">{label} 2024</p>
        <div className="flex flex-col gap-1 text-[12px]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ds-secondary" />
            <span className="text-ds-on-surface-variant w-20">Bookings:</span>
            <span className="font-medium text-ds-on-surface">
              PKR {(payload[0].value / 100000).toFixed(2)} L
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ds-primary-dim" />
            <span className="text-ds-on-surface-variant w-20">Collections:</span>
            <span className="font-medium text-ds-on-surface">
              PKR {(payload[1].value / 100000).toFixed(2)} L
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function RevenueChart() {
  return (
    <div className="bg-ds-surface rounded-lg border border-[#E2E8F0] shadow-card p-5 col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-ds-on-surface">Revenue Trend</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-ds-secondary" />
            <span className="text-[12px] font-medium text-ds-on-surface-variant">Bookings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-ds-primary-dim" />
            <span className="text-[12px] font-medium text-ds-on-surface-variant">Collections</span>
          </div>
        </div>
      </div>
      
      <div className="h-[220px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_TREND} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#006a61" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#006a61" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E2E8F0" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#76777d' }} 
              dy={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="bookings" 
              stroke="#006a61" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorBookings)" 
            />
            <Area 
              type="monotone" 
              dataKey="collections" 
              stroke="#0F172A" 
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorCollections)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
