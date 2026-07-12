import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Trophy, Award, Gift, Clock, ShieldCheck } from 'lucide-react';

const Challenges = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      {/* Page Header */}
      <div>
        <Badge variant="environmental" className="px-2.5 py-1 text-[11px]">
          Gamification Engine
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">ESG Challenges & Rewards</h1>
        <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
          Join active sustainability challenges, unlock achievements, and redeem points for environmental merchandise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Active Challenges */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#2D6A4F]" />
              <span>Active Employee Challenges</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">Low-Carbon Commute Challenge</h4>
                    <span className="text-[10px] text-green-700 font-medium bg-green-50 px-1.5 py-0.5 rounded border border-green-200/30">Env</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">Log carpools, public transport, or bicycling to work for 30 consecutive days.</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280] font-medium pt-1">
                    <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                    <span>Ends: 18 days left</span>
                  </div>
                </div>
                <Button size="sm">Join Challenge</Button>
              </div>

              <div className="p-4 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">Zero-Waste Office Week</h4>
                    <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/30">Gov</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">Ensure no disposable single-use cups/bottles are logged on office floors.</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280] font-medium pt-1">
                    <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                    <span>Ends: 5 days left</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">Participating</Button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE] text-xs text-[#6B7280]">
            * Participate to earn EcoPoints which can be spent in the Rewards Shop.
          </div>
        </Card>

        {/* Badges and Rewards Info */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>EcoPoints & Achievements</span>
            </h3>

            <div className="space-y-4 my-2 text-left">
              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">My Points Balance</span>
                <p className="text-3xl font-bold text-amber-700 mt-1">450 <span className="text-xs font-normal text-amber-800/80">pts</span></p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#1A1A1A] block">Unlocked Badges</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="environmental">Carbon Saver</Badge>
                  <Badge variant="social">CSR Supporter</Badge>
                  <Badge variant="governance">Compliant Champion</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE]">
            <button className="text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>Open Rewards Shop</span>
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Challenges;
