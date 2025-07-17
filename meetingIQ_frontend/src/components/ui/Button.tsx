import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#3E4E50] to-[#E07A5F] hover:from-[#2E3E40] hover:to-[#D06A4F] text-white shadow-lg hover:shadow-xl focus:ring-[#E07A5F] transform hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-[#F8F6F4] hover:bg-[#F4F1EE] text-[#3E4E50] focus:ring-[#E07A5F] border border-[#E5E2DE]',
    outline: 'border border-[#E5E2DE] hover:border-[#E07A5F] text-[#3E4E50] hover:bg-[#F8F6F4] focus:ring-[#E07A5F]',
    ghost: 'text-[#555555] hover:text-[#3E4E50] hover:bg-[#F8F6F4] focus:ring-[#E07A5F]'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};