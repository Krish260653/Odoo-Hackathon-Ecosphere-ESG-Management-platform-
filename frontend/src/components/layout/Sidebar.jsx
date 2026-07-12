import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Leaf,
  Users,
  Shield,
  Trophy,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

export const Sidebar = ({ isMobile, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Environmental', path: '/environmental', icon: Leaf },
    { name: 'Social', path: '/social', icon: Users },
    { name: 'Governance', path: '/governance', icon: Shield },
    { name: 'Challenges', path: '/challenges', icon: Trophy },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Admin', path: '/admin', icon: Settings }
  ];

  // Hide Admin from non-admins
  const visibleItems = navItems.filter(
    (item) => item.name !== 'Admin' || user?.role === 'admin'
  );

  const handleNavClick = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-1">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                isActive
                  ? 'bg-[#E9F5ED] text-[#2D6A4F]'
                  : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#FAFAFA]'
              }`}
            >
              <Icon 
                className={`w-4 h-4 ${isActive ? 'text-[#2D6A4F]' : 'text-[#6B7280]'}`} 
                strokeWidth={2} 
              />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-[#EEEEEE]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50/55 transition-all duration-150 text-left"
        >
          <LogOut className="w-4 h-4 text-red-500" strokeWidth={2} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <aside className="fixed top-16 bottom-0 left-0 w-64 bg-white border-r border-[#EEEEEE] z-50 p-4 flex flex-col justify-between animate-in slide-in-from-left duration-200">
        {sidebarContent}
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#EEEEEE] fixed top-16 bottom-0 left-0 z-20 p-4 justify-between">
      {sidebarContent}
    </aside>
  );
};

export default Sidebar;
