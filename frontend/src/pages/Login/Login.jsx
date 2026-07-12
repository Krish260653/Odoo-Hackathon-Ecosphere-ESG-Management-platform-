import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Leaf } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('admin'); // 'admin' or 'employee'
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setError('');
    login(role);
    navigate('/dashboard');
  };

  const handleDemoSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setEmail('admin@ecosphere.com');
      setPassword('admin123');
    } else {
      setEmail('employee@ecosphere.com');
      setPassword('employee123');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center px-4 py-12">
      {/* Centered Login Card */}
      <Card className="w-full max-w-[420px] p-8">
        
        {/* Logo and Wordmark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#E9F5ED] rounded-xl flex items-center justify-center mb-3">
            <Leaf className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight">EcoSphere</h1>
          <p className="text-sm text-[#6B7280] mt-1 font-medium">Sustainability, Simplified</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-3.5 py-2 border border-[#EEEEEE] rounded-lg text-sm bg-white placeholder-[#B0B0B0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
            />
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider block">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-10 py-2 border border-[#EEEEEE] rounded-lg text-sm bg-white placeholder-[#B0B0B0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A1A] focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <Eye className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full py-2.5"
          >
            Login
          </Button>
        </form>

        {/* Demo Role Selector */}
        <div className="mt-8 pt-6 border-t border-[#EEEEEE] flex flex-col items-center">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-3">
            Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg w-full">
            <button
              type="button"
              onClick={() => handleDemoSelect('admin')}
              className={`py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                role === 'admin'
                  ? 'bg-white text-[#2D6A4F] shadow-sm border border-[#EEEEEE]'
                  : 'text-[#6B7280] hover:text-[#1A1A1A]'
              }`}
            >
              Login as Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect('employee')}
              className={`py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                role === 'employee'
                  ? 'bg-white text-[#2D6A4F] shadow-sm border border-[#EEEEEE]'
                  : 'text-[#6B7280] hover:text-[#1A1A1A]'
              }`}
            >
              Login as Employee
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-center mt-6">
          <button 
            type="button"
            className="text-xs text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            Forgot password?
          </button>
        </div>

      </Card>
    </div>
  );
};

export default Login;
