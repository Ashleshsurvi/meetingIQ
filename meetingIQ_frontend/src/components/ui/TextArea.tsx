import React from 'react';
import { cn } from '../../utils/cn';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (value: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full px-4 py-3 border border-[#E5E2DE] rounded-xl focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] transition-colors duration-200 placeholder-[#999999] bg-white/70 backdrop-blur-sm text-[#222222]',
        className
      )}
      {...props}
    />
  );
};