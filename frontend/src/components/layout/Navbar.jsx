import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Badge from '../common/Badge';
import { 
  Bell, 
  Menu, 
  X, 
  Leaf, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BellOff,
  User, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

export const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'approval', title: 'Scope 1 Carbon targets verified', time: '2 hours ago', unread: true },
    { id: 2, type: 'compliance', title: 'New compliance warning in Plant 2B', time: '4 hours ago', unread: true },
    { id: 3, type: 'badge', title: 'Unlocked badge "Carbon Saver"', time: '1 day ago', unread: true },
    { id: 4, type: 'reminder', title: 'Data upload deadline for Q2 approaching', time: '2 days ago', unread: false },
    { id: 5, type: 'approval', title: 'CSR volunteer hours approved', time: '3 days ago', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  const handleProfileNavigation = () => {
    navigate('/profile');
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#EEEEEE] z-30 px-4 md:px-8 flex items-center justify-between">
      
      {/* Click outside backdrops */}
      {isNotificationsOpen && (
        <div 
          className="fixed inset-0 bg-transparent z-40" 
          onClick={() => setIsNotificationsOpen(false)} 
        />
      )}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 bg-transparent z-40" 
          onClick={() => setIsProfileOpen(false)} 
        />
      )}

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden p-1.5 hover:bg-[#FAFAFA] rounded-md text-[#6B7280] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E9F5ED] rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary" strokeWidth={2} />
          </div>
          <span className="font-semibold text-base text-[#1A1A1A] tracking-tight">EcoSphere</span>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        
        {/* Notification bell */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            className={`relative p-2 rounded-full transition-colors focus:outline-none ${
              isNotificationsOpen ? 'text-[#1A1A1A] bg-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#FAFAFA]'
            }`}
          >
            <Bell className="w-5 h-5" strokeWidth={1.75} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#EEEEEE] rounded-[16px] shadow-soft z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Header */}
              <div className="p-4 border-b border-[#EEEEEE] flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Notifications</span>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllAsRead}
                      className="text-[10px] font-semibold text-[#6B7280] hover:text-[#2D6A4F] transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button 
                      onClick={handleClearAll}
                      className="text-[10px] font-semibold text-[#6B7280] hover:text-red-600 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <div className="max-h-72 overflow-y-auto divide-y divide-[#EEEEEE]">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => handleNotificationClick(item.id)}
                      className={`p-3.5 flex gap-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors relative ${
                        item.unread ? 'border-l-2 border-[#2D6A4F]' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div className="mt-0.5 flex-shrink-0">
                        {item.type === 'approval' && (
                          <div className="w-6 h-6 rounded-md bg-[#E9F5ED] flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" strokeWidth={2} />
                          </div>
                        )}
                        {item.type === 'compliance' && (
                          <div className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-600" strokeWidth={2} />
                          </div>
                        )}
                        {item.type === 'badge' && (
                          <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center">
                            <Award className="w-3.5 h-3.5 text-amber-600" strokeWidth={2} />
                          </div>
                        )}
                        {item.type === 'reminder' && (
                          <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                            <Bell className="w-3.5 h-3.5 text-[#6B7280]" strokeWidth={2} />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-normal ${item.unread ? 'font-semibold text-[#1A1A1A]' : 'text-[#6B7280]'}`}>
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[#B0B0B0] mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty state */
                  <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="w-10 h-10 bg-[#E9F5ED] rounded-full flex items-center justify-center">
                      <BellOff className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-semibold text-[#1A1A1A]">You're all caught up 🎉</p>
                    <p className="text-[10px] text-[#6B7280]">No new notifications to show.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown trigger */}
        <div className="relative">
          <div 
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className={`flex items-center gap-3 pl-2 border-l border-[#EEEEEE] cursor-pointer py-1 px-2 rounded-lg transition-colors select-none ${
              isProfileOpen ? 'bg-[#FAFAFA]' : 'hover:bg-[#FAFAFA]'
            }`}
          >
            <img 
              src={user?.avatarUrl} 
              alt={user?.name} 
              className="w-8 h-8 rounded-full object-cover border border-[#EEEEEE]" 
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">{user?.name}</span>
              <span className="text-[10px] text-[#6B7280] font-medium leading-none mt-0.5">{user?.department}</span>
            </div>
            <Badge variant={user?.role === 'admin' ? 'admin' : 'employee'}>
              {user?.role}
            </Badge>
          </div>

          {/* Profile Dropdown Panel */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-[#EEEEEE] rounded-[16px] shadow-soft z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Profile Card Header */}
              <div className="p-4 flex items-center gap-3 bg-[#FAFAFA] border-b border-[#EEEEEE]">
                <img 
                  src={user?.avatarUrl} 
                  alt={user?.name} 
                  className="w-12 h-12 rounded-full object-cover border border-[#EEEEEE]" 
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-[#1A1A1A] truncate">{user?.name}</h4>
                  <p className="text-xs text-[#6B7280] truncate">{user?.email}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Badge variant={user?.role === 'admin' ? 'admin' : 'employee'}>
                      {user?.role}
                    </Badge>
                    <span className="text-[9px] text-[#B0B0B0] font-medium truncate">{user?.department}</span>
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <div className="p-2 space-y-0.5">
                <button 
                  onClick={handleProfileNavigation}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#FAFAFA] transition-all text-left"
                >
                  <User className="w-4 h-4 text-[#6B7280]" strokeWidth={1.5} />
                  <span>My Profile</span>
                </button>
                
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#FAFAFA] transition-all text-left"
                >
                  <Settings className="w-4 h-4 text-[#6B7280]" strokeWidth={1.5} />
                  <span>Settings</span>
                </button>

                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#FAFAFA] transition-all text-left"
                >
                  <HelpCircle className="w-4 h-4 text-[#6B7280]" strokeWidth={1.5} />
                  <span>Help & Support</span>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-[#EEEEEE]" />

              {/* Logout Option */}
              <div className="p-2">
                <button 
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-all text-left"
                >
                  <LogOut className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
