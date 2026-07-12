import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { 
  Shield, 
  BookOpen, 
  AlertTriangle, 
  ShieldCheck, 
  Plus, 
  X, 
  Eye, 
  Check, 
  Calendar,
  User,
  Filter
} from 'lucide-react';

const Governance = () => {
  const [activeTab, setActiveTab] = useState('policies');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Policy Modal state
  const [activePolicyModal, setActivePolicyModal] = useState(null);

  // Audit Modal state
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [newAudit, setNewAudit] = useState({
    name: '',
    dept: 'IT Operations',
    date: '',
    auditor: ''
  });

  // Issue Modal state
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [newIssue, setNewIssue] = useState({
    desc: '',
    severity: 'Medium',
    owner: 'Neha Sharma',
    dueDate: ''
  });

  // Data State
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: 'Anti-Bribery and Corruption Policy v3',
      subtitle: 'Mandatory annual signature from all active personnel',
      signed: '98.4%',
      status: 'Compliant',
      details: 'This policy outlines the company\'s absolute prohibition of any form of bribery, kickbacks, or corrupt practices. It applies to all employees, contractors, and third-party vendors. Facilitation payments are strictly prohibited, and gifts above ₹5,000 must be formally logged in the registry.'
    },
    {
      id: 2,
      title: 'Data Security & ESG Privacy Protocol',
      subtitle: 'Covers user information and GDPR/DPDP Act classification',
      signed: '92.1%',
      status: 'Compliant',
      details: 'Governs the protection and compliance parameters regarding client and employee personal data. Establishes protocols for classification of sensitive information, data deletion schedules, access control guidelines, and rules for logging security incidents within 24 hours.'
    },
    {
      id: 3,
      title: 'Whistleblower Safe Harbor Protection Act',
      subtitle: 'Provides channels for report logging anonymity',
      signed: '84.0%',
      status: 'In Progress',
      details: 'Protects employees who report unethical behaviors, financial anomalies, or environmental violations. Guarantees complete anonymity through internal and external third-party logging tools, and strictly prohibits retaliation or discrimination against any reporting worker.'
    },
    {
      id: 4,
      title: 'Fair Sourcing & Human Rights Code',
      subtitle: 'Standards for vendor vetting and supplier sustainability',
      signed: '77.5%',
      status: 'In Progress',
      details: 'Ensures that EcoSphere\'s entire supply chain adheres to core labor standards, prohibits child labor, enforces fair wages, and evaluates carbon offset parameters. All vendors with annual contract values > ₹10,00,000 must undergo this certification.'
    }
  ]);

  const [acknowledgements, setAcknowledgements] = useState([
    { id: 1, name: 'Amit Kumar', dept: 'IT Operations', policy: 'Anti-Bribery Policy v3', date: '2026-06-15', status: 'Acknowledged' },
    { id: 2, name: 'Priya Sharma', dept: 'IT Operations', policy: 'Data Security Protocol', date: '2026-06-20', status: 'Acknowledged' },
    { id: 3, name: 'Siddharth Joshi', dept: 'Finance & Legal', policy: 'Whistleblower Act', date: '2026-07-02', status: 'Acknowledged' },
    { id: 4, name: 'Vikram Singh', dept: 'Manufacturing', policy: 'Anti-Bribery Policy v3', date: '2026-07-10', status: 'Acknowledged' },
    { id: 5, name: 'Rahul Mehta', dept: 'HR & Admin', policy: 'Data Security Protocol', date: '', status: 'Pending' },
    { id: 6, name: 'Pooja Patel', dept: 'Sales & Marketing', policy: 'Anti-Bribery Policy v3', date: '2026-07-05', status: 'Acknowledged' },
    { id: 7, name: 'Karan Johar', dept: 'Finance & Legal', policy: 'Data Security Protocol', date: '', status: 'Pending' },
    { id: 8, name: 'Neha Sharma', dept: 'Sustainability Board', policy: 'Whistleblower Act', date: '2026-06-30', status: 'Acknowledged' }
  ]);

  const [audits, setAudits] = useState([
    { id: 1, code: 'AUD-998', name: 'Q2 Internal Energy Audit', dept: 'Manufacturing', date: '2026-06-18', auditor: 'Pooja Singhal', status: 'Completed' },
    { id: 2, code: 'AUD-999', name: 'GDPR Data Alignment Review', dept: 'IT Operations', date: '2026-07-25', auditor: 'Rajesh Nair', status: 'Scheduled' },
    { id: 3, code: 'AUD-1000', name: 'Supply Chain Sourcing Audit', dept: 'Finance & Legal', date: '2026-07-10', auditor: 'Vikram Mehta', status: 'In Progress' },
    { id: 4, code: 'AUD-1001', name: 'Diversity and Equal Pay Review', dept: 'HR & Admin', date: '2026-08-05', auditor: 'Priya Sharma', status: 'Scheduled' }
  ]);

  const [issues, setIssues] = useState([
    { id: 1, desc: 'Waste recycling disposal protocols not adhered to in plant 2B.', severity: 'Critical', owner: 'Vikram Singh', dept: 'Manufacturing', dueDate: '2026-06-15', status: 'Open' },
    { id: 2, desc: 'Server room carbon offset credit registration delayed by 3 weeks.', severity: 'Warning', owner: 'Amit Kumar', dept: 'IT Operations', dueDate: '2026-07-01', status: 'Open' },
    { id: 3, desc: 'Vendor ISO certification documents missing from central archive.', severity: 'Low', owner: 'Siddharth Joshi', dept: 'Finance & Legal', dueDate: '2026-07-28', status: 'Open' },
    { id: 4, desc: 'Emergency fire exit blocked in building C basement.', severity: 'Critical', owner: 'Rahul Mehta', dept: 'HR & Admin', dueDate: '2026-06-10', status: 'Resolved' }
  ]);

  // Today's date for overdue calculations (2026-07-12)
  const TODAY = new Date('2026-07-12');

  const checkOverdue = (dueDate, status) => {
    if (status === 'Resolved') return false;
    const due = new Date(dueDate);
    return due < TODAY;
  };

  // Filter Acknowledgements by Department
  const filteredAcknowledgements = selectedDeptFilter === 'All' 
    ? acknowledgements 
    : acknowledgements.filter(item => item.dept === selectedDeptFilter);

  // Form submits
  const handleScheduleAudit = (e) => {
    e.preventDefault();
    if (!newAudit.name || !newAudit.date || !newAudit.auditor) return;

    const auditEntry = {
      id: Date.now(),
      code: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newAudit.name,
      dept: newAudit.dept,
      date: newAudit.date,
      auditor: newAudit.auditor,
      status: 'Scheduled'
    };

    setAudits(prev => [auditEntry, ...prev]);
    setShowAuditModal(false);
    setNewAudit({
      name: '',
      dept: 'IT Operations',
      date: '',
      auditor: ''
    });
  };

  const handleReportIssue = (e) => {
    e.preventDefault();
    if (!newIssue.desc || !newIssue.dueDate) return;

    // Deduce dept based on owner mapping
    const ownerDeptMap = {
      'Amit Kumar': 'IT Operations',
      'Priya Sharma': 'IT Operations',
      'Siddharth Joshi': 'Finance & Legal',
      'Vikram Singh': 'Manufacturing',
      'Rahul Mehta': 'HR & Admin',
      'Pooja Patel': 'Sales & Marketing',
      'Neha Sharma': 'Sustainability Board'
    };

    const issueEntry = {
      id: Date.now(),
      desc: newIssue.desc,
      severity: newIssue.severity,
      owner: newIssue.owner,
      dept: ownerDeptMap[newIssue.owner] || 'Sustainability Board',
      dueDate: newIssue.dueDate,
      status: 'Open'
    };

    setIssues(prev => [issueEntry, ...prev]);
    setShowIssueModal(false);
    setNewIssue({
      desc: '',
      severity: 'Medium',
      owner: 'Neha Sharma',
      dueDate: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      {/* Page Header */}
      <div>
        <Badge variant="governance" className="px-2.5 py-1 text-[11px]">
          Governance Module
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">Governance & Compliance</h1>
        <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
          Supervise policy compliance audits, track whistleblower protections, and log formal ESG compliance tickets.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-[#EEEEEE] overflow-x-auto no-scrollbar gap-6">
        {[
          { id: 'policies', label: 'ESG Policies' },
          { id: 'acknowledgements', label: 'Policy Acknowledgement' },
          { id: 'audits', label: 'Audits' },
          { id: 'issues', label: 'Compliance Issues' }
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
      {activeTab === 'policies' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-[#EEEEEE]">
            <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#2D6A4F]" />
              <span>ESG Board Policies & Sign-offs</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map(p => (
              <Card key={p.id} className="flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-sm text-[#1A1A1A] leading-snug">{p.title}</h4>
                    <Badge variant={p.status === 'Compliant' ? 'environmental' : 'governance'}>
                      {p.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-normal">{p.subtitle}</p>

                  <div className="flex justify-between items-center text-xs font-semibold py-2 px-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg">
                    <span className="text-[#6B7280]">Staff Acknowledgement:</span>
                    <span className="text-[#2D6A4F] font-bold">{p.signed} Signed</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EEEEEE] mt-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setActivePolicyModal(p)}
                    className="w-full flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Policy Details</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Policy Detail Modal */}
          {activePolicyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-2xl border border-[#EEEEEE] shadow-xl w-full max-w-lg p-6 mx-4 animate-in fade-in zoom-in-95 duration-150 text-left">
                <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEE] mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A]">{activePolicyModal.title}</h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">{activePolicyModal.subtitle}</p>
                  </div>
                  <button onClick={() => setActivePolicyModal(null)} className="text-[#6B7280] hover:text-[#1A1A1A] flex-shrink-0 ml-4">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-green-50/50 border border-green-200/20 rounded-lg text-xs text-[#2D6A4F] font-semibold flex justify-between items-center">
                    <span>Target Compliance Rate: 90% Required</span>
                    <span>Current Rate: {activePolicyModal.signed}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#1A1A1A]">Official Policy Text</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed bg-[#FAFAFA] border border-[#EEEEEE] p-4 rounded-xl max-h-60 overflow-y-auto">
                      {activePolicyModal.details}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-[#EEEEEE] mt-5">
                  <Button variant="secondary" onClick={() => setActivePolicyModal(null)}>Close</Button>
                  <Button onClick={() => {
                    alert(`Initiated notification alert to outstanding personnel to review "${activePolicyModal.title}".`);
                    setActivePolicyModal(null);
                  }}>
                    Ping Unsigned Staff
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'acknowledgements' && (
        <Card className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-3 border-b border-[#EEEEEE]">
            <div>
              <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                <span>Personnel Policy Acknowledgement Tracker</span>
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Audit live record of employee signatures on compliance directives.
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#6B7280]" />
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="text-xs border border-[#EEEEEE] rounded-lg p-2 bg-[#FAFAFA] font-medium focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
              >
                <option value="All">All Departments</option>
                <option value="IT Operations">IT Operations</option>
                <option value="HR & Admin">HR & Admin</option>
                <option value="Finance & Legal">Finance & Legal</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Sustainability Board">Sustainability Board</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="px-6 py-3">Employee Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Directive Policy Name</th>
                  <th className="px-6 py-3">Signature Date</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] text-xs">
                {filteredAcknowledgements.map((ack) => (
                  <tr key={ack.id} className="hover:bg-[#FAFAFA]/50">
                    <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{ack.name}</td>
                    <td className="px-6 py-4 text-[#6B7280]">{ack.dept}</td>
                    <td className="px-6 py-4 text-[#1A1A1A]">{ack.policy}</td>
                    <td className="px-6 py-4 text-[#6B7280]">{ack.date || '—'}</td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={ack.status === 'Acknowledged' ? 'environmental' : 'secondary'}>
                        {ack.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'audits' && (
        <Card className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#EEEEEE]">
            <div>
              <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Auditing Schedule & Ledger</span>
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Monitor upcoming compliance reviews, regulatory assessments, and logs.
              </p>
            </div>
            <Button size="sm" onClick={() => setShowAuditModal(true)} className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>Schedule Audit</span>
            </Button>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="px-6 py-3">Audit Code</th>
                  <th className="px-6 py-3">Audit Name</th>
                  <th className="px-6 py-3">Target Department</th>
                  <th className="px-6 py-3">Scheduled Date</th>
                  <th className="px-6 py-3">Lead Auditor</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] text-xs">
                {audits.map((a) => (
                  <tr key={a.id} className="hover:bg-[#FAFAFA]/50">
                    <td className="px-6 py-4 font-mono font-bold text-[#6B7280]">{a.code}</td>
                    <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{a.name}</td>
                    <td className="px-6 py-4 text-[#1A1A1A]">{a.dept}</td>
                    <td className="px-6 py-4 text-[#6B7280] whitespace-nowrap">{a.date}</td>
                    <td className="px-6 py-4 text-[#6B7280]">{a.auditor}</td>
                    <td className="px-6 py-4 text-right">
                      <Badge 
                        variant={
                          a.status === 'Completed' 
                            ? 'environmental' 
                            : a.status === 'In Progress' 
                            ? 'governance' 
                            : 'secondary'
                        }
                      >
                        {a.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Audit Scheduling Modal */}
          {showAuditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-2xl border border-[#EEEEEE] shadow-xl w-full max-w-md p-6 mx-4 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex justify-between items-center pb-3 border-b border-[#EEEEEE] mb-4">
                  <h3 className="text-base font-bold text-[#1A1A1A]">Schedule New Compliance Audit</h3>
                  <button onClick={() => setShowAuditModal(false)} className="text-[#6B7280] hover:text-[#1A1A1A]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleScheduleAudit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Audit Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Q3 Environmental Verification Audit"
                      required
                      value={newAudit.name}
                      onChange={(e) => setNewAudit({ ...newAudit, name: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Target Department</label>
                    <select 
                      value={newAudit.dept}
                      onChange={(e) => setNewAudit({ ...newAudit, dept: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                    >
                      <option value="IT Operations">IT Operations</option>
                      <option value="HR & Admin">HR & Admin</option>
                      <option value="Finance & Legal">Finance & Legal</option>
                      <option value="Sales & Marketing">Sales & Marketing</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Scheduled Date</label>
                    <input 
                      type="date" 
                      required
                      value={newAudit.date}
                      onChange={(e) => setNewAudit({ ...newAudit, date: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Lead Auditor</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh Chandra"
                      required
                      value={newAudit.auditor}
                      onChange={(e) => setNewAudit({ ...newAudit, auditor: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    <Button variant="secondary" onClick={() => setShowAuditModal(false)}>Cancel</Button>
                    <Button type="submit">Schedule Audit</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'issues' && (
        <Card className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#EEEEEE]">
            <div>
              <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Compliance Discrepancy Log</span>
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Active tickets tracking policy violations, carbon audit delays, and regulatory flags.
              </p>
            </div>
            <Button size="sm" onClick={() => setShowIssueModal(true)} className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>Report Issue</span>
            </Button>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="px-6 py-3">Discrepancy Details</th>
                  <th className="px-6 py-3">Severity</th>
                  <th className="px-6 py-3">Owner</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] text-xs">
                {issues.map((i) => {
                  const isOverdue = checkOverdue(i.dueDate, i.status);
                  return (
                    <tr key={i.id} className="hover:bg-[#FAFAFA]/50">
                      <td className="px-6 py-4 max-w-sm font-semibold text-[#1A1A1A]">{i.desc}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant={i.severity === 'Critical' ? 'admin' : 'governance'}
                          className={i.severity === 'Critical' ? 'bg-red-50 text-red-600 border border-red-200/20' : ''}
                        >
                          {i.severity}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-[#1A1A1A]">{i.owner}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{i.dept}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-[#6B7280]">{i.dueDate}</span>
                        {isOverdue && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
                            Overdue
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Badge variant={i.status === 'Resolved' ? 'environmental' : 'secondary'}>
                          {i.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Issue Reporting Modal */}
          {showIssueModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-2xl border border-[#EEEEEE] shadow-xl w-full max-w-md p-6 mx-4 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex justify-between items-center pb-3 border-b border-[#EEEEEE] mb-4">
                  <h3 className="text-base font-bold text-[#1A1A1A]">Report Compliance Issue</h3>
                  <button onClick={() => setShowIssueModal(false)} className="text-[#6B7280] hover:text-[#1A1A1A]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleReportIssue} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Description</label>
                    <textarea 
                      rows="3"
                      placeholder="e.g. Wastewater pH level exceeded normal bounds at Treatment Plant 3..."
                      required
                      value={newIssue.desc}
                      onChange={(e) => setNewIssue({ ...newIssue, desc: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Severity</label>
                      <select 
                        value={newIssue.severity}
                        onChange={(e) => setNewIssue({ ...newIssue, severity: e.target.value })}
                        className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Warning">Warning</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Assigned Owner</label>
                      <select 
                        value={newIssue.owner}
                        onChange={(e) => setNewIssue({ ...newIssue, owner: e.target.value })}
                        className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                      >
                        <option value="Neha Sharma">Neha Sharma</option>
                        <option value="Amit Kumar">Amit Kumar</option>
                        <option value="Priya Sharma">Priya Sharma</option>
                        <option value="Siddharth Joshi">Siddharth Joshi</option>
                        <option value="Vikram Singh">Vikram Singh</option>
                        <option value="Rahul Mehta">Rahul Mehta</option>
                        <option value="Pooja Patel">Pooja Patel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Due Date</label>
                    <input 
                      type="date" 
                      required
                      value={newIssue.dueDate}
                      onChange={(e) => setNewIssue({ ...newIssue, dueDate: e.target.value })}
                      className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    <Button variant="secondary" onClick={() => setShowIssueModal(false)}>Cancel</Button>
                    <Button type="submit">Report Issue</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default Governance;
