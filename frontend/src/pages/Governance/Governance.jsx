import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { Shield, BookOpen, AlertTriangle, ShieldCheck } from 'lucide-react';

const Governance = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Policies List */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-governance" />
              <span>ESG Board Policies & Sign-offs</span>
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-[#1A1A1A]">Anti-Bribery and Corruption Policy v3</p>
                  <p className="text-xs text-[#6B7280]">Mandatory annual signature from all active personnel</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1A1A1A]">98.4% Signed</span>
                  <Badge variant="governance">Compliant</Badge>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-[#1A1A1A]">Data Security & ESG Privacy Protocol</p>
                  <p className="text-xs text-[#6B7280]">Covers user information and GDPR data classification</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1A1A1A]">92.1% Signed</span>
                  <Badge variant="governance">Compliant</Badge>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-[#1A1A1A]">Whistleblower Safe Harbor Protection Act</p>
                  <p className="text-xs text-[#6B7280]">Provides channels for report logging anonymity</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1A1A1A]">84.0% Signed</span>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE]">
            <button className="text-xs font-semibold text-amber-600 hover:text-amber-700">
              Upload new regulatory policy
            </button>
          </div>
        </Card>

        {/* Compliance Issues */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Compliance Discrepancies</span>
            </h3>

            <div className="space-y-4 my-2">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-left">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-red-700 uppercase">Manufacturing Dept</span>
                  <span className="text-[10px] text-red-600 font-semibold">Q2 Critical</span>
                </div>
                <p className="text-xs font-medium text-[#1A1A1A] mt-1.5">Waste recycling disposal protocols not adhered to in plant 2B.</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-left">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-700 uppercase">IT Operations</span>
                  <span className="text-[10px] text-amber-600 font-semibold">Q2 Warning</span>
                </div>
                <p className="text-xs font-medium text-[#1A1A1A] mt-1.5">Server room carbon offset credit registration delayed by 3 weeks.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE] text-[10px] text-[#6B7280]">
            Whistleblower channel: <span className="underline cursor-pointer">Log anonymous tip</span>.
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Governance;
