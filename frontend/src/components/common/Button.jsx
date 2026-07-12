import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  type = 'button',
  ...props 
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-[0.98] outline-none';
  
  const variants = {
    primary: 'bg-[#2D6A4F] text-white hover:bg-[#1B4332] shadow-sm',
    secondary: 'bg-[#FAFAFA] text-[#1A1A1A] border border-[#EEEEEE] hover:bg-white',
    outline: 'border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#E9F5ED]',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
