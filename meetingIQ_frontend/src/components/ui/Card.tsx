import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-[#E5E2DE] hover:shadow-md transition-shadow duration-200',
      className
    )}>
      {children}
    </div>
  );
};