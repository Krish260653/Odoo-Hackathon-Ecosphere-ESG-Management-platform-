import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import AIReportGenerator from './AIReportGenerator';
import { 
  BarChart3, 
  FileText, 
  Download, 
  ArrowUpRight, 
  CheckCircle, 
  RefreshCw, 
  Sliders, 
  Calendar,
  Check,
  AlertCircle
} from 'lucide-react';

const Reports = () => {
  // Loading states for the 4 report cards
  const [generatingReport, setGeneratingReport] = useState(null); // 'env' | 'soc' | 'gov' | 'summary' | null
  const [toastMessage, setToastMessage] = useState(null); // toast content

  // Custom Report Builder Form State
  const [department, setDepartment] = useState('All');
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-06-30');
  const [selectedModules, setSelectedModules] = useState(['Environmental', 'Social']);
  const [employee, setEmployee] = useState('All');
  const [challenge, setChallenge] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState(['Emissions', 'Volunteering']);

  // Predefined lists
  const departments = ['All', 'Manufacturing', 'IT Operations', 'HR & Admin', 'Sales & Marketing', 'Finance & Legal'];
  const employees = ['All', 'Amit Kumar', 'Priya Sharma', 'Siddharth Joshi', 'Rahul Mehta', 'Neha Sharma'];
  const challenges = ['All', 'Low-Carbon Commute Challenge', 'Zero-Waste Office Week', 'Plastic-Free Cafeteria Pledge'];
  
  const modulesList = ['Environmental', 'Social', 'Governance'];
  const categoriesList = ['Emissions', 'Waste', 'Volunteering', 'Inclusivity', 'Policies', 'Compliance'];

  // Handle Category check
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Handle Module check
  const handleModuleToggle = (module) => {
    setSelectedModules(prev => 
      prev.includes(module) 
        ? prev.filter(m => m !== module) 
        : [...prev, module]
    );
  };

  // Toast trigger helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Generate Report simulated handler
  const handleGenerateReport = (type, name) => {
    setGeneratingReport(type);
    setTimeout(() => {
      setGeneratingReport(null);
      triggerToast(`"${name}" has been successfully compiled and downloaded (Simulated Export).`);
    }, 1500);
  };

  // Export Custom Report
  const handleExportCustom = (format) => {
    const summary = `Showing: Dept: ${department}, Range: ${startDate || 'Any'} to ${endDate || 'Any'}, Modules: ${selectedModules.join(' + ') || 'None'}, Category: ${selectedCategories.join(', ') || 'None'}`;
    triggerToast(`Exporting custom report in ${format} format... (${summary})`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-green-50 text-[#2D6A4F] border border-green-200/50 rounded-xl shadow-lg animate-in slide-in-from-right duration-200 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-[#2D6A4F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <Badge variant="secondary" className="px-2.5 py-1 text-[11px]">
          Reporting Ledger
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">ESG Disclosures & Reports</h1>
        <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
          Generate compliance audits matching GRI, SASB, and CSRD reporting requirements, and export emissions records.
        </p>
      </div>

      {/* AI Report Generator Featured Card */}
      <AIReportGenerator />

      {/* 4 Report Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Environmental Report */}
        <Card className="flex flex-col justify-between p-5 hover:shadow-md transition-all duration-200">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#2D6A4F]">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-sm text-[#1A1A1A]">Environmental Disclosure</h4>
            <p className="text-[11px] text-[#6B7280] leading-normal">Scope 1, 2, 3 carbon log emissions, waste recycling percentages and energy ratings.</p>
          </div>
          <div className="pt-4 border-t border-[#EEEEEE] mt-4">
            <Button 
              size="sm" 
              className="w-full flex items-center justify-center gap-1.5"
              onClick={() => handleGenerateReport('env', 'Environmental Disclosure Report')}
              disabled={generatingReport !== null}
            >
              {generatingReport === 'env' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <span>Generate PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Social Report */}
        <Card className="flex flex-col justify-between p-5 hover:shadow-md transition-all duration-200">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#457B9D]">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-sm text-[#1A1A1A]">Social & D&I Disclosure</h4>
            <p className="text-[11px] text-[#6B7280] leading-normal">Diversity metrics index, volunteer CSR activity logs, and safety compliance sign-offs.</p>
          </div>
          <div className="pt-4 border-t border-[#EEEEEE] mt-4">
            <Button 
              size="sm" 
              className="w-full flex items-center justify-center gap-1.5"
              onClick={() => handleGenerateReport('soc', 'Social & D&I Disclosure Report')}
              disabled={generatingReport !== null}
            >
              {generatingReport === 'soc' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <span>Generate PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Governance Report */}
        <Card className="flex flex-col justify-between p-5 hover:shadow-md transition-all duration-200">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-sm text-[#1A1A1A]">Governance & Audits</h4>
            <p className="text-[11px] text-[#6B7280] leading-normal">Anti-corruption policies signature count, compliance discrepancy tickets, and internal audit reviews.</p>
          </div>
          <div className="pt-4 border-t border-[#EEEEEE] mt-4">
            <Button 
              size="sm" 
              className="w-full flex items-center justify-center gap-1.5"
              onClick={() => handleGenerateReport('gov', 'Governance & Audits Report')}
              disabled={generatingReport !== null}
            >
              {generatingReport === 'gov' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <span>Generate PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Summary Report */}
        <Card className="flex flex-col justify-between p-5 hover:shadow-md transition-all duration-200">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#E9F5ED] flex items-center justify-center text-[#2D6A4F]">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-sm text-[#1A1A1A]">Summary ESG Ledger</h4>
            <p className="text-[11px] text-[#6B7280] leading-normal">Complete overview index mapping standard metrics across all Scope categories and tiers.</p>
          </div>
          <div className="pt-4 border-t border-[#EEEEEE] mt-4">
            <Button 
              size="sm" 
              className="w-full flex items-center justify-center gap-1.5"
              onClick={() => handleGenerateReport('summary', 'Summary ESG Ledger Report')}
              disabled={generatingReport !== null}
            >
              {generatingReport === 'summary' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <span>Generate PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </Card>

      </div>

      {/* Split Section: Custom Report Builder & Emissions Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Custom Report Builder Card (60%) */}
        <Card className="lg:col-span-3 space-y-6">
          <div className="pb-3 border-b border-[#EEEEEE] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2D6A4F]" />
            <h3 className="font-semibold text-base text-[#1A1A1A]">Custom ESG Report Builder</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Target Department</label>
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
              >
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-xs border border-[#EEEEEE] rounded-lg p-2 bg-[#FAFAFA] focus:outline-none w-full"
                />
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-xs border border-[#EEEEEE] rounded-lg p-2 bg-[#FAFAFA] focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Employee Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Employee Filter</label>
              <select 
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
                className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
              >
                {employees.map(emp => <option key={emp} value={emp}>{emp}</option>)}
              </select>
            </div>

            {/* Challenge Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Gamification Challenge</label>
              <select 
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full text-xs border border-[#EEEEEE] rounded-lg p-2.5 bg-[#FAFAFA] focus:outline-none focus:border-[#2D6A4F] focus:bg-white"
              >
                {challenges.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Module Multiselect Checkboxes */}
          <div className="space-y-2 text-left">
            <span className="block text-xs font-semibold text-[#1A1A1A]">Include ESG Modules</span>
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              {modulesList.map(mod => (
                <label key={mod} className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={selectedModules.includes(mod)}
                    onChange={() => handleModuleToggle(mod)}
                    className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F] border-[#EEEEEE] cursor-pointer"
                  />
                  <span className="text-[#1A1A1A]">{mod}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ESG Category Multiselect Checkboxes */}
          <div className="space-y-2 text-left">
            <span className="block text-xs font-semibold text-[#1A1A1A]">Metrics Categories</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium">
              {categoriesList.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F] border-[#EEEEEE] cursor-pointer"
                  />
                  <span className="text-[#1A1A1A]">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Live Preview Text Summary */}
          <div className="bg-[#FAFAFA] border border-[#EEEEEE] p-4 rounded-xl space-y-2 text-left">
            <h4 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Live Preview Filter Summary</h4>
            <p className="text-xs text-[#1A1A1A] font-semibold leading-relaxed">
              Showing: <span className="text-[#2D6A4F]">{department === 'All' ? 'All Departments' : department}</span>
              {startDate || endDate ? ` (from ${startDate || 'Start'} to ${endDate || 'End'})` : ''} 
              {selectedModules.length > 0 ? ` · Modules: ${selectedModules.join(' + ')}` : ' · No Modules Selected'}
              {selectedCategories.length > 0 ? ` · Category: ${selectedCategories.join(', ')}` : ' · No Categories'}
              {employee !== 'All' ? ` · Employee: ${employee}` : ''}
              {challenge !== 'All' ? ` · Challenge: ${challenge}` : ''}
            </p>
          </div>

          {/* Export Action Buttons */}
          <div className="pt-4 border-t border-[#EEEEEE] flex flex-wrap gap-3 justify-end">
            <Button variant="secondary" size="sm" className="flex items-center gap-1.5" onClick={() => handleExportCustom('CSV')}>
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </Button>
            <Button variant="secondary" size="sm" className="flex items-center gap-1.5" onClick={() => handleExportCustom('Excel')}>
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </Button>
            <Button size="sm" className="flex items-center gap-1.5" onClick={() => handleExportCustom('PDF')}>
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </Button>
          </div>
        </Card>

        {/* Emissions Ledger Card (40%) */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2D6A4F]" />
              <span>Cryptographic Emissions Ledger</span>
            </h3>

            <div className="space-y-4 my-2 text-left text-xs">
              <div className="p-3.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl space-y-1">
                <p className="font-bold text-[#1A1A1A]">Carbon Offset Retirement</p>
                <p className="text-[#6B7280] leading-relaxed">45.0 Tons retired on Gold Standard Registry.</p>
                <p className="text-[10px] text-green-700 bg-green-50 border border-green-200/20 px-1.5 py-0.5 rounded inline-block font-mono">
                  ID: GS-3302-Q2
                </p>
              </div>

              <div className="p-3.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl space-y-1">
                <p className="font-bold text-[#1A1A1A]">Utility API Integrations</p>
                <p className="text-[#6B7280] leading-relaxed">Active smart meters feeding live power logs.</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 font-semibold mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <span>4 channels connected</span>
                </span>
              </div>

              <div className="p-3.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl space-y-1">
                <p className="font-bold text-[#1A1A1A]">Audit Trail Checksums</p>
                <p className="text-[#6B7280] leading-relaxed">Tamper-evident logs generated matching CSRD standard.</p>
                <p className="text-[9px] text-[#6B7280] font-mono leading-normal bg-white p-1.5 border border-[#EEEEEE] rounded mt-1 overflow-x-auto">
                  SHA-256: 4e235b62a3d810178a5c...
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE] text-[10px] text-[#6B7280] text-left">
            Audit logs are signed and synced to decentralised ledger indices.
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Reports;
