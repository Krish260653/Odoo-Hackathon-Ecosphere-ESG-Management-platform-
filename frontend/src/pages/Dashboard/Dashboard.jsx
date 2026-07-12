import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight,
  Trophy
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

// Seed data
const environmentalSparkline = [
  { val: 75 }, { val: 77 }, { val: 76 }, { val: 79 }, { val: 80 }, { val: 82 }
];

const socialSparkline = [
  { val: 71 }, { val: 73 }, { val: 72 }, { val: 74 }, { val: 73 }, { val: 74 }
];

const governanceSparkline = [
  { val: 81 }, { val: 80 }, { val: 79 }, { val: 79 }, { val: 78 }, { val: 79 }
];

const carbonTrendData = [
  { month: 'Jan', emissions: 240 },
  { month: 'Feb', emissions: 228 },
  { month: 'Mar', emissions: 215 },
  { month: 'Apr', emissions: 198 },
  { month: 'May', emissions: 185 },
  { month: 'Jun', emissions: 168 }
];

const recentActivities = [
  {
    id: 1,
    type: 'approval',
    title: 'CSR activity approved for Priya Sharma',
    time: '2 hours ago',
    details: 'Tree plantation drive initiative points credited.'
  },
  {
    id: 2,
    type: 'compliance',
    title: 'New compliance issue in Manufacturing',
    time: '4 hours ago',
    details: 'Minor waste management protocol discrepancy noted.'
  },
  {
    id: 3,
    type: 'badge',
    title: 'Badge "Carbon Saver" unlocked by Amit Kumar',
    time: '1 day ago',
    details: 'Achieved 30 days of consecutive low-carbon commuting.'
  },
  {
    id: 4,
    type: 'approval',
    title: 'Governance Q2 audit completed',
    time: '2 days ago',
    details: '100% policy sign-off compliance achieved across IT & HR.'
  },
  {
    id: 5,
    type: 'compliance',
    title: 'Update required on Energy Efficiency goals',
    time: '3 days ago',
    details: 'Q2 target missed by 1.2% in primary warehouse facility.'
  }
];

const departmentScores = [
  { name: 'IT Operations', score: 92, rank: 1 },
  { name: 'HR & Admin', score: 88, rank: 2 },
  { name: 'Finance & Legal', score: 84, rank: 3 },
  { name: 'Sales & Marketing', score: 79, rank: 4 },
  { name: 'Manufacturing', score: 68, rank: 5 }
];

