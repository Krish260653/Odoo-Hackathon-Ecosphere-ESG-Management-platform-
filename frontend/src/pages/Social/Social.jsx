import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { Users, Heart, Award, ShieldAlert } from 'lucide-react';

const Social = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      {/* Page Header */}
      <div>
        <Badge variant="social" className="px-2.5 py-1 text-[11px]">
          Social Module
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">Social & CSR Initiatives</h1>
        <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
          Coordinate Corporate Social Responsibility programs, monitor volunteer contributions, and check workspace inclusivity metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CSR activities */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#457B9D]" />
              <span>Corporate Social Responsibility Log</span>
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-[#1A1A1A]">Priya Sharma (IT Operations)</p>
                  <p className="text-xs text-[#6B7280]">Organized "E-Waste Recycling Drive" across Bangalore campus</p>
                </div>
                <Badge variant="social">Approved</Badge>
              </div>

              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-[#1A1A1A]">Rahul Mehta (HR & Admin)</p>
                  <p className="text-xs text-[#6B7280]">Community tutoring sessions for local municipal high schools</p>
                </div>
                <Badge variant="social">Approved</Badge>
              </div>

              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-[#1A1A1A]">Siddharth Joshi (Finance)</p>
                  <p className="text-xs text-[#6B7280]">Sponsored city canal cleanup project coordination</p>
                </div>
                <Badge variant="secondary">Pending Approval</Badge>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE]">
            <button className="text-xs font-semibold text-social hover:text-social-hover">
              Submit new CSR activity proof
            </button>
          </div>
        </Card>

        {/* CSR KPI metrics */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-social" />
              <span>Participation & Training</span>
            </h3>

            <div className="space-y-4 my-2">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Volunteer Contributions</span>
                <p className="text-3xl font-bold text-[#1A1A1A]">1,240 <span className="text-xs text-[#6B7280] font-normal">Hours logged</span></p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Safety Training Sign-off</span>
                <p className="text-3xl font-bold text-[#1A1A1A]">94.6% <span className="text-xs text-[#6B7280] font-normal">Compliance</span></p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Campus Diversity Rating</span>
                <p className="text-3xl font-bold text-[#1A1A1A]">4.2 / 5.0 <span className="text-xs text-[#6B7280] font-normal">Score</span></p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE] text-[10px] text-[#6B7280]">
            Calculated dynamically based on employee surveys and submissions.
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Social;
