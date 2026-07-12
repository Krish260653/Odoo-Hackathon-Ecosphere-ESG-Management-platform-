import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { Leaf, Flame, Zap, Truck, Target } from 'lucide-react';

const Environmental = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      {/* Page Header */}
      <div>
        <Badge variant="environmental" className="px-2.5 py-1 text-[11px]">
          Environmental Module
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">Environmental Performance</h1>
        <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
          Track greenhouse gas emissions across Scope 1, 2, and 3, monitor resource efficiency, and track environmental targets.
        </p>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Emissions Breakdown */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#2D6A4F]" />
              <span>GHG Emissions Carbon Tracker</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2">
              <div className="p-4 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Scope 1</span>
                  <Flame className="w-4 h-4 text-orange-500" strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-bold text-[#1A1A1A]">45.2 <span className="text-xs text-[#6B7280] font-normal">MT CO₂e</span></p>
                <p className="text-[10px] text-green-700 font-medium bg-green-50 border border-green-200/30 rounded-md px-1.5 py-0.5 inline-block">Direct combustion</p>
              </div>

              <div className="p-4 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Scope 2</span>
                  <Zap className="w-4 h-4 text-yellow-500" strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-bold text-[#1A1A1A]">82.4 <span className="text-xs text-[#6B7280] font-normal">MT CO₂e</span></p>
                <p className="text-[10px] text-green-700 font-medium bg-green-50 border border-green-200/30 rounded-md px-1.5 py-0.5 inline-block">Purchased energy</p>
              </div>

              <div className="p-4 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Scope 3</span>
                  <Truck className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-bold text-[#1A1A1A]">112.8 <span className="text-xs text-[#6B7280] font-normal">MT CO₂e</span></p>
                <p className="text-[10px] text-[#6B7280] font-medium bg-gray-100 border border-gray-200/30 rounded-md px-1.5 py-0.5 inline-block">Supply chain / travel</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-[#EEEEEE] text-xs text-[#6B7280]">
            Last updated: 12 hours ago from Utility API feeds.
          </div>
        </Card>

        {/* Card 2: Targets */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>ESG Goals & Status</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1A1A1A]">Renewable energy transition</span>
                  <span className="text-primary font-bold">75%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2D6A4F] rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1A1A1A]">Zero waste to landfill</span>
                  <span className="text-primary font-bold">40%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2D6A4F] rounded-full" style={{ width: '40%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1A1A1A]">EV fleet conversion</span>
                  <span className="text-primary font-bold">15%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2D6A4F] rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE]">
            <button className="text-xs font-semibold text-primary hover:text-primary-hover">
              Edit carbon reduction targets
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Environmental;