const Dashboard = () => {
  // ESG circular progress parameters
  const score = 78;
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      
      {/* Header: Overall ESG Score Card */}
      <Card className="md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Circular Progress Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-[#EEEEEE]"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress Arc */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-[#2D6A4F]"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-[#1A1A1A] tracking-tight">{score}</span>
            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mt-0.5">Overall ESG</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div>
            <Badge variant="environmental" className="px-2.5 py-1 text-[11px]">
              EcoSphere Rating
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">Overall ESG Performance</h2>
            <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
              Our current overall score stands at {score}/100. This is calculated as a weighted average representing environmental carbon footprint metrics, diversity & employee safety initiatives, and policy sign-offs.
            </p>
          </div>
          <div className="pt-2 border-t border-[#EEEEEE] flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-1.5 text-xs text-[#6B7280] font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F]"></span> Environmental <strong className="text-[#1A1A1A]">40%</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#457B9D]"></span> Social <strong className="text-[#1A1A1A]">30%</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E9C46A]"></span> Governance <strong className="text-[#1A1A1A]">30%</strong>
            </span>
          </div>
        </div>
      </Card>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Environmental */}
        <Card className="flex flex-col justify-between h-44 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest block">Environmental Score</span>
              <span className="text-3xl font-bold text-[#1A1A1A] mt-1 block">82</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200/50 rounded-full text-green-700 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+2.4%</span>
            </div>
          </div>
          <div className="w-full mt-4">
            <ResponsiveContainer width="100%" height={32}>
              <AreaChart data={environmentalSparkline}>
                <defs>
                  <linearGradient id="colorEnv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#2D6A4F" strokeWidth={1.5} fillOpacity={1} fill="url(#colorEnv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Card 2: Social */}
        <Card className="flex flex-col justify-between h-44 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest block">Social Score</span>
              <span className="text-3xl font-bold text-[#1A1A1A] mt-1 block">74</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200/50 rounded-full text-green-700 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+1.2%</span>
            </div>
          </div>
          <div className="w-full mt-4">
            <ResponsiveContainer width="100%" height={32}>
              <AreaChart data={socialSparkline}>
                <defs>
                  <linearGradient id="colorSoc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#457B9D" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#457B9D" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#457B9D" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSoc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Card 3: Governance */}
        <Card className="flex flex-col justify-between h-44 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest block">Governance Score</span>
              <span className="text-3xl font-bold text-[#1A1A1A] mt-1 block">79</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-200/50 rounded-full text-red-700 text-xs font-semibold">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-0.5%</span>
            </div>
          </div>
          <div className="w-full mt-4">
            <ResponsiveContainer width="100%" height={32}>
              <AreaChart data={governanceSparkline}>
                <defs>
                  <linearGradient id="colorGov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E9C46A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#E9C46A" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#E9C46A" strokeWidth={1.5} fillOpacity={1} fill="url(#colorGov)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

      {/* Split Grid: Recent Activity & Top Departments */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column: Recent Activity (60%) */}
        <Card className="lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EEEEEE] mb-4">
              <h3 className="font-semibold text-base text-[#1A1A1A]">Recent ESG Activity</h3>
              <span className="text-xs font-medium text-[#6B7280]">Live feed</span>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start text-left">
                  {/* Icon based on type */}
                  <div className="mt-0.5 flex-shrink-0">
                    {activity.type === 'approval' && (
                      <div className="w-7 h-7 rounded-lg bg-[#E9F5ED] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" strokeWidth={2} />
                      </div>
                    )}
                    {activity.type === 'compliance' && (
                      <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-red-600" strokeWidth={2} />
                      </div>
                    )}
                    {activity.type === 'badge' && (
                      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Award className="w-4 h-4 text-amber-600" strokeWidth={2} />
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A1A] leading-normal">{activity.title}</p>
                    <p className="text-xs text-[#6B7280] leading-normal mt-0.5">{activity.details}</p>
                  </div>
                  {/* Timestamp */}
                  <div className="text-[10px] font-semibold text-[#6B7280] whitespace-nowrap pt-0.5 uppercase tracking-wider">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#EEEEEE]">
            <button className="text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1">
              <span>View all audits & actions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

        {/* Right Column: Top Departments (40%) */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EEEEEE] mb-4">
              <h3 className="font-semibold text-base text-[#1A1A1A]">Top ESG Departments</h3>
              <span className="text-xs font-medium text-[#6B7280]">Q2 Leaderboard</span>
            </div>

            <div className="space-y-4">
              {departmentScores.map((dept) => (
                <div key={dept.name} className="flex items-center gap-3">
                  {/* Rank indicator */}
                  <div className="w-6 flex-shrink-0 flex items-center justify-center">
                    {dept.rank === 1 ? (
                      <Trophy className="w-4 h-4 text-amber-500 fill-amber-100" strokeWidth={2} />
                    ) : (
                      <span className="text-xs font-bold text-[#6B7280]">{dept.rank}</span>
                    )}
                  </div>

                  {/* Dept Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-[#1A1A1A] truncate">{dept.name}</span>
                      <span className="font-bold text-[#1A1A1A]">{dept.score}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          dept.rank === 1 
                            ? 'bg-[#2D6A4F]' 
                            : dept.score >= 80 
                            ? 'bg-[#457B9D]' 
                            : 'bg-amber-400'
                        }`} 
                        style={{ width: `${dept.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#EEEEEE]">
            <button className="text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1">
              <span>Full departmental comparison</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

      </div>

      {/* Bottom Section: Carbon Emissions Trend (100%) */}
      <Card>
        <div className="flex items-center justify-between pb-4 border-b border-[#EEEEEE] mb-6">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A]">Carbon Emissions Trend</h3>
            <p className="text-xs text-[#6B7280] mt-0.5">Scope 1 & 2 emissions (Metric Tons CO₂e) over the last 6 months</p>
          </div>
          <Badge variant="environmental" className="px-2.5 py-1 normal-case text-xs font-semibold">
            Target: 150 MT CO₂e by Q4
          </Badge>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={carbonTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dy={10} 
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#FFFFFF', 
                  borderColor: '#EEEEEE', 
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                  fontSize: '12px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="emissions" 
                stroke="#2D6A4F" 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 1.5, stroke: '#2D6A4F', fill: '#FFFFFF' }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

    </div>
  );
};

export default Dashboard;
