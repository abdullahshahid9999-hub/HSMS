"use client"

import React, { useState } from 'react'
import AppShell from '@/components/AppShell'
import { BLOCKS } from '@/lib/data'
import { Plot } from '@/lib/types'
import PlotGrid from '@/components/plot-map/PlotGrid'
import PlotDetailPanel from '@/components/plot-map/PlotDetailPanel'

export default function PlotMapPage() {
  const [selectedBlockId, setSelectedBlockId] = useState<string>('all')
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null)

  const filteredBlocks = selectedBlockId === 'all' 
    ? BLOCKS 
    : BLOCKS.filter(b => b.id === selectedBlockId)

  return (
    <AppShell currentPage="Plot Map">
      <div className="h-full flex relative overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-ds-bg">
          
          {/* Top Controls Bar */}
          <div className="sticky top-0 bg-ds-surface border-b border-[#E2E8F0] px-6 py-3 flex items-center justify-between z-10">
            <h2 className="text-[20px] font-semibold text-ds-on-surface">Interactive Plot Map</h2>
            
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 bg-[#dcfce7] text-[#166534] rounded-full px-3 py-1 text-[12px] font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-[#166534]" /> Available
              </div>
              <div className="flex items-center gap-1.5 bg-ds-tertiary-container text-ds-on-tertiary-container rounded-full px-3 py-1 text-[12px] font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-ds-on-tertiary-container" /> Booked
              </div>
              <div className="flex items-center gap-1.5 bg-ds-error-container text-ds-on-error-container rounded-full px-3 py-1 text-[12px] font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-ds-on-error-container" /> Sold
              </div>
            </div>

            <div className="flex gap-3">
              <select 
                value={selectedBlockId} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedBlockId(e.target.value)}
                className="h-9 border border-ds-outline-variant rounded px-3 text-[13px] bg-white focus:outline-none focus:border-ds-secondary cursor-pointer"
              >
                <option value="all">All Blocks</option>
                {BLOCKS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              
              <button className="bg-ds-secondary text-white px-4 h-9 rounded text-[13px] font-medium hover:bg-ds-secondary-dark transition-colors">
                + New Booking
              </button>
            </div>
          </div>

          {/* Plot Grids Area */}
          <div className="p-6 flex flex-col gap-8">
            {filteredBlocks.map(block => (
              <PlotGrid 
                key={block.id} 
                block={block} 
                selectedPlotId={selectedPlot?.id || null}
                onPlotSelect={setSelectedPlot}
              />
            ))}
          </div>
        </div>

        {/* Slide-in Detail Panel */}
        <PlotDetailPanel 
          plot={selectedPlot} 
          isOpen={!!selectedPlot} 
          onClose={() => setSelectedPlot(null)} 
        />
        
      </div>
    </AppShell>
  )
}
