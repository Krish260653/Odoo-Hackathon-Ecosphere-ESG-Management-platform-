import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const styles = {
    primary: 'bg-[#2D6A4F] text-white',
    secondary: 'bg-[#FAFAFA] text-[#6B7280] border border-[#EEEEEE]',
    environmental: 'bg-[#E9F5ED] text-[#2D6A4F] border border-[#2D6A4F]/10',
    social: 'bg-[#EBF3F7] text-[#457B9D] border border-[#457B9D]/10',
    governance: 'bg-[#FDF8EC] text-[#D4B04C] border border-[#E9C46A]/20',
    admin: 'bg-amber-50 text-amber-700 border border-amber-200/50',
    employee: 'bg-blue-50 text-blue-700 border border-blue-200/50',
  };

  const currentStyle = styles[variant] || styles.primary;

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${currentStyle} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
