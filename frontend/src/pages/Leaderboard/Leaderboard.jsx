import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { 
  Trophy, 
  ArrowUp, 
  Star, 
  Users, 
  User, 
  Activity, 
  Calendar,
  Building
} from 'lucide-react';

const Leaderboard = () => {
  const { user } = useAuth();
  const [viewType, setViewType] = useState('employee'); // employee | department
  const [dateRange, setDateRange] = useState('This Month'); // This Week | This Month | This Quarter | All Time

  // Seeded employee data
  const employeesData = {
    'This Week': [
      { rank: 1, name: 'Priya Sharma', dept: 'IT Operations', savings: '45 kg CO₂', points: 150, badges: 2, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 2, name: 'Siddharth Joshi', dept: 'Finance & Legal', savings: '38 kg CO₂', points: 120, badges: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 3, name: 'Amit Kumar', dept: 'IT Operations', savings: '35 kg CO₂', points: 110, badges: 3, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 4, name: 'Neha Sharma', dept: 'Sustainability Board', savings: '30 kg CO₂', points: 90, badges: 4, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 5, name: 'Vikram Singh', dept: 'Manufacturing', savings: '25 kg CO₂', points: 80, badges: 2, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 6, name: 'Rahul Mehta', dept: 'HR & Admin', savings: '20 kg CO₂', points: 70, badges: 1, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ],
    'This Month': [
      { rank: 1, name: 'Amit Kumar', dept: 'IT Operations', savings: '180 kg CO₂', points: 450, badges: 3, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 2, name: 'Neha Sharma', dept: 'Sustainability Board', savings: '150 kg CO₂', points: 380, badges: 4, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 3, name: 'Priya Sharma', dept: 'IT Operations', savings: '140 kg CO₂', points: 310, badges: 2, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 4, name: 'Siddharth Joshi', dept: 'Finance & Legal', savings: '120 kg CO₂', points: 290, badges: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 5, name: 'Vikram Singh', dept: 'Manufacturing', savings: '98 kg CO₂', points: 220, badges: 2, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 6, name: 'Rahul Mehta', dept: 'HR & Admin', savings: '80 kg CO₂', points: 180, badges: 1, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ],
    'This Quarter': [
      { rank: 1, name: 'Siddharth Joshi', dept: 'Finance & Legal', savings: '520 kg CO₂', points: 1200, badges: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 2, name: 'Amit Kumar', dept: 'IT Operations', savings: '480 kg CO₂', points: 1100, badges: 3, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 3, name: 'Neha Sharma', dept: 'Sustainability Board', savings: '450 kg CO₂', points: 980, badges: 4, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 4, name: 'Priya Sharma', dept: 'IT Operations', savings: '390 kg CO₂', points: 850, badges: 2, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 5, name: 'Vikram Singh', dept: 'Manufacturing', savings: '310 kg CO₂', points: 700, badges: 2, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 6, name: 'Rahul Mehta', dept: 'HR & Admin', savings: '240 kg CO₂', points: 550, badges: 1, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ],
    'All Time': [
      { rank: 1, name: 'Neha Sharma', dept: 'Sustainability Board', savings: '1850 kg CO₂', points: 4200, badges: 4, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 2, name: 'Amit Kumar', dept: 'IT Operations', savings: '1620 kg CO₂', points: 3750, badges: 3, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 3, name: 'Siddharth Joshi', dept: 'Finance & Legal', savings: '1400 kg CO₂', points: 3200, badges: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 4, name: 'Priya Sharma', dept: 'IT Operations', savings: '1150 kg CO₂', points: 2600, badges: 2, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 5, name: 'Vikram Singh', dept: 'Manufacturing', savings: '980 kg CO₂', points: 2100, badges: 2, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { rank: 6, name: 'Rahul Mehta', dept: 'HR & Admin', savings: '840 kg CO₂', points: 1850, badges: 1, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ]
  };

  // Seeded department data
  const departmentsData = {
    'This Week': [
      { rank: 1, name: 'IT Operations', savings: '120 kg CO₂', points: 380, badges: 12 },
      { rank: 2, name: 'Finance & Legal', savings: '98 kg CO₂', points: 310, badges: 8 },
      { rank: 3, name: 'HR & Admin', savings: '80 kg CO₂', points: 260, badges: 6 },
      { rank: 4, name: 'Sustainability Board', savings: '75 kg CO₂', points: 220, badges: 5 },
      { rank: 5, name: 'Sales & Marketing', savings: '60 kg CO₂', points: 180, badges: 3 },
      { rank: 6, name: 'Manufacturing', savings: '45 kg CO₂', points: 130, badges: 2 }
    ],
    'This Month': [
      { rank: 1, name: 'IT Operations', savings: '480 kg CO₂', points: 1520, badges: 14 },
      { rank: 2, name: 'HR & Admin', savings: '410 kg CO₂', points: 1250, badges: 9 },
      { rank: 3, name: 'Finance & Legal', savings: '380 kg CO₂', points: 1100, badges: 8 },
      { rank: 4, name: 'Sustainability Board', savings: '350 kg CO₂', points: 980, badges: 7 },
      { rank: 5, name: 'Sales & Marketing', savings: '290 kg CO₂', points: 820, badges: 4 },
      { rank: 6, name: 'Manufacturing', savings: '220 kg CO₂', points: 650, badges: 3 }
    ],
    'This Quarter': [
      { rank: 1, name: 'IT Operations', savings: '1450 kg CO₂', points: 4500, badges: 18 },
      { rank: 2, name: 'HR & Admin', savings: '1200 kg CO₂', points: 3800, badges: 11 },
      { rank: 3, name: 'Sustainability Board', savings: '1100 kg CO₂', points: 3400, badges: 9 },
      { rank: 4, name: 'Finance & Legal', savings: '980 kg CO₂', points: 3000, badges: 10 },
      { rank: 5, name: 'Sales & Marketing', savings: '850 kg CO₂', points: 2600, badges: 6 },
      { rank: 6, name: 'Manufacturing', savings: '710 kg CO₂', points: 2100, badges: 5 }
    ],
    'All Time': [
      { rank: 1, name: 'IT Operations', savings: '5800 kg CO₂', points: 18200, badges: 25 },
      { rank: 2, name: 'HR & Admin', savings: '4900 kg CO₂', points: 15100, badges: 16 },
      { rank: 3, name: 'Sustainability Board', savings: '4400 kg CO₂', points: 13500, badges: 14 },
      { rank: 4, name: 'Finance & Legal', savings: '3900 kg CO₂', points: 12000, badges: 13 },
      { rank: 5, name: 'Sales & Marketing', savings: '3100 kg CO₂', points: 9500, badges: 9 },
      { rank: 6, name: 'Manufacturing', savings: '2600 kg CO₂', points: 8100, badges: 8 }
    ]
  };

  // Fetch current list based on filters
  const currentList = viewType === 'employee' 
    ? employeesData[dateRange] 
    : departmentsData[dateRange];

  // Podium Positions: [2nd, 1st, 3rd]
  const podiumList = [currentList[1], currentList[0], currentList[2]];

  // The rest for the table (rank 4+)
  const tableList = currentList.slice(3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Badge variant="social" className="px-2.5 py-1 text-[11px]">
            Company Rankings
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">EcoSphere Leaderboard</h1>
          <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
            See rankings of top-performing departments and outstanding individual contributions to sustainability.
          </p>
        </div>

        {/* Date Filter & Toggle Options */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-1 w-full sm:w-auto">
            <button
              onClick={() => setViewType('employee')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                viewType === 'employee' 
                  ? 'bg-[#2D6A4F] text-white shadow-sm' 
                  : 'text-[#6B7280] hover:text-[#1A1A1A]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Employees</span>
            </button>
            <button
              onClick={() => setViewType('department')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                viewType === 'department' 
                  ? 'bg-[#2D6A4F] text-white shadow-sm' 
                  : 'text-[#6B7280] hover:text-[#1A1A1A]'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Departments</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 border border-[#EEEEEE] rounded-xl px-2.5 py-2 bg-[#FAFAFA]">
            <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-xs font-semibold text-[#6B7280] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        
        {/* Second Place (Silver) */}
        {podiumList[0] && (
          <div className="order-2 md:order-1">
            <Card className="border border-[#EEEEEE] rounded-2xl p-6 bg-white flex flex-col items-center justify-between h-64 shadow-soft text-center hover:scale-[1.01] transition-transform">
              <div className="space-y-3 flex flex-col items-center">
                <div className="relative">
                  {viewType === 'employee' ? (
                    <img 
                      src={podiumList[0].avatar} 
                      alt={podiumList[0].name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-300 shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-slate-300 flex items-center justify-center shadow-md">
                      <Building className="w-6 h-6 text-slate-500" />
                    </div>
                  )}
                  <span className="absolute -top-2 -right-2 bg-slate-300 text-slate-800 text-[10px] font-extrabold w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow">
                    2
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1A1A1A]">{podiumList[0].name}</h4>
                  <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">
                    {viewType === 'employee' ? podiumList[0].dept : 'EcoSphere Department'}
                  </p>
                </div>
              </div>

              <div className="w-full pt-4 border-t border-[#EEEEEE] space-y-1">
                <p className="text-sm font-bold text-[#2D6A4F]">{podiumList[0].savings}</p>
                <p className="text-[10px] text-[#6B7280] font-semibold">{podiumList[0].points} EcoPoints</p>
              </div>
            </Card>
          </div>
        )}

        {/* First Place (Gold) */}
        {podiumList[1] && (
          <div className="order-1 md:order-2">
            <Card className="border-2 border-[#E9C46A]/40 rounded-2xl p-6 bg-white flex flex-col items-center justify-between h-72 shadow-md text-center hover:scale-[1.01] transition-transform ring-4 ring-[#E9C46A]/10">
              <div className="space-y-4 flex flex-col items-center">
                <div className="relative">
                  {viewType === 'employee' ? (
                    <img 
                      src={podiumList[1].avatar} 
                      alt={podiumList[1].name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#E9C46A] shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-[#E9C46A] flex items-center justify-center shadow-md">
                      <Building className="w-8 h-8 text-amber-600" />
                    </div>
                  )}
                  <span className="absolute -top-2 -right-2 bg-[#E9C46A] text-amber-950 text-[11px] font-extrabold w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow animate-bounce">
                    1
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#1A1A1A]">{podiumList[1].name}</h4>
                  <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                    {viewType === 'employee' ? podiumList[1].dept : 'EcoSphere Department'}
                  </p>
                </div>
              </div>

              <div className="w-full pt-4 border-t border-[#EEEEEE] space-y-1">
                <p className="text-base font-extrabold text-[#2D6A4F]">{podiumList[1].savings}</p>
                <p className="text-xs text-[#6B7280] font-semibold">{podiumList[1].points} EcoPoints</p>
              </div>
            </Card>
          </div>
        )}

        {/* Third Place (Bronze) */}
        {podiumList[2] && (
          <div className="order-3">
            <Card className="border border-[#EEEEEE] rounded-2xl p-6 bg-white flex flex-col items-center justify-between h-60 shadow-soft text-center hover:scale-[1.01] transition-transform">
              <div className="space-y-3 flex flex-col items-center">
                <div className="relative">
                  {viewType === 'employee' ? (
                    <img 
                      src={podiumList[2].avatar} 
                      alt={podiumList[2].name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-600/40 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-orange-50/50 border-2 border-amber-600/40 flex items-center justify-center shadow-md">
                      <Building className="w-5 h-5 text-amber-700" />
                    </div>
                  )}
                  <span className="absolute -top-2 -right-2 bg-amber-700 text-amber-50 text-[9px] font-extrabold w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow">
                    3
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1A1A1A]">{podiumList[2].name}</h4>
                  <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">
                    {viewType === 'employee' ? podiumList[2].dept : 'EcoSphere Department'}
                  </p>
                </div>
              </div>

              <div className="w-full pt-4 border-t border-[#EEEEEE] space-y-1">
                <p className="text-xs font-bold text-[#2D6A4F]">{podiumList[2].savings}</p>
                <p className="text-[10px] text-[#6B7280] font-semibold">{podiumList[2].points} EcoPoints</p>
              </div>
            </Card>
          </div>
        )}

      </div>

      {/* Ranked Table for Remaining Candidates (Rank 4+) */}
      <Card className="space-y-4">
        <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500 fill-amber-100" />
          <span>Top Leaderboard Rankings</span>
        </h3>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="px-6 py-3 text-center w-16">Rank</th>
                <th className="px-6 py-3">Name / Entity</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Carbon Savings</th>
                <th className="px-6 py-3">EcoPoint progress</th>
                <th className="px-6 py-3 text-right">Badges Unlocked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE] text-xs">
              {currentList.map((emp) => {
                const isCurrentUser = viewType === 'employee' && user && emp.name === user.name;
                return (
                  <tr 
                    key={emp.name} 
                    className={`hover:bg-[#FAFAFA]/50 transition-all ${
                      isCurrentUser 
                        ? 'bg-[#E9F5ED] border border-[#2D6A4F]/20' 
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-center text-[#6B7280]">
                      {emp.rank === 1 ? '🥇' : emp.rank === 2 ? '🥈' : emp.rank === 3 ? '🥉' : emp.rank}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {viewType === 'employee' && (
                          <img 
                            src={emp.avatar} 
                            alt={emp.name} 
                            className="w-7 h-7 rounded-full object-cover border border-[#EEEEEE]" 
                          />
                        )}
                        <div>
                          <p className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                            <span>{emp.name}</span>
                            {isCurrentUser && (
                              <span className="text-[9px] font-bold bg-[#2D6A4F] text-white px-1 py-0.2 rounded-full uppercase tracking-wide scale-90">
                                You
                              </span>
                            )}
                          </p>
                          {viewType === 'employee' && <p className="text-[9px] text-[#6B7280]">{emp.dept}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#6B7280]">{viewType === 'employee' ? emp.dept : 'Sustainability Sector'}</td>
                    <td className="px-6 py-4 font-semibold text-[#2D6A4F]">{emp.savings}</td>
                    <td className="px-6 py-4 min-w-[150px]">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#2D6A4F] rounded-full" 
                            style={{ width: `${Math.min(100, (emp.points / (viewType === 'employee' ? 4200 : 18200)) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#1A1A1A]">{emp.points} pts</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-[#6B7280]">
                      <Badge variant="secondary" className="px-2 py-0.5 normal-case font-bold">
                        {emp.badges} Badges
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tier status summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#457B9D]" strokeWidth={2} />
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
                <span className="font-bold text-[#1A1A1A]">2 Departments</span>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-[#EEEEEE] text-[10px] text-[#6B7280]">
            Calculated based on average score points logged.
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2D6A4F]" strokeWidth={2} />
              <span>Active Statistics</span>
            </h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Total Carbon Avoided (Month):</span>
                <span className="font-bold text-[#2D6A4F]">2.8 Tons CO₂e</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Total Active Participants:</span>
                <span className="font-bold text-[#1A1A1A]">94 Employees</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Leaderboard Status:</span>
                <span className="font-bold text-green-700 bg-green-50 border border-green-200/30 px-2 py-0.5 rounded">Active</span>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-[#EEEEEE] text-[10px] text-[#6B7280]">
            Sync status: Live with utilities databases.
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Leaderboard;
