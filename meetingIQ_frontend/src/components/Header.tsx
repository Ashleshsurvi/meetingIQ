import React from 'react';
import { Brain, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#E5E2DE] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3E4E50] to-[#E07A5F] rounded-xl blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-r from-[#3E4E50] to-[#E07A5F] p-2 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3E4E50] to-[#E07A5F] bg-clip-text text-transparent">
                MeetingIQ
              </h1>
              <p className="text-[#555555] text-sm">AI-Powered Meeting Intelligence</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-[#F8F6F4] to-[#F4F1EE] px-4 py-2 rounded-full border border-[#E5E2DE]">
            <Zap className="h-4 w-4 text-[#E07A5F]" />
            <span className="text-sm font-medium text-[#3E4E50]">Extract • Summarize • Organize</span>
          </div>
        </div>
      </div>
    </header>
  );
};