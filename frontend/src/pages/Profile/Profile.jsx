import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { 
  User, 
  MapPin, 
  Shield, 
  Award, 
  CheckCircle2, 
  Lock, 
  Activity,
  Flame,
  Star,
  FileText
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Seed data based on role
  const stats = isAdmin 
    ? [
        { label: 'Departments Managed', value: '5', change: 'All active', icon: Shield, color: 'text-[#457B9D] bg-[#EBF3F7]' },
        { label: 'Compliance Issues Resolved', value: '12', change: '+2 this month', icon: CheckCircle2, color: 'text-primary bg-primary-light' },
        { label: 'Reports Generated', value: '8', change: 'Audit-ready', icon: FileText, color: 'text-amber-700 bg-[#FDF8EC]' }
      ]
    : [
        { label: 'Total XP Earned', value: '1,850', change: '+150 this week', icon: Flame, color: 'text-orange-600 bg-orange-50' },
        { label: 'Badges Earned', value: '3 / 5', change: 'Top 15% player', icon: Award, color: 'text-primary bg-primary-light' },
        { label: 'Challenges Completed', value: '6', change: 'All-time total', icon: Star, color: 'text-amber-700 bg-[#FDF8EC]' }
      ];

  const badges = [
    { name: 'Carbon Saver', desc: 'Commute low-carbon for 30 days', unlocked: true, type: 'env' },
    { name: 'Team Player', desc: 'Participate in 3 CSR campaigns', unlocked: true, type: 'soc' },
    { name: 'Policy Champion', desc: 'Sign off on all Q2 policies', unlocked: true, type: 'gov' },
    { name: 'Climate Advocate', desc: 'Complete zero waste challenge', unlocked: false, type: 'env' },
    { name: 'Waste Reducer', desc: 'Reduce office waste footprint', unlocked: false, type: 'gov' }
  ];

  const activityLog = isAdmin
    ? [
        { action: 'Approved volunteer points request for Amit Kumar', time: '2 hours ago', type: 'approval' },
        { action: 'Uploaded new regulatory policy: Data Security & ESG Privacy Protocol', time: '1 day ago', type: 'system' },
        { action: 'Resolved waste disposal compliance ticket in Manufacturing dept', time: '2 days ago', type: 'compliance' },
        { action: 'Generated EU CSRD Alignment Disclosure 2026 report', time: '4 days ago', type: 'system' },
        { action: 'Updated natural gas emission factor value coefficient', time: '1 week ago', type: 'system' }
      ]
    : [
        { action: 'Joined "Low-Carbon Commute" 30-day corporate challenge', time: '2 hours ago', type: 'challenge' },
        { action: 'Signed "Anti-Bribery and Corruption Policy v3" compliance sign-off', time: '1 day ago', type: 'policy' },
        { action: 'Uploaded volunteering proof verification for local recycling drive', time: '3 days ago', type: 'csr' },
        { action: 'Unlocked badge achievement "Policy Champion"', time: '5 days ago', type: 'badge' },
        { action: 'Completed security checklist Q2 compliance review', time: '2 weeks ago', type: 'policy' }
      ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      
      {/* 1. Header Profile Card */}
      <Card className="flex flex-col md:flex-row items-center md:items-start gap-6 relative">
        <img 
          src={user?.avatarUrl} 
          alt={user?.name} 
          className="w-24 h-24 rounded-full object-cover border-2 border-[#EEEEEE]" 
        />
        <div className="flex-1 text-center md:text-left space-y-3">
          <div>
            <div className="flex flex-col md:flex-row items-center gap-2.5">
              <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{user?.name}</h2>
              <Badge variant={isAdmin ? 'admin' : 'employee'}>{user?.role}</Badge>
            </div>
            <p className="text-sm text-[#6B7280] mt-1 font-medium">{user?.email}</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-1.5 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#6B7280]" />
              <span>Bangalore, India HQ</span>
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#6B7280]" />
              <span>{user?.department}</span>
            </span>
          </div>
        </div>
      </Card>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">{stat.label}</span>
                <span className="text-3xl font-bold text-[#1A1A1A] block">{stat.value}</span>
                <span className="text-[10px] font-semibold text-[#6B7280] block mt-0.5">{stat.change}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. Achievements / Badges Section */}
      <Card>
        <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
          <span>Earned Achievements & Badges</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((badge, idx) => (
            <div 
              key={idx}
              className={`p-4 border rounded-xl flex flex-col items-center text-center space-y-2.5 transition-all select-none ${
                badge.unlocked 
                  ? 'bg-white border-[#EEEEEE] shadow-sm hover:shadow-md' 
                  : 'bg-gray-50/50 border-[#EEEEEE] opacity-60'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                !badge.unlocked
                  ? 'bg-gray-100 text-gray-400'
                  : badge.type === 'env'
                  ? 'bg-[#E9F5ED] text-[#2D6A4F]'
                  : badge.type === 'soc'
                  ? 'bg-[#EBF3F7] text-[#457B9D]'
                  : 'bg-[#FDF8EC] text-amber-600'
              }`}>
                {badge.unlocked ? (
                  <Award className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                )}
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[#1A1A1A]">{badge.name}</p>
                <p className="text-[10px] text-[#6B7280] leading-tight mt-0.5">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Activity History Feed */}
      <Card>
        <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <span>My Activity Log</span>
        </h3>

        <div className="space-y-4">
          {activityLog.map((log, idx) => (
            <div key={idx} className="flex gap-4 items-start pb-3 border-b border-[#EEEEEE]/50 last:border-0 last:pb-0">
              <div className="mt-0.5 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#1A1A1A] leading-normal">{log.action}</p>
                <p className="text-[10px] text-[#B0B0B0] mt-0.5">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

export default Profile;
