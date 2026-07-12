import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { 
  Trophy, 
  Award, 
  Gift, 
  Clock, 
  Target, 
  Shield, 
  Upload, 
  X, 
  Lock, 
  Unlock, 
  Sparkles, 
  Leaf, 
  Users, 
  CheckCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

const Challenges = () => {
  const [activeMainTab, setActiveMainTab] = useState('challenges'); // challenges | badges | rewards
  const [challengeFilter, setChallengeFilter] = useState('All'); // All | Active | Completed | Archived

  // Global state for user XP
  const [userXP, setUserXP] = useState(1240);

  // Challenges State
  const [challenges, setChallenges] = useState([
    { 
      id: 1, 
      title: 'Low-Carbon Commute Challenge', 
      category: 'Environmental', 
      xp: 300, 
      difficulty: 'Easy', 
      deadline: '18 days left', 
      status: 'Active', 
      joined: true, 
      progress: 60,
      desc: 'Log carpools, public transport, or bicycling to work for 30 consecutive days. Save carbon and earn EcoPoints.' 
    },
    { 
      id: 2, 
      title: 'Zero-Waste Office Week', 
      category: 'Governance', 
      xp: 200, 
      difficulty: 'Medium', 
      deadline: '5 days left', 
      status: 'Active', 
      joined: false, 
      progress: 0,
      desc: 'Ensure no disposable single-use cups or plastic bottles are logged on office floors. Use your reusable corporate bottle.' 
    },
    { 
      id: 3, 
      title: 'Plastic-Free Cafeteria Pledge', 
      category: 'Environmental', 
      xp: 150, 
      difficulty: 'Easy', 
      deadline: '12 days left', 
      status: 'Active', 
      joined: false, 
      progress: 0,
      desc: 'Commit to zero single-use plastic consumption at the cafeteria. Log meals taken with reusable plates and metal cutlery.' 
    },
    { 
      id: 4, 
      title: 'Carbon Neutral Supply Chain Vetting', 
      category: 'Governance', 
      xp: 500, 
      difficulty: 'Hard', 
      deadline: 'Ended', 
      status: 'Under Review', 
      joined: true, 
      progress: 90,
      desc: 'Verify and vet Q2 supply chain partners for ISO sustainability certifications. Review reports and log findings.' 
    },
    { 
      id: 5, 
      title: 'Blood Donation Drive Volunteering', 
      category: 'Social', 
      xp: 250, 
      difficulty: 'Medium', 
      deadline: 'Ended', 
      status: 'Completed', 
      joined: true, 
      progress: 100,
      desc: 'Sign up, assist, and volunteer for the corporate blood donation drive held at building A reception.' 
    },
    { 
      id: 6, 
      title: 'Annual Safety Sign-off', 
      category: 'Governance', 
      xp: 100, 
      difficulty: 'Easy', 
      deadline: 'Ended', 
      status: 'Archived', 
      joined: true, 
      progress: 100,
      desc: 'Complete the mandatory safety and hazard training and submit sign-off sheets to HR.' 
    }
  ]);

  // Selected Challenge details modal
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [proofFile, setProofFile] = useState('');
  const [showToast, setShowToast] = useState(null); // toast message state

  // Badges State
  const [badges, setBadges] = useState([
    { id: 1, name: 'Carbon Saver', category: 'Environmental', desc: 'Log 30 days of low-carbon commuting.', unlocked: true, icon: Leaf },
    { id: 2, name: 'CSR Supporter', category: 'Social', desc: 'Complete 10 hours of volunteer service.', unlocked: true, icon: Users },
    { id: 3, name: 'Compliant Champion', category: 'Governance', desc: 'Achieve 100% training sign-offs.', unlocked: true, icon: Shield },
    { id: 4, name: 'Green Mentor', category: 'Environmental', desc: 'Invite 5 colleagues to a sustainability campaign.', unlocked: false, icon: Award },
    { id: 5, name: 'Zero Waste Guru', category: 'Governance', desc: 'Maintain zero disposable trash logs for a week.', unlocked: false, icon: Trophy },
    { id: 6, name: 'Diversity Advocate', category: 'Social', desc: 'Contribute to 3 regional D&I workshops.', unlocked: false, icon: Sparkles }
  ]);

  // Rewards State
  const [rewards, setRewards] = useState([
    { id: 1, name: 'Solar Powered Charger', points: 800, stock: 5, desc: 'Eco-friendly solar charger for laptops and mobile devices.', category: 'Tech' },
    { id: 2, name: 'Reusable Stainless Steel Water Bottle', points: 300, stock: 12, desc: 'EcoSphere double-walled insulated water flask.', category: 'Lifestyle' },
    { id: 3, name: 'Bamboo Cutlery & Straw Set', points: 150, stock: 25, desc: 'Handcrafted reusable dining set with carrying pouch.', category: 'Kitchen' },
    { id: 4, name: 'Tree Planted in Your Name', points: 400, stock: 50, desc: 'Certificated tree planting in Cauvery Basin restoration project.', category: 'Conservation' },
    { id: 5, name: 'Organic Cotton Tote Bag', points: 200, stock: 18, desc: 'Heavy-duty reusable grocery bag made from organic cotton.', category: 'Lifestyle' },
    { id: 6, name: 'Premium Organic Hooded Sweatshirt', points: 1200, stock: 2, desc: 'Warm corporate brand hoodie made from sustainable organic fabrics.', category: 'Apparel' },
    { id: 7, name: 'Electric Bike Rental Voucher (1 Month)', points: 1500, stock: 3, desc: 'Unlimited e-bike rides in Bangalore city for 30 days.', category: 'Transport' }
  ]);

  // Filtered challenges list
  const filteredChallenges = challengeFilter === 'All' 
    ? challenges 
    : challenges.filter(c => c.status === challengeFilter);

  // Actions
  const handleToggleJoin = (id) => {
    setChallenges(prev => 
      prev.map(c => {
        if (c.id === id) {
          const newJoined = !c.joined;
          return {
            ...c,
            joined: newJoined,
            progress: newJoined ? 10 : 0
          };
        }
        return c;
      })
    );
  };

  const handleOpenChallengeDetails = (c) => {
    setSelectedChallenge(c);
  };

  const handleCloseChallengeDetails = () => {
    setSelectedChallenge(null);
    setProofFile('');
  };

  const handleSubmitProof = (e) => {
    e.preventDefault();
    if (!selectedChallenge) return;

    // Update challenge status to Under Review
    setChallenges(prev => 
      prev.map(c => c.id === selectedChallenge.id ? { ...c, status: 'Under Review', progress: 95 } : c)
    );

    triggerToast(`Proof submitted successfully for "${selectedChallenge.title}". Our audit team will review it.`);
    handleCloseChallengeDetails();
  };

  const triggerToast = (msg, isError = false) => {
    setShowToast({ text: msg, error: isError });
    setTimeout(() => {
      setShowToast(null);
    }, 4000);
  };

  const handleRedeemReward = (reward) => {
    if (userXP < reward.points) {
      triggerToast(`Not enough points to redeem "${reward.name}". You need ${reward.points - userXP} more XP.`, true);
      return;
    }
    if (reward.stock <= 0) {
      triggerToast(`"${reward.name}" is currently out of stock!`, true);
      return;
    }

    // Deduct XP and decrement stock
    setUserXP(prev => prev - reward.points);
    setRewards(prev => 
      prev.map(r => r.id === reward.id ? { ...r, stock: r.stock - 1 } : r)
    );

    triggerToast(`Successfully redeemed "${reward.name}"! ${reward.points} XP deducted.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left relative">
      
      {/* Toast Alert */}
      {showToast && (
        <div className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-right duration-200 text-xs font-semibold ${
          showToast.error 
            ? 'bg-red-50 text-red-700 border-red-200/50' 
            : 'bg-green-50 text-[#2D6A4F] border-green-200/50'
        }`}>
          {showToast.error ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span>{showToast.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Badge variant="environmental" className="px-2.5 py-1 text-[11px]">
            Gamification Engine
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">ESG Challenges & Rewards</h1>
          <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
            Join active sustainability challenges, unlock achievements, and redeem points for environmental merchandise.
          </p>
        </div>

        {/* User XP Counter */}
        <div className="flex items-center gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex-shrink-0">
          <Award className="w-5 h-5 text-amber-600 animate-pulse" />
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">My Points Balance</span>
            <p className="text-2xl font-bold text-amber-700">{userXP} <span className="text-xs font-normal text-amber-800/80">XP</span></p>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex border-b border-[#EEEEEE] overflow-x-auto no-scrollbar gap-6">
        {[
          { id: 'challenges', label: 'Challenges', icon: Target },
          { id: 'badges', label: 'Badges & Milestones', icon: Award },
          { id: 'rewards', label: 'Rewards Shop', icon: Gift }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id)}
              className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors duration-150 flex items-center gap-2 ${
                activeMainTab === tab.id
                  ? 'border-[#2D6A4F] text-[#2D6A4F]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1A1A1A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeMainTab === 'challenges' && (
        <div className="space-y-6">
          {/* Challenges filters */}
          <div className="flex border-b border-[#EEEEEE] gap-4 text-xs font-medium pb-1.5">
            {['All', 'Active', 'Under Review', 'Completed', 'Archived'].map(filter => (
              <button
                key={filter}
                onClick={() => setChallengeFilter(filter)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  challengeFilter === filter 
                    ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]' 
                    : 'bg-[#FAFAFA] border-[#EEEEEE] text-[#6B7280] hover:text-[#1A1A1A]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map(c => (
              <Card key={c.id} className="flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                <div className="space-y-3.5 text-left">
                  <div className="flex justify-between items-start gap-2">
                    <Badge variant={
                      c.category === 'Environmental' 
                        ? 'environmental' 
                        : c.category === 'Social' 
                        ? 'social' 
                        : 'governance'
                    }>
                      {c.category}
                    </Badge>
                    
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/20">
                      +{c.xp} XP
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#1A1A1A] leading-snug cursor-pointer hover:text-[#2D6A4F]" onClick={() => handleOpenChallengeDetails(c)}>
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">{c.desc}</p>

                  <div className="flex flex-wrap items-center justify-between text-[10px] text-[#6B7280] font-medium pt-1.5 border-t border-[#EEEEEE]/60 gap-y-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                      <span>{c.deadline}</span>
                    </span>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      c.difficulty === 'Easy' 
                        ? 'bg-green-50 text-green-700' 
                        : c.difficulty === 'Medium' 
                        ? 'bg-amber-50 text-amber-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {c.difficulty}
                    </span>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      c.status === 'Active' 
                        ? 'bg-blue-50 text-blue-700' 
                        : c.status === 'Completed' 
                        ? 'bg-green-50 text-green-700' 
                        : c.status === 'Under Review' 
                        ? 'bg-yellow-50 text-yellow-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  {c.joined && c.status !== 'Completed' && c.status !== 'Archived' && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[9px] font-bold text-[#6B7280]">
                        <span>Challenge Progress</span>
                        <span>{c.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-[#FAFAFA] border border-[#EEEEEE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2D6A4F]" style={{ width: `${c.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#EEEEEE] mt-4 flex gap-2.5">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="flex-1"
                    onClick={() => handleOpenChallengeDetails(c)}
                  >
                    View Details
                  </Button>
                  
                  {c.status !== 'Completed' && c.status !== 'Archived' && (
                    <Button 
                      size="sm" 
                      variant={c.joined ? 'outline' : 'primary'}
                      className="flex-1"
                      onClick={() => handleToggleJoin(c.id)}
                    >
                      {c.joined ? 'Leave' : 'Join Challenge'}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Details Modal */}
          {selectedChallenge && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-2xl border border-[#EEEEEE] shadow-xl w-full max-w-md p-6 mx-4 animate-in fade-in zoom-in-95 duration-150 text-left">
                <div className="flex justify-between items-start pb-3 border-b border-[#EEEEEE] mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A]">{selectedChallenge.title}</h3>
                    <div className="flex gap-2 mt-1.5">
                      <Badge variant="environmental">{selectedChallenge.category}</Badge>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/20">
                        +{selectedChallenge.xp} XP
                      </span>
                    </div>
                  </div>
                  <button onClick={handleCloseChallengeDetails} className="text-[#6B7280] hover:text-[#1A1A1A]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="text-xs text-[#6B7280] leading-relaxed">
                    <p className="font-semibold text-[#1A1A1A] mb-1">Overview</p>
                    <p>{selectedChallenge.desc}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs bg-[#FAFAFA] border border-[#EEEEEE] p-3 rounded-xl">
                    <div>
                      <p className="text-[#6B7280]">Difficulty</p>
                      <p className="font-semibold text-[#1A1A1A]">{selectedChallenge.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Deadline</p>
                      <p className="font-semibold text-[#1A1A1A]">{selectedChallenge.deadline}</p>
                    </div>
                  </div>

                  {selectedChallenge.joined && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-[#1A1A1A] mb-1">
                          <span>Progress Rate</span>
                          <span>{selectedChallenge.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#FAFAFA] border border-[#EEEEEE] rounded-full overflow-hidden">
                          <div className="h-full bg-[#2D6A4F] rounded-full" style={{ width: `${selectedChallenge.progress}%` }} />
                        </div>
                      </div>

                      {/* Submit Proof Section */}
                      {selectedChallenge.status !== 'Completed' && selectedChallenge.status !== 'Archived' && (
                        <form onSubmit={handleSubmitProof} className="border-t border-[#EEEEEE] pt-4 space-y-3">
                          <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5 text-[#2D6A4F]" />
                            <span>Submit Proof of Completion</span>
                          </h4>
                          <p className="text-[10px] text-[#6B7280] leading-normal">
                            Upload photos of logs, receipt copies, or transit summaries to complete the checklist validation.
                          </p>
                          <div className="flex items-center gap-3">
                            <input 
                              type="file" 
                              id="proof-upload"
                              className="hidden" 
                              onChange={(e) => setProofFile(e.target.value)}
                            />
                            <label 
                              htmlFor="proof-upload"
                              className="flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 border border-dashed border-[#EEEEEE] hover:border-[#2D6A4F] rounded-lg cursor-pointer bg-[#FAFAFA] text-[#6B7280] hover:text-[#1D1D1D] transition-all flex-1"
                            >
                              <FileText className="w-4 h-4" />
                              <span>{proofFile ? proofFile.split('\\').pop() : 'Select Proof File'}</span>
                            </label>
                            {proofFile && (
                              <Button type="submit" size="sm">Submit</Button>
                            )}
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-[#EEEEEE] mt-5">
                  <Button variant="secondary" onClick={handleCloseChallengeDetails}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeMainTab === 'badges' && (
        <div className="space-y-6 text-left">
          <div className="pb-3 border-b border-[#EEEEEE]">
            <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2D6A4F]" />
              <span>EcoSphere Badges & Achievements</span>
            </h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Unlock distinct medals by participating in sustainability campaigns and scoring top records.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map(b => {
              const Icon = b.icon;
              return (
                <Card 
                  key={b.id} 
                  className={`flex items-start gap-4 transition-all duration-200 ${
                    b.unlocked 
                      ? 'border-[#2D6A4F]/20 bg-white shadow-soft' 
                      : 'border-[#EEEEEE] bg-gray-50/50 grayscale opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    b.unlocked ? 'bg-[#E9F5ED] text-[#2D6A4F]' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" strokeWidth={b.unlocked ? 2 : 1.5} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-[#1A1A1A]">{b.name}</h4>
                      {b.unlocked ? (
                        <Unlock className="w-3 h-3 text-[#2D6A4F]" />
                      ) : (
                        <Lock className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                    <Badge variant={
                      b.category === 'Environmental' 
                        ? 'environmental' 
                        : b.category === 'Social' 
                        ? 'social' 
                        : 'governance'
                    } className="px-1.5 py-0">
                      {b.category}
                    </Badge>
                    <p className="text-[11px] text-[#6B7280] leading-normal pt-1.5">{b.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {activeMainTab === 'rewards' && (
        <div className="space-y-6 text-left">
          <div className="pb-3 border-b border-[#EEEEEE] flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-base text-[#1A1A1A] flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-500" />
                <span>EcoPoints Rewards Shop</span>
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Redeem your hard-earned XP for eco-friendly products and certified donations.
              </p>
            </div>
            <div className="text-xs bg-[#FAFAFA] border border-[#EEEEEE] px-3 py-1.5 rounded-lg font-semibold text-[#6B7280]">
              Available Points: <strong className="text-amber-700">{userXP} XP</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map(r => {
              const canAfford = userXP >= r.points;
              return (
                <Card key={r.id} className="flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider bg-[#FAFAFA] border border-[#EEEEEE] px-2 py-0.5 rounded-md">
                        {r.category}
                      </span>
                      <span className="text-xs font-bold text-amber-700">
                        {r.points} XP
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#1A1A1A] leading-snug">{r.name}</h4>
                    <p className="text-xs text-[#6B7280] leading-normal">{r.desc}</p>

                    <div className="flex justify-between items-center text-[10px] text-[#6B7280] pt-2 border-t border-[#EEEEEE]/60 font-semibold">
                      <span>Availability:</span>
                      <span className={r.stock > 3 ? 'text-[#2D6A4F]' : r.stock > 0 ? 'text-amber-600' : 'text-red-500'}>
                        {r.stock > 0 ? `${r.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EEEEEE] mt-4">
                    <Button 
                      size="sm" 
                      onClick={() => handleRedeemReward(r)}
                      disabled={r.stock <= 0}
                      variant={canAfford ? 'primary' : 'secondary'}
                      className="w-full flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{r.stock <= 0 ? 'Out of Stock' : canAfford ? 'Redeem Item' : 'Not Enough XP'}</span>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
