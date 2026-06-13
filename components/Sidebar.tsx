"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, LayoutDashboard, Map, CreditCard, Users, BarChart3, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Plot Map', href: '/plot-map', icon: Map },
    { name: 'Installments', href: '/installments', icon: CreditCard },
    { name: 'Agents', href: '/agents', icon: Users },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <aside className="w-[260px] h-full flex flex-col bg-ds-primary-dim p-0 shrink-0">
      {/* HEADER SECTION */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-ds-secondary shrink-0" />
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-white leading-tight">Lyallpur Smart City</span>
            <span className="text-[11px] text-ds-on-primary-container">Management Portal</span>
          </div>
        </div>
      </div>

      {/* NAV SECTION */}
      <div className="flex-1 pt-4">
        <div className="text-[10px] font-medium text-ds-on-primary-container tracking-[0.1em] uppercase px-4 mb-2">
          MAIN MENU
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 h-[44px] px-3 mx-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-ds-on-primary-container hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-ds-secondary rounded-r-sm" />
                )}
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span className="text-[14px] font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-[36px] h-[36px] rounded-full bg-ds-secondary flex items-center justify-center shrink-0">
            <span className="text-white text-[13px] font-medium">MA</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[13px] font-medium text-white truncate">Malik Mudassar</span>
            <span className="text-[11px] text-ds-on-primary-container truncate">Chairman</span>
          </div>
          <LogOut className="w-4 h-4 text-ds-on-primary-container cursor-pointer hover:text-white transition-colors shrink-0" />
        </div>
      </div>
    </aside>
  )
}
