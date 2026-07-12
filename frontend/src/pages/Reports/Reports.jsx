import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { BarChart3, FileText, Download, ArrowUpRight } from 'lucide-react';

const Reports = () => {
  const reports = [
    { name: 'EU CSRD Alignment Disclosure 2026', format: 'PDF', size: '2.4 MB', date: 'Jul 10, 2026' },
    { name: 'Scope 1 & 2 Emissions Ledger - Q2', format: 'CSV', size: '480 KB', date: 'Jul 01, 2026' },
    { name: 'CSR Volunteering & Inclusivity Matrix', format: 'Excel', size: '1.2 MB', date: 'Jun 28, 2026' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Reports exporter list */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Available Disclosure Reports</span>
            </h3>

            <div className="space-y-4">
              {reports.map((rpt) => (
                <div key={rpt.name} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-[#EEEEEE]/50 last:border-b-0 last:pb-0">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-[#1A1A1A]">{rpt.name}</p>
                    <p className="text-xs text-[#6B7280]">Generated on {rpt.date} · Format: {rpt.format} ({rpt.size})</p>
                  </div>
                  <Button size="sm" variant="secondary" className="flex items-center gap-1.5 self-start sm:self-auto">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE]">
            <Button size="sm" className="flex items-center gap-1.5">
              <span>Generate New Q2 Disclosure</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>

        {/* Ledger logs info */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span>Emissions Ledger</span>
            </h3>

            <div className="space-y-4 my-2 text-xs">
              <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg">
                <p className="font-semibold text-[#1A1A1A]">Carbon offset retirements</p>
                <p className="text-[#6B7280] mt-1">45.0 Tons retired on Gold Standard Registry (ID: GS-3302)</p>
              </div>

              <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg">
                <p className="font-semibold text-[#1A1A1A]">Utility meter connection status</p>
                <p className="text-green-700 font-semibold mt-1">4 active integrations</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE] text-[10px] text-[#6B7280]">
            Reports are cryptographically verified for audit purposes.
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Reports;
