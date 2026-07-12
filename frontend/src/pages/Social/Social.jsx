import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { 
  Users, 
  Heart, 
  Award, 
  ShieldAlert, 
  Plus, 
  Check, 
  X, 
  Info, 
  Sparkles,
  BookOpen,
  Calendar,
  Briefcase
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Social = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeKpi, setActiveKpi] = useState('volunteer');

  // Modal State for CSR Activities
  const [showCSRModal, setShowCSRModal] = useState(false);
  const [newCSR, setNewCSR] = useState({
    name: '',
    activity: '',
    category: 'Environmental',
    dept: 'IT Operations',
    date: '',
    desc: ''
  });

  // CSR Activities List State
  const [csrActivities, setCsrActivities] = useState([
    { id: 1, name: 'Priya Sharma', dept: 'IT Operations', activity: 'E-Waste Recycling Drive', category: 'Environmental', date: '2026-07-10', desc: 'Organized campus-wide e-waste collection and certified disposal.', status: 'Approved' },
    { id: 2, name: 'Rahul Mehta', dept: 'HR & Admin', activity: 'Community School Tutoring', category: 'Social', date: '2026-07-08', desc: 'Conducted weekly teaching and mentoring sessions at local schools.', status: 'Approved' },
    { id: 3, name: 'Siddharth Joshi', dept: 'Finance & Legal', activity: 'City Canal Cleanup Support', category: 'Environmental', date: '2026-07-12', desc: 'Coordinated funding and volunteers for the city lake cleanup drive.', status: 'Pending Approval' }
  ]);

  // Employee Participation State
  const [participations, setParticipations] = useState([
    { id: 1, name: 'Amit Kumar', dept: 'IT Operations', activity: 'Low-Carbon Commute Program', hours: 12, date: '2026-07-11', status: 'Pending' },
    { id: 2, name: 'Neha Sharma', dept: 'Sustainability Board', activity: 'Green Audit Support', hours: 8, date: '2026-07-10', status: 'Approved' },
    { id: 3, name: 'Vikram Singh', dept: 'Manufacturing', activity: 'Energy Audit Compliance', hours: 15, date: '2026-07-09', status: 'Pending' },
    { id: 4, name: 'Pooja Patel', dept: 'Sales & Marketing', activity: 'Social Outreach Campaign', hours: 6, date: '2026-07-07', status: 'Rejected' },
    { id: 5, name: 'Karan Johar', dept: 'Finance & Legal', activity: 'Governance Training Sign-off', hours: 4, date: '2026-07-06', status: 'Pending' }
  ]);

  // Chart Data
  const deptCSRData = [
    { dept: 'IT Operations', hours: 450 },
    { dept: 'HR & Admin', hours: 320 },
    { dept: 'Finance & Legal', hours: 180 },
    { dept: 'Sales & Marketing', hours: 150 },
    { dept: 'Manufacturing', hours: 140 }
  ];

  const diversityData = [
    { name: 'Female', value: 42, color: '#2D6A4F' },
    { name: 'Male', value: 55, color: '#457B9D' },
    { name: 'Non-binary/Other', value: 3, color: '#E9C46A' }
  ];

  const regionalDiversityData = [
    { region: 'North India', percentage: 28 },
    { region: 'South India', percentage: 32 },
    { region: 'West India', percentage: 22 },
    { region: 'East India', percentage: 12 },
    { region: 'International', percentage: 6 }
  ];

  const trainingData = [
    { course: 'ESG & Sustainability Essentials', target: 100, completed: 96, dept: 'All' },
    { course: 'Workplace Safety & Hazard Protocol', target: 100, completed: 94, dept: 'Manufacturing' },
    { course: 'Prevention of Sexual Harassment (POSH)', target: 100, completed: 98, dept: 'All' },
    { course: 'Information Security & GDPR compliance', target: 100, completed: 91, dept: 'IT Operations' },
    { course: 'Anti-Bribery and Fair Practices Code', target: 100, completed: 89, dept: 'Finance & Legal' }
  ];

  // Handler functions
  const handleApproveParticipation = (id) => {
    setParticipations(prev => 
      prev.map(p => p.id === id ? { ...p, status: 'Approved' } : p)
    );
  };

  const handleRejectParticipation = (id) => {
    setParticipations(prev => 
      prev.map(p => p.id === id ? { ...p, status: 'Rejected' } : p)
    );
  };

  const handleAddCSRActivity = (e) => {
    e.preventDefault();
    if (!newCSR.name || !newCSR.activity || !newCSR.date) return;

    const entry = {
      id: Date.now(),
      name: newCSR.name,
      dept: newCSR.dept,
      activity: newCSR.activity,
      category: newCSR.category,
      date: newCSR.date,
      desc: newCSR.desc || 'No description provided.',
      status: 'Pending Approval'
    };

    setCsrActivities(prev => [entry, ...prev]);
    setShowCSRModal(false);
    setNewCSR({
      name: '',
      activity: '',
      category: 'Environmental',
      dept: 'IT Operations',
      date: '',
      desc: ''
    });
  };

  const kpiDetails = {
    volunteer: {
      title: 'Volunteer Contributions',
      metric: '1,240 Hours logged',
      desc: 'This measures the total number of hours completed by employees in CSR-approved volunteering activities like local school tutoring, canal cleaning, and recycling campaigns.',
      highlight: 'IT Operations contributed the most with 450 hours.'
    },
    safety: {
      title: 'Safety Training Sign-off',
      metric: '94.6% Compliance',
      desc: 'All factory and office employees are required to sign off on annual safety guidelines. Compliance is measured by percentage of complete tests.',
      highlight: 'Manufacturing is leading safety protocols at 94% sign-off.'
    },
    diversity: {
      title: 'Campus Diversity Rating',
      metric: '4.2 / 5.0 Rating',
      desc: 'A score derived from third-party diversity auditing, measuring gender balance, regional inclusivity, accessibility standards, and employee sentiments.',
      highlight: 'Recently rose from 4.0 last quarter due to POSH completion and HR campaigns.'
    }
  };

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

      {/* Tab Navigation */}
      <div className="flex border-b border-[#EEEEEE] overflow-x-auto no-scrollbar gap-6">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'csr', label: 'CSR Activities' },
          { id: 'participation', label: 'Employee Participation' },
          { id: 'diversity', label: 'Diversity Metrics' },
          { id: 'training', label: 'Training Completion' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors duration-150 ${
              activeTab === tab.id
                ? 'border-[#2D6A4F] text-[#2D6A4F]'
                : 'border-transparent text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => setActiveKpi('volunteer')}
              className={`cursor-pointer p-6 bg-white border rounded-[16px] transition-all duration-200 hover:shadow-md ${
                activeKpi === 'volunteer' ? 'border-[#2D6A4F] ring-1 ring-[#2D6A4F]/20' : 'border-[#EEEEEE]'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Volunteer Hours</span>
                <Heart className="w-5 h-5 text-red-500 fill-red-100" />
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A] mt-3">1,240</p>
              <p className="text-xs text-[#6B7280] mt-1">Hours logged this year</p>
            </div>

            <div 
              onClick={() => setActiveKpi('safety')}
              className={`cursor-pointer p-6 bg-white border rounded-[16px] transition-all duration-200 hover:shadow-md ${
                activeKpi === 'safety' ? 'border-[#2D6A4F] ring-1 ring-[#2D6A4F]/20' : 'border-[#EEEEEE]'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Training Sign-off</span>
                <Award className="w-5 h-5 text-[#2D6A4F]" />
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A] mt-3">94.6%</p>
              <p className="text-xs text-[#6B7280] mt-1">Overall completion rate</p>
            </div>

            <div 
              onClick={() => setActiveKpi('diversity')}
              className={`cursor-pointer p-6 bg-white border rounded-[16px] transition-all duration-200 hover:shadow-md ${
                activeKpi === 'diversity' ? 'border-[#2D6A4F] ring-1 ring-[#2D6A4F]/20' : 'border-[#EEEEEE]'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Diversity Rating</span>
                <Users className="w-5 h-5 text-[#457B9D]" />
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A] mt-3">4.2 <span className="text-sm text-[#6B7280] font-normal">/ 5.0</span></p>
              <p className="text-xs text-[#6B7280] mt-1">Employee survey score</p>
            </div>
          </div>

          {/* Interactive KPI Details Box */}
          <Card className="bg-[#FAFAFA] border border-[#EEEEEE]">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-[#1A1A1A]">{kpiDetails[activeKpi].title} - Detailed Insight</h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{kpiDetails[activeKpi].desc}</p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[#E9F5ED] text-[#2D6A4F] border border-[#2D6A4F]/10 rounded-lg px-2.5 py-1 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{kpiDetails[activeKpi].highlight}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#2D6A4F]" />
                <span>CSR Volunteering by Department (Hours)</span>
              </h3>
              <div className="w-full h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptCSRData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" vertical={false} />
                    <XAxis dataKey="dept" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #EEEEEE' }} />
                    <Bar dataKey="hours" fill="#457B9D" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#457B9D]" />
                <span>Gender Diversity Distribution</span>
              </h3>
              <div className="w-full h-64 flex flex-col justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={diversityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {diversityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 text-xs text-[#6B7280] font-medium mt-2">
                  {diversityData.map(entry => (
                    <span key={entry.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span>{entry.name} ({entry.value}%)</span>
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'csr' && (
        <Card className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#EEEEEE]">
            <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#2D6A4F]" />
              <span>Corporate Social Responsibility Log</span>
            </h3>
            <Button size="sm" onClick={() => setShowCSRModal(true)} className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>Create CSR Activity</span>
            </Button>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="px-6 py-3">Initiated By</th>
                  <th className="px-6 py-3">Activity & Details</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] text-xs">
                {csrActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-[#FAFAFA]/50">
                    <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{act.name}</td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-semibold text-[#1A1A1A]">{act.activity}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5 line-clamp-1">{act.desc}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={act.category === 'Environmental' ? 'environmental' : 'social'}>
                        {act.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-[#6B7280]">{act.dept}</td>
                    <td className="px-6 py-4 text-[#6B7280] whitespace-nowrap">{act.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={act.status === 'Approved' ? 'environmental' : 'secondary'}>
                        {act.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CSR Modal */}
          {showCSRModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-2xl border border-[#EEEEEE] shadow-xl w-full max-w-md p-6 mx-4 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex justify-between items-center pb-3 border-b border-[#EEEEEE] mb-4">
                  <h3 className="text-base font-bold text-[#1A1A1A]">Create New CSR Activity</h3>
                  <button onClick={() => setShowCSRModal(false)} className="text-[#6B7280] hover:text-[#1A1A1A]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddCSRActivity} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Initiator Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Amit Kumar"
                      required
                      value={newCSR.name}
                      onChange={(e) => setNewCSR({ ...newCSR, name: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Activity Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tree Plantation Drive"
                      required
                      value={newCSR.activity}
                      onChange={(e) => setNewCSR({ ...newCSR, activity: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Category</label>
                      <select 
                        value={newCSR.category}
                        onChange={(e) => setNewCSR({ ...newCSR, category: e.target.value })}
                        className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                      >
                        <option value="Environmental">Environmental</option>
                        <option value="Social">Social</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Department</label>
                      <select 
                        value={newCSR.dept}
                        onChange={(e) => setNewCSR({ ...newCSR, dept: e.target.value })}
                        className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                      >
                        <option value="IT Operations">IT Operations</option>
                        <option value="HR & Admin">HR & Admin</option>
                        <option value="Finance & Legal">Finance & Legal</option>
                        <option value="Sales & Marketing">Sales & Marketing</option>
                        <option value="Manufacturing">Manufacturing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Date</label>
                    <input 
                      type="date" 
                      required
                      value={newCSR.date}
                      onChange={(e) => setNewCSR({ ...newCSR, date: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Description</label>
                    <textarea 
                      rows="3"
                      placeholder="Describe the initiative and scope of volunteers..."
                      value={newCSR.desc}
                      onChange={(e) => setNewCSR({ ...newCSR, desc: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    <Button variant="secondary" onClick={() => setShowCSRModal(false)}>Cancel</Button>
                    <Button type="submit">Submit Activity</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'participation' && (
        <Card className="space-y-4">
          <div className="pb-3 border-b border-[#EEEEEE]">
            <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#457B9D]" />
              <span>Employee Volunteering & Participation Approvals</span>
            </h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Approve or Reject hours logged by employees for validation against environmental incentives.
            </p>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Activity</th>
                  <th className="px-6 py-3">Hours Logged</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] text-xs">
                {participations.map((part) => (
                  <tr key={part.id} className="hover:bg-[#FAFAFA]/50">
                    <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{part.name}</td>
                    <td className="px-6 py-4 text-[#6B7280]">{part.dept}</td>
                    <td className="px-6 py-4 text-[#1A1A1A]">{part.activity}</td>
                    <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{part.hours} hrs</td>
                    <td className="px-6 py-4 text-[#6B7280] whitespace-nowrap">{part.date}</td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant={
                          part.status === 'Approved' 
                            ? 'environmental' 
                            : part.status === 'Rejected' 
                            ? 'secondary' 
                            : 'primary'
                        }
                        className={part.status === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-200/20' : ''}
                      >
                        {part.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {part.status === 'Pending' ? (
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => handleApproveParticipation(part.id)}
                            className="p-1 rounded-md bg-[#E9F5ED] hover:bg-[#D2EBDC] text-[#2D6A4F] transition-all"
                            title="Approve"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleRejectParticipation(part.id)}
                            className="p-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#6B7280] italic">Decision Logged</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'diversity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#2D6A4F]" />
                <span>Regional Diversity Composition (%)</span>
              </h3>
              <div className="w-full h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalDiversityData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" horizontal={false} />
                    <XAxis type="number" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis dataKey="region" type="category" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#2D6A4F" radius={[0, 4, 4, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Diversity & Inclusion Milestones</span>
                </h3>
                <div className="space-y-3.5 text-xs text-left mt-2">
                  <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">Equal Opportunity Employer Certificate</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">Recertified for 2026-2027 by National Diversity Council.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">Maternity Returner Program Success</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">92% of new mothers returned to active roles in Q1-Q2 with custom workspaces.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">Accessibility Upgrades - Bangalore Campus</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">Audit reports suggest 85% compliance, target 100% compliance by end of year.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[#6B7280] mt-4 pt-3 border-t border-[#EEEEEE]">
                Data compiled from active employee headcount parameters.
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'training' && (
        <Card className="space-y-4">
          <div className="pb-3 border-b border-[#EEEEEE]">
            <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Regulatory Training Completion Ledger</span>
            </h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Verify compliance for mandatory trainings conducted across departments.
            </p>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="px-6 py-3">Training Course Module</th>
                  <th className="px-6 py-3">Applicable Group</th>
                  <th className="px-6 py-3">Progress Bar</th>
                  <th className="px-6 py-3">Completed</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] text-xs">
                {trainingData.map((trn, index) => (
                  <tr key={index} className="hover:bg-[#FAFAFA]/50">
                    <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{trn.course}</td>
                    <td className="px-6 py-4 text-[#6B7280]">
                      <Badge variant={trn.dept === 'All' ? 'secondary' : 'primary'}>{trn.dept}</Badge>
                    </td>
                    <td className="px-6 py-4 min-w-[150px]">
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              trn.completed >= 95 ? 'bg-[#2D6A4F]' : 'bg-[#457B9D]'
                            }`} 
                            style={{ width: `${trn.completed}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#1A1A1A]">{trn.completed}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#6B7280]">{trn.completed}% ({trn.target}% target)</td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={trn.completed >= 95 ? 'environmental' : 'governance'}>
                        {trn.completed >= 95 ? 'Compliant' : 'Nearing Target'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Social;
