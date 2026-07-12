import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { Trophy, ArrowUp, Star, Users } from 'lucide-react';

const Leaderboard = () => {
  const employees = [
    { rank: 1, name: 'Amit Kumar', dept: 'IT Operations', savings: '450 kg CO₂', points: 450, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { rank: 2, name: 'Neha Sharma', dept: 'Sustainability Board', savings: '380 kg CO₂', points: 380, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { rank: 3, name: 'Priya Sharma', dept: 'IT Operations', savings: '310 kg CO₂', points: 310, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { rank: 4, name: 'Siddharth Joshi', dept: 'Finance & Legal', savings: '290 kg CO₂', points: 290, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      {/* Page Header */}
      <div>
        <Badge variant="social" className="px-2.5 py-1 text-[11px]">
          Company Rankings
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">EcoSphere Leaderboard</h1>
        <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
          See rankings of top-performing departments and outstanding individual contributions to sustainability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Top Employees List */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-100" />
              <span>Top Individual Carbon Savers</span>
            </h3>

            <div className="space-y-4">
              {employees.map((emp) => (
                <div key={emp.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-5 font-bold text-xs text-[#6B7280] text-center">
                      {emp.rank === 1 ? '🥇' : emp.rank === 2 ? '🥈' : emp.rank === 3 ? '🥉' : emp.rank}
                    </span>
                    <img 
                      src={emp.avatar} 
                      alt={emp.name} 
                      className="w-8 h-8 rounded-full object-cover border border-[#EEEEEE]" 
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A]">{emp.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{emp.dept}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#2D6A4F]">{emp.savings}</p>
                    <p className="text-[9px] text-[#6B7280]">{emp.points} EcoPoints earned</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE] text-[10px] text-[#6B7280]">
            Leaderboard resets on the first day of every month.
          </div>
        </Card>

        {/* Tier status summary */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-social" />
              <span>Departmental Tiers</span>
            </h3>

            <div className="space-y-4 my-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#1A1A1A] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]"></span> Green Tier (90+)
                </span>
                <span className="font-bold text-[#1A1A1A]">1 Department</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#1A1A1A] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#457B9D]"></span> Silver Tier (80-89)
                </span>
                <span className="font-bold text-[#1A1A1A]">2 Departments</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#1A1A1A] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E9C46A]"></span> Bronze Tier (70-79)
                </span>
                <span className="font-bold text-[#1A1A1A]">1 Department</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE]">
            <button className="text-xs font-semibold text-social hover:text-social-hover">
              View historical leaderboard trends
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Leaderboard;
