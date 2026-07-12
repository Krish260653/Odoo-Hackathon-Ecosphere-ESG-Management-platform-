import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  Users, 
  Scale, 
  Trophy, 
  FileText, 
  Settings as SettingsIcon, 
  Bell, 
  Sun, 
  Moon, 
  Plus, 
  Check, 
  X, 
  Download, 
  ShieldAlert, 
  AlertTriangle,
  Gift,
  Award,
  Package,
  CheckCircle,
  BarChart2,
  Medal,
  Play,
  Archive,
  RefreshCw,
  HeartHandshake
} from 'lucide-react';
import { 
  initialDepartments,
  initialCategories,
  initialEmissionFactors,
  initialProducts,
  initialEnvironmentalGoals,
  initialPolicies,
  initialBadges,
  initialRewards,
  initialCarbonTransactions,
  initialCSRActivities,
  initialEmployeeParticipation,
  initialChallenges,
  initialChallengeParticipation,
  initialPolicyAcknowledgements,
  initialAudits,
  initialComplianceIssues,
  initialEmployees
} from './mockData';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const IconMap = {
  Leaf: <Leaf size={32} strokeWidth={1.5} />,
  HeartHandshake: <HeartHandshake size={32} strokeWidth={1.5} />,
  Scale: <Scale size={32} strokeWidth={1.5} />,
  Trophy: <Trophy size={32} strokeWidth={1.5} />
};

