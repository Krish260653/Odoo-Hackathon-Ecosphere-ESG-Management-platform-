import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white border border-[#EEEEEE] rounded-[16px] shadow-soft p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
