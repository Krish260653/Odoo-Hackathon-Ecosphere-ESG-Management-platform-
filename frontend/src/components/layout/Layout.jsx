import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AICopilot from '../AICopilot';

export const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar */}
        <Sidebar isMobile={false} />
        
        {/* Mobile Sidebar overlay & draw */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <Sidebar isMobile={true} onClose={() => setIsMobileMenuOpen(false)} />
          </>
        )}

        {/* Content Outlet */}
        <main className="flex-1 md:pl-64 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* ESG AI Copilot Widget */}
      <AICopilot />
    </div>
  );
};

export default Layout;