function App() {
  // Application State
  const [departments, setDepartments] = useLocalStorage('ecosphere_departments', initialDepartments);
  const [categories, setCategories] = useLocalStorage('ecosphere_categories', initialCategories);
  const [emissionFactors, setEmissionFactors] = useLocalStorage('ecosphere_emission_factors', initialEmissionFactors);
  const [products, setProducts] = useLocalStorage('ecosphere_products', initialProducts);
  const [envGoals, setEnvGoals] = useLocalStorage('ecosphere_env_goals', initialEnvironmentalGoals);
  const [policies, setPolicies] = useLocalStorage('ecosphere_policies', initialPolicies);
  const [badges, setBadges] = useLocalStorage('ecosphere_badges', initialBadges);
  const [rewards, setRewards] = useLocalStorage('ecosphere_rewards', initialRewards);
  const [carbonTransactions, setCarbonTransactions] = useLocalStorage('ecosphere_carbon_transactions', initialCarbonTransactions);
  const [csrActivities, setCsrActivities] = useLocalStorage('ecosphere_csr_activities', initialCSRActivities);
  const [employeeParticipation, setEmployeeParticipation] = useLocalStorage('ecosphere_employee_participation', initialEmployeeParticipation);
  const [challenges, setChallenges] = useLocalStorage('ecosphere_challenges', initialChallenges);
  const [challengeParticipation, setChallengeParticipation] = useLocalStorage('ecosphere_challenge_participation', initialChallengeParticipation);
  const [policyAcks, setPolicyAcks] = useLocalStorage('ecosphere_policy_acks', initialPolicyAcknowledgements);
  const [audits, setAudits] = useLocalStorage('ecosphere_audits', initialAudits);
  const [complianceIssues, setComplianceIssues] = useLocalStorage('ecosphere_compliance_issues', initialComplianceIssues);
  const [employees, setEmployees] = useLocalStorage('ecosphere_employees', initialEmployees);
  
  // App Config
  const [config, setConfig] = useLocalStorage('ecosphere_config', {
    weightEnv: 40,
    weightSocial: 30,
    weightGov: 30,
    autoEmission: true,
    evidenceRequired: true,
    badgeAutoAward: true
  });

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState('Aarav Mehta');

  // Modal state
  const [modalState, setModalState] = useState({ isOpen: false, type: null, payload: null });
  const [modalInput, setModalInput] = useState('');
  
  // Notification history
  const [notifications, setNotifications] = useLocalStorage('ecosphere_notifications', [
    { id: '1', title: 'Badge Unlocked!', message: 'Aarav Mehta unlocked Carbon Buster badge.', type: 'badge', date: '2026-07-12', unread: true },
    { id: '2', title: 'Compliance Issue Overdue', message: 'Incomplete safety signages in manufacturing floor is past due date.', type: 'compliance', date: '2026-07-10', unread: true }
  ]);

  // Form states
  const [newTransaction, setNewTransaction] = useState({ type: 'Purchase', details: '', value: '', factorId: '1', departmentId: '1', date: '2026-07-12' });
  const [newCsrActivity, setNewCsrActivity] = useState({ title: '', description: '', category: 'Reforestation', points: 100, date: '2026-07-12' });
  const [newParticipation, setNewParticipation] = useState({ employee: 'Aarav Mehta', activityId: '1', proof: '', status: 'Pending' });
  const [newCompliance, setNewCompliance] = useState({ auditId: '1', severity: 'Medium', description: '', owner: 'Aarav Mehta', dueDate: '2026-07-30' });
  const [newChallenge, setNewChallenge] = useState({ title: '', category: 'Energy Conservation', description: '', xp: 200, difficulty: 'Easy', evidenceRequired: true, deadline: '2026-08-31', status: 'Draft' });
  const [newChallengeParticipation, setNewChallengeParticipation] = useState({ employee: 'Aarav Mehta', challengeId: '1', progress: 50, proof: '' });
  const [newProduct, setNewProduct] = useState({ name: '', carbonFootprint: '', recyclability: '', esgRating: 'A' });
  
  // Filter settings for reports
  const [reportFilter, setReportFilter] = useState({
    department: 'All',
    module: 'All',
    category: 'All',
    employee: 'All',
    dateRange: 'All'
  });
  const [activeReportType, setActiveReportType] = useState('summary'); // summary, env, social, gov, custom

  // Trigger automated checks
  useEffect(() => {
    const today = new Date('2026-07-12');
    complianceIssues.forEach(issue => {
      const dueDate = new Date(issue.dueDate);
      if (dueDate < today && issue.status === 'Open') {
        const alreadyNotified = notifications.some(n => n.message.includes(issue.description));
        if (!alreadyNotified) {
          triggerNotification('Compliance Overdue Warning', `Issue: "${issue.description}" is past its due date (${issue.dueDate}).`, 'compliance');
        }
      }
    });
  }, [complianceIssues]);

  const triggerNotification = (title, message, type) => {
    const newNotif = {
      id: Date.now().toString(),
      title,
      message,
      type,
      date: '2026-07-12',
      unread: true
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Badge Auto-Awarding System
  const checkAndAwardBadges = (employeeName, updatedXp, updatedPoints, updatedChallengesCount, updatedPolicyAcksCount) => {
    if (!config.badgeAutoAward) return;

    const currentEmp = employees.find(e => e.name === employeeName);
    if (!currentEmp) return;

    let awardedBadgeIds = [...currentEmp.badges];
    let newlyAwarded = [];

    // Rule 1: Carbon Buster (Complete 3 energy conservation challenges)
    if (updatedChallengesCount >= 3 && !awardedBadgeIds.includes('1')) {
      awardedBadgeIds.push('1');
      newlyAwarded.push('Carbon Buster');
    }
    // Rule 2: Social Champion (Accumulate over 1000 CSR points)
    if (updatedPoints >= 1000 && !awardedBadgeIds.includes('2')) {
      awardedBadgeIds.push('2');
      newlyAwarded.push('Social Champion');
    }
    // Rule 3: Compliance Star (Acknowledge all active governance policies)
    if (updatedPolicyAcksCount === policies.length && !awardedBadgeIds.includes('3')) {
      awardedBadgeIds.push('3');
      newlyAwarded.push('Compliance Star');
    }
    // Rule 4: ESG Master (Earn a total of 2500 combined XP)
    if (updatedXp >= 2500 && !awardedBadgeIds.includes('4')) {
      awardedBadgeIds.push('4');
      newlyAwarded.push('ESG Master');
    }

    if (newlyAwarded.length > 0) {
      setEmployees(prev => prev.map(emp => {
        if (emp.name === employeeName) {
          return { ...emp, badges: awardedBadgeIds };
        }
        return emp;
      }));

      newlyAwarded.forEach(badgeName => {
        triggerNotification('Badge Unlocked!', `${employeeName} unlocked "${badgeName}" badge!`, 'badge');
      });
    }
  };

  // Dashboard Scores
  const totalEmissions = carbonTransactions.reduce((acc, curr) => acc + curr.carbonEmissions, 0);
  const envScore = Math.max(10, Math.min(100, Math.round(100 - (totalEmissions / 500))));
  
  const approvedParticipationCount = employeeParticipation.filter(p => p.approvalStatus === 'Approved').length;
  const socialScore = employeeParticipation.length > 0 
    ? Math.round((approvedParticipationCount / employeeParticipation.length) * 100) 
    : 80;

  const totalPossibleAcks = policies.length * employees.length;
  const actualAcks = policyAcks.filter(p => p.acknowledged).length;
  const resolvedIssues = complianceIssues.filter(i => i.status === 'Resolved').length;
  const govScore = Math.round(
    ((actualAcks / (totalPossibleAcks || 1)) * 50) + 
    ((resolvedIssues / (complianceIssues.length || 1)) * 50)
  );

  const overallEsgScore = Math.round(
    (envScore * config.weightEnv + socialScore * config.weightSocial + govScore * config.weightGov) / 100
  );

  // Carbon Emission calculations helper
  const handleCalculateEmissions = (value, factorId) => {
    const factorObj = emissionFactors.find(f => f.id === factorId);
    if (!factorObj) return 0;
    return parseFloat((parseFloat(value || 0) * factorObj.factor).toFixed(2));
  };

  // Log Carbon Transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const calculatedEmissions = config.autoEmission 
      ? handleCalculateEmissions(newTransaction.value, newTransaction.factorId)
      : parseFloat(newTransaction.value || 0);

    const transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      details: newTransaction.details || `${newTransaction.type} Entry`,
      value: parseFloat(newTransaction.value),
      factorId: newTransaction.factorId,
      carbonEmissions: calculatedEmissions,
      departmentId: newTransaction.departmentId,
      date: newTransaction.date
    };

    setCarbonTransactions(prev => [transaction, ...prev]);
    setNewTransaction({ type: 'Purchase', details: '', value: '', factorId: '1', departmentId: '1', date: '2026-07-12' });
    triggerNotification('New Emission Logged', `Carbon emissions of ${calculatedEmissions} kg CO2 added.`, 'environmental');
  };

  // Sign Policy
  const handleAcknowledgePolicy = (policyId) => {
    const existsIndex = policyAcks.findIndex(ack => ack.policyId === policyId && ack.employee === currentUser);
    let updatedAcks = [...policyAcks];
    
    if (existsIndex > -1) {
      if (updatedAcks[existsIndex].acknowledged) return;
      updatedAcks[existsIndex].acknowledged = true;
      updatedAcks[existsIndex].date = '2026-07-12';
    } else {
      updatedAcks.push({
        id: Date.now().toString(),
        policyId,
        employee: currentUser,
        acknowledged: true,
        date: '2026-07-12'
      });
    }

    setPolicyAcks(updatedAcks);
    
    const signedCount = updatedAcks.filter(ack => ack.employee === currentUser && ack.acknowledged).length;
    const emp = employees.find(e => e.name === currentUser);
    if (emp) {
      checkAndAwardBadges(currentUser, emp.xp, emp.points, 0, signedCount);
    }
    triggerNotification('Policy Acknowledged', `${currentUser} signed governance policy.`, 'governance');
  };

  // Approve CSR claim
  const handleApproveParticipation = (partId, status) => {
    const targetPart = employeeParticipation.find(p => p.id === partId);
    if (!targetPart) return;

    if (config.evidenceRequired && status === 'Approved' && !targetPart.proof) {
      alert('Cannot approve participation without proof attachment.');
      return;
    }

    setEmployeeParticipation(prev => prev.map(p => {
      if (p.id === partId) {
        return { ...p, approvalStatus: status };
      }
      return p;
    }));

    if (status === 'Approved') {
      const activity = csrActivities.find(act => act.id === targetPart.activityId);
      const pointsEarned = activity ? activity.points : 100;
      
      setEmployees(prev => prev.map(emp => {
        if (emp.name === targetPart.employee) {
          const newXp = emp.xp + pointsEarned;
          const newPoints = emp.points + pointsEarned;
          
          setTimeout(() => {
            checkAndAwardBadges(targetPart.employee, newXp, newPoints, 0, 0);
          }, 100);

          return { ...emp, xp: newXp, points: newPoints };
        }
        return emp;
      }));

      triggerNotification('Participation Approved', `${targetPart.employee} earned ${pointsEarned} points.`, 'social');
    }
  };

  // Approve Challenge Claim
  const handleApproveChallengeClaim = (claimId, status) => {
    const claimObj = challengeParticipation.find(c => c.id === claimId);
    if (!claimObj) return;

    if (config.evidenceRequired && status === 'Approved' && !claimObj.proof) {
      alert('Cannot approve challenge without proof attachment.');
      return;
    }

    setChallengeParticipation(prev => prev.map(c => {
      if (c.id === claimId) {
        return { ...c, approvalStatus: status };
      }
      return c;
    }));

    if (status === 'Approved') {
      const challengeObj = challenges.find(ch => ch.id === claimObj.challengeId);
      const xpReward = challengeObj ? challengeObj.xp : 200;

      setEmployees(prev => prev.map(emp => {
        if (emp.name === claimObj.employee) {
          const newXp = emp.xp + xpReward;
          // Calculate completed challenges count
          const completedCount = challengeParticipation.filter(c => c.employee === claimObj.employee && c.approvalStatus === 'Approved').length + 1;

          setTimeout(() => {
            checkAndAwardBadges(claimObj.employee, newXp, emp.points, completedCount, 0);
          }, 100);

          return { ...emp, xp: newXp };
        }
        return emp;
      }));

      triggerNotification('Challenge Approved', `${claimObj.employee} completed a challenge! +${xpReward} XP.`, 'gamification');
    }
  };

  // Challenge Status/Lifecycle Handler
  const handleUpdateChallengeStatus = (id, newStatus) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === id) {
        return { ...ch, status: newStatus };
      }
      return ch;
    }));
    triggerNotification('Challenge Updated', `Challenge status shifted to ${newStatus}.`, 'gamification');
  };

  // Redeem Reward
  const handleRedeemReward = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    const emp = employees.find(e => e.name === currentUser);

    if (!reward || !emp) return;
    if (emp.points < reward.pointsRequired) {
      alert('Insufficient points to redeem this reward!');
      return;
    }
    if (reward.stock <= 0) {
      alert('This reward is currently out of stock!');
      return;
    }

    setEmployees(prev => prev.map(e => {
      if (e.name === currentUser) {
        return { ...e, points: e.points - reward.pointsRequired };
      }
      return e;
    }));

    setRewards(prev => prev.map(r => {
      if (r.id === rewardId) {
        return { ...r, stock: r.stock - 1 };
      }
      return r;
    }));

    triggerNotification('Reward Redeemed', `${currentUser} redeemed "${reward.name}" (-${reward.pointsRequired} pts)`, 'gamification');
  };

  // Add Product ESG
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProd = {
      id: Date.now().toString(),
      name: newProduct.name,
      carbonFootprint: newProduct.carbonFootprint || '0 kg CO2',
      recyclability: newProduct.recyclability || 'N/A',
      esgRating: newProduct.esgRating
    };
    setProducts(prev => [...prev, newProd]);
    setNewProduct({ name: '', carbonFootprint: '', recyclability: '', esgRating: 'A' });
    triggerNotification('New Product Added', `Linked "${newProduct.name}" profile details.`, 'environmental');
  };

  // Submit Challenge claim
  const handleAddChallengeParticipation = (e) => {
    e.preventDefault();
    const claim = {
      id: Date.now().toString(),
      challengeId: newChallengeParticipation.challengeId,
      employee: newChallengeParticipation.employee,
      progress: parseInt(newChallengeParticipation.progress),
      proof: newChallengeParticipation.proof || null,
      approvalStatus: 'Pending',
      xpAwarded: 0
    };
    setChallengeParticipation(prev => [claim, ...prev]);
    setNewChallengeParticipation({ employee: 'Aarav Mehta', challengeId: '1', progress: 50, proof: '' });
    triggerNotification('Challenge Progress Submitted', `Progress logged for ${newChallengeParticipation.employee}.`, 'gamification');
  };

  // Add CSR Activity
  const handleAddCsrActivity = (e) => {
    e.preventDefault();
    const newAct = {
      id: Date.now().toString(),
      title: newCsrActivity.title,
      description: newCsrActivity.description,
      category: newCsrActivity.category,
      points: parseInt(newCsrActivity.points),
      date: newCsrActivity.date
    };
    setCsrActivities(prev => [...prev, newAct]);
    setNewCsrActivity({ title: '', description: '', category: 'Reforestation', points: 100, date: '2026-07-12' });
  };

  // Add Compliance Issue
  const handleAddCompliance = (e) => {
    e.preventDefault();
    const newIssue = {
      id: Date.now().toString(),
      auditId: newCompliance.auditId,
      severity: newCompliance.severity,
      description: newCompliance.description,
      owner: newCompliance.owner,
      dueDate: newCompliance.dueDate,
      status: 'Open'
    };
    setComplianceIssues(prev => [newIssue, ...prev]);
    setNewCompliance({ auditId: '1', severity: 'Medium', description: '', owner: 'Aarav Mehta', dueDate: '2026-07-30' });
    triggerNotification('New Compliance Issue', `Assigned to ${newCompliance.owner}. Due date ${newCompliance.dueDate}`, 'compliance');
  };

  // Add Challenge Definition
  const handleCreateChallenge = (e) => {
    e.preventDefault();
    const chall = {
      id: Date.now().toString(),
      title: newChallenge.title,
      category: newChallenge.category,
      description: newChallenge.description,
      xp: parseInt(newChallenge.xp),
      difficulty: newChallenge.difficulty,
      evidenceRequired: newChallenge.evidenceRequired,
      deadline: newChallenge.deadline,
      status: newChallenge.status
    };
    setChallenges(prev => [...prev, chall]);
    setNewChallenge({ title: '', category: 'Energy Conservation', description: '', xp: 200, difficulty: 'Easy', evidenceRequired: true, deadline: '2026-08-31', status: 'Draft' });
  };

  // Resolve compliance issue
  const handleResolveIssue = (id) => {
    setComplianceIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return { ...issue, status: 'Resolved' };
      }
      return issue;
    }));
  };

  // Filter Logic for Exporter/Preview
  const getFilteredData = () => {
    let list = [];
    if (activeReportType === 'env' || activeReportType === 'custom') {
      let temp = carbonTransactions.map(t => ({
        id: t.id,
        module: 'Environmental',
        type: t.type,
        details: t.details,
        deptName: departments.find(d => d.id === t.departmentId)?.name || 'N/A',
        deptId: t.departmentId,
        value: t.value,
        metric: `${t.carbonEmissions} kg CO2`,
        date: t.date
      }));
      list = [...list, ...temp];
    }
    if (activeReportType === 'social' || activeReportType === 'custom') {
      let temp = employeeParticipation.map(p => ({
        id: p.id,
        module: 'Social',
        type: csrActivities.find(a => a.id === p.activityId)?.title || 'CSR Initiative',
        details: `Claim by ${p.employee} (Proof: ${p.proof || 'None'})`,
        deptName: 'HR / Social Ops',
        deptId: '2',
        value: 1,
        metric: `${p.pointsEarned} Pts (${p.approvalStatus})`,
        date: p.completionDate
      }));
      list = [...list, ...temp];
    }
    if (activeReportType === 'gov' || activeReportType === 'custom') {
      let temp = complianceIssues.map(i => ({
        id: i.id,
        module: 'Governance',
        type: `Audit Violation (${i.severity})`,
        details: i.description,
        deptName: 'Finance & Compliance',
        deptId: '4',
        value: 1,
        metric: i.status,
        date: i.dueDate
      }));
      list = [...list, ...temp];
    }
    if (activeReportType === 'summary') {
      list = [
        { id: '1', module: 'ESG Overall Summary', type: 'Scorecard', details: 'Environmental Performance Rating', deptName: 'Company Wide', value: envScore, metric: 'Rating' },
        { id: '2', module: 'ESG Overall Summary', type: 'Scorecard', details: 'Social & Volunteer Rating', deptName: 'Company Wide', value: socialScore, metric: 'Rating' },
        { id: '3', module: 'ESG Overall Summary', type: 'Scorecard', details: 'Governance Compliance Rating', deptName: 'Company Wide', value: govScore, metric: 'Rating' }
      ];
    }

    // Apply Filter Options
    if (reportFilter.department !== 'All') {
      list = list.filter(item => item.deptId === reportFilter.department);
    }
    return list;
  };

  const handleExportCSV = (filteredData) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Module,Type/Title,Details,Department/Owner,Value Metric,Date\n";
    
    filteredData.forEach(row => {
      csvContent += `${row.id},"${row.module}","${row.type}","${row.details}","${row.deptName}",${row.value || row.metric},${row.date || ''}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ecosphere_report_${activeReportType}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Modal Handlers ---
  const openModal = (type, payload = null) => {
    setModalState({ isOpen: true, type, payload });
    setModalInput('');
  };
  
  const closeModal = () => {
    setModalState({ isOpen: false, type: null, payload: null });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!modalInput) return;
    
    if (modalState.type === 'csr_proof') {
      const newEntry = {
        id: Date.now().toString(),
        employee: currentUser,
        activityId: modalState.payload?.id || '1',
        proof: modalInput,
        pointsEarned: modalState.payload?.points || 0,
        approvalStatus: 'Pending',
        completionDate: new Date().toISOString().split('T')[0]
      };
      setEmployeeParticipation([...employeeParticipation, newEntry]);
      setNotifications([{ id: Date.now().toString(), title: 'Proof Submitted', message: `CSR proof submitted for approval.`, type: 'social', date: new Date().toISOString().split('T')[0], unread: true }, ...notifications]);
    } else if (modalState.type === 'challenge_proof') {
      const newClaim = {
        id: Date.now().toString(),
        employee: currentUser,
        challengeId: modalState.payload?.id || '1',
        progress: 100,
        proof: modalInput,
        approvalStatus: 'Pending'
      };
      setChallengeParticipation([...challengeParticipation, newClaim]);
      setNotifications([{ id: Date.now().toString(), title: 'Challenge Progress', message: `Challenge proof submitted for approval.`, type: 'gamification', date: new Date().toISOString().split('T')[0], unread: true }, ...notifications]);
    } else if (modalState.type === 'upload_policy') {
      const newPolicyAck = {
        id: Date.now().toString(),
        policyId: modalState.payload?.id || '1',
        employee: currentUser,
        acknowledged: true,
        date: new Date().toISOString().split('T')[0]
      };
      setPolicyAcks([...policyAcks, newPolicyAck]);
      setNotifications([{ id: Date.now().toString(), title: 'Policy Signed', message: `You have successfully acknowledged a policy.`, type: 'governance', date: new Date().toISOString().split('T')[0], unread: true }, ...notifications]);
    }
    
    closeModal();
  };

  const renderModal = () => {
    if (!modalState.isOpen) return null;
    
    let title = "";
    let placeholder = "";
    let description = "";

    if (modalState.type === 'csr_proof') {
      title = "Submit CSR Activity Proof";
      description = `You are submitting proof for: ${modalState.payload?.title || 'an activity'}`;
      placeholder = "e.g. certificate.pdf or photos.zip";
    } else if (modalState.type === 'challenge_proof') {
      title = "Join / Complete Challenge";
      description = `Submit evidence for: ${modalState.payload?.title || 'a challenge'}`;
      placeholder = "e.g. strava_screenshot.png";
    } else if (modalState.type === 'upload_policy') {
      title = "Upload / Sign Policy";
      description = `Please review and provide digital signature/upload for compliance.`;
      placeholder = "Enter your full name to sign or attach file name";
    }

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <button className="modal-close" onClick={closeModal}><X size={20} /></button>
          </div>
          <form onSubmit={handleModalSubmit}>
            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{description}</p>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Attachment / Signature</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  placeholder={placeholder}
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', marginTop: '8px' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {renderModal()}
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-odoo">eco<span>sphere</span></div>
        </div>

        <ul className="nav-links">
          <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </li>
          <li className={`nav-item ${activeTab === 'environmental' ? 'active' : ''}`} onClick={() => setActiveTab('environmental')}>
            <Leaf size={20} /> Environmental
          </li>
          <li className={`nav-item ${activeTab === 'social' ? 'active' : ''}`} onClick={() => setActiveTab('social')}>
            <Users size={20} /> Social
          </li>
          <li className={`nav-item ${activeTab === 'governance' ? 'active' : ''}`} onClick={() => setActiveTab('governance')}>
            <Scale size={20} /> Governance
          </li>
          <li className={`nav-item ${activeTab === 'challenges' ? 'active' : ''}`} onClick={() => setActiveTab('challenges')}>
            <Trophy size={20} /> Challenges
          </li>
          <li className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>
            <Medal size={20} /> Leaderboard
          </li>
          <li className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <BarChart2 size={20} /> Reports
          </li>
        </ul>

        {/* Profile */}
        <div className="user-profile">
          <div className="user-info">
            <div className="avatar">{currentUser.charAt(0)}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{currentUser}</div>
              <select 
                value={currentUser} 
                onChange={(e) => setCurrentUser(e.target.value)}
                style={{ fontSize: '0.75rem', padding: '2px 4px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                {employees.map(emp => (
                  <option key={emp.name} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="user-stats">
            <span>Points: <b>{employees.find(e => e.name === currentUser)?.points || 0}</b></span>
            <span>XP: <b>{employees.find(e => e.name === currentUser)?.xp || 0}</b></span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <div className="page-title">
            <span className="brush-header">EcoSphere Platform</span>
          </div>

          <div className="top-actions">

            <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={22} />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="notification-count">{notifications.filter(n => n.unread).length}</span>
              )}
            </div>
          </div>

          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-header">
                <span>Recent Notifications</span>
                <button onClick={() => {
                  setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
                  setShowNotifications(false);
                }} style={{ border: 'none', background: 'transparent', color: 'var(--primary-color)', fontSize: '0.8rem', cursor: 'pointer' }}>Mark all read</button>
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{n.title}</div>
                      <div style={{ color: 'var(--text-muted)', margin: '4px 0' }}>{n.message}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.date}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </header>

        <div className="content-body">
          
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="dashboard-grid">
                <div className="stat-card total">
                  <div className="stat-header">
                    <span>OVERALL ESG SCORE</span>
                    <LayoutDashboard size={20} />
                  </div>
                  <div className="stat-value">{overallEsgScore} / 100</div>
                  <div className="stat-desc">Weighted (E: {config.weightEnv}%, S: {config.weightSocial}%, G: {config.weightGov}%)</div>
                </div>

                <div className="stat-card environmental">
                  <div className="stat-header">
                    <span>ENVIRONMENTAL SCORE</span>
                    <Leaf size={20} style={{ color: 'var(--env-color)' }} />
                  </div>
                  <div className="stat-value">{envScore} / 100</div>
                  <div className="stat-desc">Emissions: {totalEmissions} kg CO2</div>
                </div>

                <div className="stat-card social">
                  <div className="stat-header">
                    <span>SOCIAL SCORE</span>
                    <Users size={20} style={{ color: 'var(--social-color)' }} />
                  </div>
                  <div className="stat-value">{socialScore} / 100</div>
                  <div className="stat-desc">{approvedParticipationCount} social claims approved</div>
                </div>

                <div className="stat-card governance">
                  <div className="stat-header">
                    <span>GOVERNANCE SCORE</span>
                    <Scale size={20} style={{ color: 'var(--gov-color)' }} />
                  </div>
                  <div className="stat-value">{govScore} / 100</div>
                  <div className="stat-desc">{resolvedIssues} compliance issues resolved</div>
                </div>
              </div>

              <div className="charts-grid">
                {/* SVG trend */}
                <div className="chart-card">
                  <div className="chart-title">Carbon Emission Activity Trends (kg CO2)</div>
                  <div style={{ width: '100%', height: '200px' }}>
                    <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%' }}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <line x1="50" y1="30" x2="480" y2="30" stroke="var(--border-color)" strokeDasharray="4" />
                      <line x1="50" y1="90" x2="480" y2="90" stroke="var(--border-color)" strokeDasharray="4" />
                      <line x1="50" y1="150" x2="480" y2="150" stroke="var(--border-color)" strokeDasharray="4" />
                      
                      <path d="M 50,150 L 150,120 L 250,95 L 350,130 L 450,45" fill="none" stroke="var(--primary-color)" strokeWidth="3" />
                      <path d="M 50,150 L 150,120 L 250,95 L 350,130 L 450,45 L 450,180 L 50,180 Z" fill="url(#chartGrad)" />

                      <circle cx="50" cy="150" r="4" fill="var(--primary-color)" />
                      <circle cx="150" cy="120" r="4" fill="var(--primary-color)" />
                      <circle cx="250" cy="95" r="4" fill="var(--primary-color)" />
                      <circle cx="350" cy="130" r="4" fill="var(--primary-color)" />
                      <circle cx="450" cy="45" r="4" fill="var(--primary-color)" />

                      <text x="15" y="35" fill="var(--text-muted)" fontSize="10">10k</text>
                      <text x="15" y="95" fill="var(--text-muted)" fontSize="10">5k</text>
                      <text x="15" y="155" fill="var(--text-muted)" fontSize="10">0</text>
                      
                      <text x="50" y="195" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jan</text>
                      <text x="150" y="195" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Mar</text>
                      <text x="250" y="195" fill="var(--text-muted)" fontSize="10" textAnchor="middle">May</text>
                      <text x="350" y="195" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jul</text>
                      <text x="450" y="195" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Sep</text>
                    </svg>
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-title">EcoSphere Leaderboard</div>
                  <div className="leaderboard-list">
                    {[...employees].sort((a,b) => b.xp - a.xp).slice(0, 3).map((emp, index) => (
                      <div className="leaderboard-item" key={emp.name}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 'bold' }}>#{index+1}</span>
                          <span>{emp.name}</span>
                        </div>
                        <div style={{ fontWeight: 600 }}>{emp.xp} XP</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ENVIRONMENTAL */}
          {activeTab === 'environmental' && (
            <div>
              {/* Product Profiles Sub-view */}
              <div className="chart-card" style={{ marginBottom: '32px' }}>
                <div className="chart-title">
                  <span>Product ESG Profiles Registry</span>
                  <Package size={18} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  {products.map(prod => (
                    <div key={prod.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                      <div style={{ fontWeight: 700, fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                        {prod.name}
                        <span style={{ color: 'var(--env-color)' }}>{prod.esgRating}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                        Carbon footprint: {prod.carbonFootprint}<br />
                        Recyclability: {prod.recyclability}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddProduct} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px' }}>Add Product Profile Link</div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. EcoRouter X2" 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Carbon Footprint</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 15 kg CO2" 
                        value={newProduct.carbonFootprint}
                        onChange={(e) => setNewProduct({ ...newProduct, carbonFootprint: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Recyclability %</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 90%" 
                        value={newProduct.recyclability}
                        onChange={(e) => setNewProduct({ ...newProduct, recyclability: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>ESG Rating</label>
                      <select 
                        value={newProduct.esgRating}
                        onChange={(e) => setNewProduct({ ...newProduct, esgRating: e.target.value })}
                      >
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>Add Product Profile</button>
                </form>
              </div>

              {/* Carbon Transactions */}
              <div className="charts-grid">
                <div className="chart-card">
                  <div className="chart-title">Log Daily Business Operations (Purchase / Mfg / Fleet)</div>
                  <form onSubmit={handleAddTransaction}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Operation Type</label>
                        <select 
                          value={newTransaction.type} 
                          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                        >
                          <option value="Purchase">Purchase (Electricity)</option>
                          <option value="Manufacturing">Manufacturing (Materials)</option>
                          <option value="Expenses">Expenses (Paper, Consumables)</option>
                          <option value="Fleet">Fleet (Vehicle Fuel)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Linked Emission Factor</label>
                        <select 
                          value={newTransaction.factorId} 
                          onChange={(e) => setNewTransaction({ ...newTransaction, factorId: e.target.value })}
                        >
                          {emissionFactors.filter(f => f.category === newTransaction.type).map(fac => (
                            <option key={fac.id} value={fac.id}>{fac.name} ({fac.factor} kg CO2/{fac.unit})</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Quantity</label>
                        <input 
                          type="number" 
                          required 
                          value={newTransaction.value}
                          onChange={(e) => setNewTransaction({ ...newTransaction, value: e.target.value })}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Log Emissions
                    </button>
                  </form>
                </div>

                <div className="chart-card">
                  <div className="chart-title">Emission Factors Mapping</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {emissionFactors.map(f => (
                      <div key={f.id} style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}>
                        <span>{f.name} ({f.category})</span>
                        <b>{f.factor} kg CO2/{f.unit}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ledger */}
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Reference</th>
                      <th>Department</th>
                      <th>Quantity</th>
                      <th>Emissions (kg CO2)</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonTransactions.map(t => (
                      <tr key={t.id}>
                        <td><span className="status-tag low">{t.type}</span></td>
                        <td>{t.details}</td>
                        <td>{departments.find(d => d.id === t.departmentId)?.name || 'N/A'}</td>
                        <td>{t.value}</td>
                        <td style={{ color: 'var(--env-color)', fontWeight: 600 }}>{t.carbonEmissions}</td>
                        <td>{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SOCIAL */}
          {activeTab === 'social' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="status-tag social" style={{ fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.5px' }}>SOCIAL MODULE</span>
                <h1 style={{ margin: '8px 0 4px 0', fontSize: '1.8rem', color: 'var(--text-main)' }}>Social & CSR Initiatives</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Coordinate Corporate Social Responsibility programs, track volunteering hours, and manage diversity metrics.</p>
              </div>

              <div className="charts-grid" style={{ gridTemplateColumns: '1.8fr 1fr' }}>
                <div className="chart-card">
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><HeartHandshake size={18} /> Corporate Social Responsibility Log</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                    {employeeParticipation.map(p => {
                      const activity = csrActivities.find(a => a.id === p.activityId) || { title: 'Unknown Activity' };
                      const isApproved = p.approvalStatus === 'Approved';
                      return (
                        <div key={p.id} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                              {p.employee.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>{p.employee} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>• {p.proof ? `Proof: ${p.proof}` : 'No proof attached'}</span></div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '4px' }}>{activity.title}</div>
                            </div>
                          </div>
                          {isApproved ? (
                            <span className="status-tag env" style={{ padding: '6px 12px', fontSize: '0.7rem', fontWeight: 'bold' }}>APPROVED</span>
                          ) : (
                            <span className="status-tag" style={{ padding: '6px 12px', fontSize: '0.7rem', fontWeight: 'bold', background: '#fef3c7', color: '#b45309' }}>PENDING</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: '24px' }}>
                    <button onClick={() => openModal('csr_proof', { id: 'new', title: 'Community Volunteering', points: 50 })} style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0 }}>
                      <Plus size={16} /> Submit new CSR activity proof
                    </button>
                  </div>
                </div>

                <div className="chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} /> Participation & Training</div>
                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>VOLUNTEER CONTRIBUTIONS</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>1,240 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Hours logged</span></div>
                      </div>
                      <div style={{ color: 'var(--env-color)', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        +15% <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>vs last qtr</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>SAFETY TRAINING SIGN-OFF</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>94.6% <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Compliance</span></div>
                      </div>
                      <div style={{ color: 'var(--env-color)', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Target: 95%
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>CAMPUS DIVERSITY RATING</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>4.2 / 5.0 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Score</span></div>
                      </div>
                      <div style={{ color: 'var(--env-color)', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Good
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GOVERNANCE */}
          {activeTab === 'governance' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="status-tag gov" style={{ fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.5px' }}>COMPLIANCE</span>
                <h1 style={{ margin: '8px 0 4px 0', fontSize: '1.8rem', color: 'var(--text-main)' }}>Governance & Compliance</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Monitor policy acknowledgments, track ethics training, and ensure regulatory alignment.</p>
              </div>

              <div className="charts-grid" style={{ gridTemplateColumns: '1.8fr 1fr' }}>
                <div className="chart-card">
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Scale size={18} /> ESG Board Policies & Sign-offs</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                    {policies.map(p => {
                      const isSigned = policyAcks.some(ack => ack.policyId === p.id && ack.employee === currentUser && ack.acknowledged);
                      return (
                        <div key={p.id} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                              <FileText size={20} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '1rem' }}>{p.title}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Code: {p.code}</div>
                            </div>
                          </div>
                          {isSigned ? (
                            <span className="status-tag env" style={{ padding: '6px 12px', fontSize: '0.7rem', fontWeight: 'bold' }}>COMPLIANT</span>
                          ) : (
                            <span className="status-tag" style={{ padding: '6px 12px', fontSize: '0.7rem', fontWeight: 'bold', background: '#fef3c7', color: '#b45309' }}>IN PROGRESS</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: '24px' }}>
                    <button onClick={() => openModal('upload_policy', { id: policies.find(p => !policyAcks.some(ack => ack.policyId === p.id && ack.employee === currentUser))?.id || '1' })} style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0 }}>
                      <Plus size={16} /> Sign missing regulatory policy
                    </button>
                  </div>
                </div>

                <div className="chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={18} /> Compliance Discrepancies</div>
                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '12px', border: '1px solid #fecaca' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 600, marginBottom: '8px' }}>
                        <AlertTriangle size={16} /> Critical Warning
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#991b1b' }}>The <strong>Marketing Dept</strong> has not submitted their quarterly diversity quota report.</div>
                    </div>

                    <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '12px', border: '1px solid #fde68a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontWeight: 600, marginBottom: '8px' }}>
                        <AlertTriangle size={16} /> Review Required
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#92400e' }}><strong>IT Operations</strong> reported 3 minor data handling breaches this month.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GAMIFICATION */}
          {/* CHALLENGES */}
          {activeTab === 'challenges' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="status-tag env" style={{ fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.5px' }}>GAMIFICATION ENGINE</span>
                <h1 style={{ margin: '8px 0 4px 0', fontSize: '1.8rem', color: 'var(--text-main)' }}>ESG Challenges & Rewards</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Join active sustainability challenges, unlock achievements, and redeem points for environmental merchandise.</p>
              </div>

              <div className="charts-grid" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
                <div className="chart-card">
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Trophy size={18} /> Active Employee Challenges</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                    {challenges.filter(c => c.status === 'Active').map(c => {
                      const hasJoined = challengeParticipation.some(p => p.challengeId === c.id && p.employee === currentUser);
                      return (
                        <div key={c.id} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>{c.title} <span className="status-tag env" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>{c.category}</span></div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{c.description}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Archive size={12} /> Ends: {c.deadline}</div>
                          </div>
                          {hasJoined ? (
                            <button className="btn btn-secondary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Participating</button>
                          ) : (
                            <button onClick={() => openModal('challenge_proof', c)} className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Join Challenge</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>* Participate to earn EcoPoints which can be spent in the Rewards Shop.</div>
                </div>

                <div className="chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={18} /> EcoPoints & Achievements</div>
                  
                  <div style={{ background: 'var(--bg-color)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '16px', textAlign: 'center' }}>
                    <div style={{ color: 'var(--highlight-yellow)', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>MY POINTS BALANCE</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '8px 0' }}>{employees.find(e => e.name === currentUser)?.ecoPoints || 0} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>pts</span></div>
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '12px' }}>Unlocked Badges</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {employees.find(e => e.name === currentUser)?.badges?.map(b => (
                        <span key={b} className="status-tag env" style={{ padding: '4px 10px', fontSize: '0.7rem', fontWeight: 'bold', background: 'var(--env-bg)' }}>{b.toUpperCase()}</span>
                      )) || <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No badges yet</span>}
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--env-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0 }}>
                      <Gift size={16} /> Open Rewards Shop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="status-tag social" style={{ fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.5px' }}>COMPANY RANKINGS</span>
                <h1 style={{ margin: '8px 0 4px 0', fontSize: '1.8rem', color: 'var(--text-main)' }}>EcoSphere Leaderboard</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>See rankings of top-performing departments and outstanding individual contributions to sustainability.</p>
              </div>

              <div className="charts-grid" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
                <div className="chart-card">
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={18} style={{ color: 'var(--highlight-yellow)' }} /> Top Individual Carbon Savers</div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                    {[...employees].sort((a, b) => b.ecoPoints - a.ecoPoints).slice(0, 4).map((user, idx) => {
                      const deptName = departments.find(d => d.id === user.departmentId)?.name || 'General';
                      return (
                        <div key={user.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: idx < 3 ? '1px solid var(--border-color)' : 'none' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '24px', textAlign: 'center', fontSize: '1.2rem', color: idx === 0 ? 'var(--highlight-yellow)' : 'var(--text-muted)' }}>
                              {idx === 0 ? '🏆' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>4</span>}
                            </div>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                              {user.name.split(' ').map(n=>n[0]).join('')}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.name}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{deptName}</div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 700, color: 'var(--env-color)', fontSize: '0.95rem' }}>{Math.round(user.ecoPoints * 1.5)} kg CO₂</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.ecoPoints} EcoPoints earned</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Leaderboard resets on the first day of every month.</div>
                </div>

                <div className="chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} /> Departmental Tiers</div>
                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {(() => {
                      const green = departmentScores.filter(d => d.totalScore >= 90).length;
                      const silver = departmentScores.filter(d => d.totalScore >= 80 && d.totalScore < 90).length;
                      const bronze = departmentScores.filter(d => d.totalScore < 80).length;
                      return (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem' }}><span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--env-color)' }}></span> Green Tier (90+)</div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{green} Department{green !== 1 ? 's' : ''}</div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem' }}><span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> Silver Tier (80-89)</div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{silver} Department{silver !== 1 ? 's' : ''}</div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem' }}><span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--highlight-yellow)' }}></span> Bronze Tier (70-79)</div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{bronze} Department{bronze !== 1 ? 's' : ''}</div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                      View historical leaderboard trends
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="status-tag social" style={{ fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.5px', background: '#e0e7ff', color: '#4338ca' }}>REPORTING LEDGER</span>
                <h1 style={{ margin: '8px 0 4px 0', fontSize: '1.8rem', color: 'var(--text-main)' }}>ESG Disclosures & Reports</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Generate compliance audits matching GRI, SASB, and internal standard formats.</p>
              </div>

              <div className="charts-grid" style={{ gridTemplateColumns: '1.8fr 1fr' }}>
                <div className="chart-card">
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={18} /> Available Disclosure Reports</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--env-bg)', color: 'var(--env-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1rem' }}>EU CSRD Alignment Disclosure 2026</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Generated on {new Date().toLocaleDateString()} | Format: PDF</div>
                        </div>
                      </div>
                      <button className="btn btn-secondary" style={{ padding: '6px', borderRadius: '50%' }}><Download size={18} /></button>
                    </div>

                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#fee2e2', color: '#ef4444', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1rem' }}>Scope 1 & 2 Emissions Ledger - Q2</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Generated on {new Date(Date.now() - 86400000*3).toLocaleDateString()} | Format: CSV</div>
                        </div>
                      </div>
                      <button className="btn btn-secondary" style={{ padding: '6px', borderRadius: '50%' }}><Download size={18} /></button>
                    </div>

                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--social-bg)', color: 'var(--social-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1rem' }}>CSR Volunteering & Inclusivity Matrix</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Generated on {new Date(Date.now() - 86400000*10).toLocaleDateString()} | Format: PDF</div>
                        </div>
                      </div>
                      <button className="btn btn-secondary" style={{ padding: '6px', borderRadius: '50%' }}><Download size={18} /></button>
                    </div>
                  </div>
                  <div style={{ marginTop: '24px' }}>
                    <button className="btn btn-primary" style={{ padding: '10px 20px', width: '100%', fontSize: '0.95rem' }}>Generate New Q2 Disclosure</button>
                  </div>
                </div>

                <div className="chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Leaf size={18} /> Emissions Ledger</div>
                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>CARBON OFFSET RETIREMENTS</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--env-color)' }}>45.0 Tons <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>retired</span></div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>on Gold Standard Registry (ID: GS-3302)</div>
                    </div>
                    <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>UTILITY METER INTEGRATIONS</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#3b82f6' }}>4 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>active</span></div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Direct IoT sync with office energy meters</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              {/* slider weights */}
              <div className="chart-card" style={{ marginBottom: '24px' }}>
                <div className="chart-title">Configure Organizational ESG Score Weights</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Environmental: {config.weightEnv}%</label>
                    <input type="range" min="0" max="100" value={config.weightEnv} onChange={(e) => setConfig({ ...config, weightEnv: parseInt(e.target.value), weightSocial: 100 - parseInt(e.target.value) - config.weightGov })} />
                  </div>
                  <div className="form-group">
                    <label>Social: {config.weightSocial}%</label>
                    <input type="range" min="0" max="100" value={config.weightSocial} onChange={(e) => setConfig({ ...config, weightSocial: parseInt(e.target.value), weightEnv: 100 - parseInt(e.target.value) - config.weightGov })} />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="chart-card">
                <div className="chart-title">Business Rules Toggles</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Auto Emission Calculation (from invoice value)</span>
                    <input type="checkbox" checked={config.autoEmission} onChange={(e) => setConfig({ ...config, autoEmission: e.target.checked })} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>CSR Claim Evidence Proof Required</span>
                    <input type="checkbox" checked={config.evidenceRequired} onChange={(e) => setConfig({ ...config, evidenceRequired: e.target.checked })} />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
