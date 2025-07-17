import React from 'react';
import { CheckCircle, Clock, User, FileText, AlertTriangle, X, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface ActionItem {
  description: string;
  owner: string;
  deadline: string;
}

interface Results {
  summary: string[];
  action_items: ActionItem[];
}

interface ResultsDisplayProps {
  results: Results | null;
  isLoading: boolean;
  truncationNote: string | null;
  onClear: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  isLoading,
  truncationNote,
  onClear
}) => {
  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#E5E2DE] p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-[#E07A5F] animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-[#3E4E50] mb-2">Processing Transcript</h3>
          <p className="text-[#555555] text-center">
            Our AI is analyzing your meeting transcript to extract key insights and action items...
          </p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#E5E2DE] p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gradient-to-r from-[#F8F6F4] to-[#F4F1EE] p-4 rounded-full mb-4 border border-[#E5E2DE]">
            <FileText className="h-12 w-12 text-[#E07A5F]" />
          </div>
          <h3 className="text-xl font-semibold text-[#3E4E50] mb-2">Ready to Analyze</h3>
          <p className="text-[#555555] max-w-md">
            Upload a transcript or paste meeting content to extract summaries and action items using AI.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Truncation Notice */}
      {truncationNote && (
        <div className="bg-[#FEF9E7] border border-[#F5A623]/30 rounded-xl p-4 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-[#F5A623] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[#B8860B] font-medium">Processing Notice</p>
            <p className="text-[#B8860B] text-sm mt-1">{truncationNote}</p>
          </div>
        </div>
      )}

      {/* Results Container */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#E5E2DE] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#3E4E50]">Analysis Results</h2>
          <Button onClick={onClear} variant="outline" size="sm">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>

        <div className="space-y-8">
          {/* Summary Section */}
          <div>
            <h3 className="text-xl font-semibold text-[#3E4E50] mb-4 flex items-center">
              <div className="bg-[#F8F6F4] p-2 rounded-lg mr-3 border border-[#E5E2DE]">
                <FileText className="h-5 w-5 text-[#E07A5F]" />
              </div>
              Meeting Summary
            </h3>
            
            {results.summary && results.summary.length > 0 ? (
              <div className="bg-gradient-to-r from-[#F8F6F4] to-[#F4F1EE] rounded-xl p-6 border border-[#E5E2DE]">
                <ul className="space-y-3">
                  {results.summary.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="bg-[#E07A5F] rounded-full p-1 mt-1 flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <p className="text-[#222222] leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-[#555555]">No summary available</p>
              </Card>
            )}
          </div>

          {/* Action Items Section */}
          <div>
            <h3 className="text-xl font-semibold text-[#3E4E50] mb-4 flex items-center">
              <div className="bg-[#E8F5E8] p-2 rounded-lg mr-3 border border-[#4CAF50]/20">
                <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
              </div>
              Action Items
            </h3>
            
            {results.action_items && results.action_items.length > 0 ? (
              <div className="grid gap-4">
                {results.action_items.map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-[#4CAF50]">
                    <div className="space-y-3">
                      <p className="text-[#222222] font-medium leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-sm text-[#555555]">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{item.owner || 'Unassigned'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-[#555555]">
                            <Clock className="h-4 w-4" />
                            <span>{item.deadline || 'No deadline'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-[#555555]">No action items found</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};