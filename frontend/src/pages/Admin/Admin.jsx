import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Settings, ShieldCheck, Edit, Plus, UserCheck } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();

  // Role protection: Redirect employee to /dashboard
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const usersList = [
    { name: 'Neha Sharma', email: 'admin@ecosphere.com', role: 'admin', dept: 'Sustainability Board' },
    { name: 'Amit Kumar', email: 'employee@ecosphere.com', role: 'employee', dept: 'IT Operations' },
    { name: 'Priya Sharma', email: 'priya@ecosphere.com', role: 'employee', dept: 'IT Operations' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 space-y-6 text-left">
      {/* Page Header */}
      <div>
        <Badge variant="admin" className="px-2.5 py-1 text-[11px]">
          Administration Panel
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-2.5 tracking-tight">System Settings & Admin</h1>
        <p className="text-sm text-[#6B7280] mt-1.5 max-w-xl">
          Configure organizational profiles, verify user registrations, manage emission factors, and review CSR credits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* User administration */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>User Registrations & Roles</span>
            </h3>

            <div className="space-y-4">
              {usersList.map((usr) => (
                <div key={usr.email} className="flex justify-between items-center pb-3 border-b border-[#EEEEEE]/50 last:border-b-0 last:pb-0">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-[#1A1A1A]">{usr.name}</p>
                    <p className="text-xs text-[#6B7280]">{usr.email} · {usr.dept}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={usr.role === 'admin' ? 'admin' : 'employee'}>{usr.role}</Badge>
                    <button className="text-xs font-semibold text-[#6B7280] hover:text-[#1A1A1A] flex items-center gap-0.5">
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE] flex justify-end">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              <span>Register New User</span>
            </Button>
          </div>
        </Card>

        {/* Global settings */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#1A1A1A] pb-3 border-b border-[#EEEEEE] mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              <span>Emission Factors Settings</span>
            </h3>

            <div className="space-y-4 my-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#1A1A1A]">Electricity Grid Factor</span>
                <span className="font-bold text-[#1A1A1A] bg-[#FAFAFA] border border-[#EEEEEE] px-2 py-0.5 rounded">0.82 kg/kWh</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-[#1A1A1A]">Diesel Combustion</span>
                <span className="font-bold text-[#1A1A1A] bg-[#FAFAFA] border border-[#EEEEEE] px-2 py-0.5 rounded">2.68 kg/L</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-[#1A1A1A]">Natural Gas</span>
                <span className="font-bold text-[#1A1A1A] bg-[#FAFAFA] border border-[#EEEEEE] px-2 py-0.5 rounded">1.93 kg/m³</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EEEEEE] text-[10px] text-[#6B7280] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
            <span>Audit logs enabled and active</span>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Admin;
