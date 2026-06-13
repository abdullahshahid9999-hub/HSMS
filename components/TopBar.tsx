"use client"

import { Bell, HelpCircle, Search } from 'lucide-react'

export default function TopBar({ title }: { title: string }) {
  return (
    <header className="h-[64px] bg-ds-surface border-b border-[#E2E8F0] px-6 flex items-center justify-between shrink-0">
      {/* LEFT */}
      <div className="flex flex-col">
        <h1 className="text-[20px] font-semibold text-ds-on-surface leading-tight">{title}</h1>
        <div className="text-[12px] text-ds-on-surface-variant">
          Lyallpur Smart City / {title}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 text-ds-secondary absolute left-3" />
          <input
            type="text"
            placeholder="Search plots, buyers..."
            className="w-64 h-9 pl-9 pr-3 border border-ds-outline-variant rounded text-[13px] focus:outline-none focus:border-ds-secondary transition-colors"
          />
        </div>

        {/* Icons */}
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-ds-on-surface-variant hover:text-ds-on-surface transition-colors" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-ds-error rounded-full border border-ds-surface" />
        </div>
        
        <HelpCircle className="w-5 h-5 text-ds-on-surface-variant cursor-pointer hover:text-ds-on-surface transition-colors" />

        {/* Divider */}
        <div className="h-6 w-px bg-ds-outline-variant mx-1" />

        {/* User Chip */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-ds-primary-dim flex items-center justify-center shrink-0">
            <span className="text-white text-[12px] font-medium">MA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-ds-on-surface leading-tight">Malik Mudassar</span>
            <span className="text-[11px] text-ds-on-surface-variant">Chairman</span>
          </div>
        </div>
      </div>
    </header>
  )
}
