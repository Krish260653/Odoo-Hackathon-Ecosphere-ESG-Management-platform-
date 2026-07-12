import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { 
  Wand2, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  AlertTriangle,
  TrendingDown,
  Building
} from 'lucide-react';

const AIReportGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [report, setReport] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadingStatuses = [
    'Parsing scope emissions databases...',
    'Reviewing policy signature sign-offs...',
    'Analyzing volunteering logs and diversity indices...',
    'Synthesizing executive summary metrics...',
    'Drafting final CEO report...'
  ];

  // Variations for random text selection
  const verdicts = [
    'Promising Q2 ESG Performance with Social/CSR gaps to address',
    'Solid Environmental metrics overshadowed by lower Social & employee training scores in Q2',
    'EcoSphere ESG index shows growth in Carbon tracking, but requires immediate focus on D&I'
  ];

  const envTexts = [
    'On the environmental front, the platform registered a total emissions level of 240.4 MT CO₂e, representing a solid 4.2% decrease from Q1. This was mostly driven by Scope 1 reductions in Plant 2B and transition to renewable energy.',
    'Environmental scores reached 82/100 as carbon emissions dropped to 240.4 MT CO₂e (down 4.2% quarter-on-quarter). The direct combustion reduction of Scope 1 emissions was the primary highlight.',
    'Environmental tracking has advanced to 82/100, backed by a carbon footprint reduction of 4.2% to 240.4 MT CO₂e. The zero-waste campaign and EV fleet conversion have also seen a 15% improvement.'
  ];

  const socTexts = [
    'Social metrics logged 74/100, which is our lowest metrics baseline. Despite 1,240 volunteer hours logged and a campus diversity rating of 4.2/5.0, safety sign-offs and training completion in some sectors need urgent monitoring.',
    'The Social dimension stands at 74/100. While employee volunteering hours reached 1,240, compliance was dragged down by lower training sign-offs and Bangalore campus accessibility benchmarks (currently at 85%).',
    'Our social score is currently 74/100. While volunteer participation shows high employee sentiment with 1,240 hours logged, we need to enforce safety compliance protocols and POSH trainings across departments.'
  ];

  const govTexts = [
    'Governance scores are steady at 79/100. Staff signature audits for Anti-Bribery policies reached 98.4% and GDPR Data Security signatures are at 92.1%, showing strong administrative controls.',
    'In Governance, compliance audits achieved a score of 79/100. Our central policy registry reports that 98.4% of employees signed off on anti-corruption directives, showing a robust compliance foundation.',
    'Governance metrics achieved a 79/100 rating. Policy compliance audits report 98.4% signatures for key anti-corruption frameworks, and the whistleblower safe harbor registry shows zero unresolved discrepancy reports.'
  ];

  const risks = [
    'Social training completion rates are below target thresholds (needs to cross 95%).',
    'Regional composition and accessibility milestones (e.g. Bangalore campus ramps) are lagging.',
    'High emissions in the Manufacturing department (110 MT CO₂e) represent a long-term transition risk.'
  ];

  const actions = [
    'Mandate safety sign-offs and POSH training across IT and manufacturing.',
    'Accelerate EV fleet conversion and Zero Waste policies to hit Q4 environmental targets.',
    'Launch an intensive internal volunteering drive in Manufacturing to boost logged hours.'
  ];

  // Cycling status messages during loading state
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadStep((prev) => (prev < loadingStatuses.length - 1 ? prev + 1 : prev));
      }, 450);
    } else {
      setLoadStep(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Generate simulated AI report
  const triggerGenerate = () => {
    setIsGenerating(true);
    setReport(null);

    setTimeout(() => {
      setIsGenerating(false);
      // Select random variations
      const verdict = verdicts[Math.floor(Math.random() * verdicts.length)];
      const env = envTexts[Math.floor(Math.random() * envTexts.length)];
      const soc = socTexts[Math.floor(Math.random() * socTexts.length)];
      const gov = govTexts[Math.floor(Math.random() * govTexts.length)];

      setReport({
        verdict,
        env,
        soc,
        gov,
        risks,
        actions,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      triggerToast('AI CEO Summary compiled successfully!');
    }, 2200);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopy = () => {
    if (!report) return;
    const text = `EcoSphere ESG CEO Summary\nGenerated on: ${report.date}\nVerdict: ${report.verdict}\n\nEnvironmental: ${report.env}\n\nSocial: ${report.soc}\n\nGovernance: ${report.gov}`;
    navigator.clipboard.writeText(text);
    triggerToast('Copied CEO Summary to clipboard!');
  };

  return (
    <Card className="w-full border border-[#EEEEEE] bg-white relative p-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#E9F5ED] text-[#2D6A4F] border border-green-200/50 rounded-xl shadow-lg animate-in slide-in-from-right duration-200 text-xs font-semibold">
          <Check className="w-4 h-4 text-[#2D6A4F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Card Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left pb-4 border-b border-[#EEEEEE] mb-5">
        <div className="space-y-1">
          <Badge variant="environmental" className="px-2.5 py-1 text-[10px] flex items-center gap-1.5 w-max">
            <Sparkles className="w-3 h-3 text-[#2D6A4F]" />
            <span>AI Insights Engine</span>
          </Badge>
          <h2 className="text-base font-bold text-[#1A1A1A]">Generate AI CEO Summary</h2>
          <p className="text-xs text-[#6B7280]">
            Review all Environmental, Social, and Governance parameters and write an instant executive report.
          </p>
        </div>

        {!isGenerating && !report && (
          <Button 
            onClick={triggerGenerate} 
            className="flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <Wand2 className="w-4 h-4 text-white" />
            <span>Generate CEO Summary</span>
          </Button>
        )}

        {report && !isGenerating && (
          <Button 
            onClick={triggerGenerate} 
            variant="outline"
            className="flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate Summary</span>
          </Button>
        )}
      </div>

      {/* Loading State Container */}
      {isGenerating && (
        <div className="py-12 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-8 h-8 text-[#2D6A4F] animate-spin" />
          <div className="space-y-1.5 text-center">
            <p className="text-xs font-semibold text-[#1A1A1A] animate-pulse">
              {loadingStatuses[loadStep]}
            </p>
            <p className="text-[10px] text-[#6B7280]">Synthesizing machine learning weights...</p>
          </div>
        </div>
      )}

      {/* Generated Report Output */}
      {report && !isGenerating && (
        <div className="space-y-6 text-left animate-in fade-in duration-200">
          
          {/* Verdict Box */}
          <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider block">AI Verdict Overview</span>
              <h3 className="font-extrabold text-sm text-amber-900 mt-0.5">{report.verdict}</h3>
            </div>
          </div>

          {/* Narrative Paragraphs */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Environmental Performance</span>
              <p className="text-xs text-[#1A1A1A] leading-relaxed bg-[#FAFAFA] border border-[#EEEEEE] p-3.5 rounded-xl">
                {report.env}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Social & CSR Compliance</span>
              <p className="text-xs text-[#1A1A1A] leading-relaxed bg-[#FAFAFA] border border-[#EEEEEE] p-3.5 rounded-xl">
                {report.soc}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Governance & Audit Integrity</span>
              <p className="text-xs text-[#1A1A1A] leading-relaxed bg-[#FAFAFA] border border-[#EEEEEE] p-3.5 rounded-xl">
                {report.gov}
              </p>
            </div>
          </div>

          {/* Risks & Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Key Risks */}
            <div className="space-y-2.5 p-4 border border-[#EEEEEE] rounded-xl bg-[#FAFAFA]/50">
              <h4 className="text-xs font-bold text-red-700 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Primary Risks Noted</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#6B7280] list-disc list-inside leading-normal">
                {report.risks.map((risk, index) => (
                  <li key={index} className="pl-1">{risk}</li>
                ))}
              </ul>
            </div>

            {/* Recommended Actions */}
            <div className="space-y-2.5 p-4 border border-[#EEEEEE] rounded-xl bg-[#FAFAFA]/50">
              <h4 className="text-xs font-bold text-[#2D6A4F] flex items-center gap-1.5 uppercase tracking-wider">
                <Check className="w-4 h-4" />
                <span>Recommended Action Plan</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#6B7280] list-disc list-inside leading-normal">
                {report.actions.map((action, index) => (
                  <li key={index} className="pl-1">{action}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Report Footer */}
          <div className="pt-4 border-t border-[#EEEEEE] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <span className="text-[10px] text-[#6B7280] font-semibold">
              Corporate Report Q2 · Compiled: {report.date}
            </span>
            <div className="flex gap-2.5 self-end sm:self-auto">
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={handleCopy}
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </Button>
              <Button 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={() => triggerToast('Exporting summary report to PDF... Download started.')}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </Button>
            </div>
          </div>

        </div>
      )}

      {/* Fresh Empty State */}
      {!report && !isGenerating && (
        <div className="py-8 text-center text-[#6B7280] text-xs">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2.5" />
          <p>No CEO Summary generated yet. Click the button above to run ML-based data synthesis.</p>
        </div>
      )}

    </Card>
  );
};

export default AIReportGenerator;
