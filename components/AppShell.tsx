import React from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface AppShellProps {
  children: React.ReactNode
  currentPage: string
}

export default function AppShell({ children, currentPage }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-ds-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={currentPage} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
