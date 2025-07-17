import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, Send, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { TextArea } from './ui/TextArea';
import { FileUpload } from './ui/FileUpload';
import { ErrorAlert } from './ui/ErrorAlert';

interface TranscriptInputProps {
  transcript: string;
  setTranscript: (transcript: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export const TranscriptInput: React.FC<TranscriptInputProps> = ({
  transcript,
  setTranscript,
  onSubmit,
  isLoading,
  error
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [fileName, setFileName] = useState<string>('');

  const handleFileContent = (content: string, name: string) => {
    setTranscript(content);
    setFileName(name);
    setActiveTab('text'); // Switch to text view to show content
  };

  const handleSubmit = () => {
    if (transcript.trim().length < 50) {
      return;
    }
    onSubmit();
  };

  const isValidTranscript = transcript.trim().length >= 50;

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#E5E2DE] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#3E4E50] mb-2">Input Transcript</h2>
        <p className="text-[#555555]">Paste your meeting transcript or upload a text file to get started.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-[#F8F6F4] p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'text'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#555555] hover:text-[#3E4E50]'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Text Input</span>
        </button>
        <button
          onClick={() => setActiveTab('file')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'file'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#555555] hover:text-[#3E4E50]'
          }`}
        >
          <Upload className="h-4 w-4" />
          <span>File Upload</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {activeTab === 'text' ? (
          <div className="space-y-4">
            {fileName && (
              <div className="bg-[#F8F6F4] border border-[#E5E2DE] rounded-lg p-3">
                <p className="text-sm text-[#3E4E50]">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Loaded from: <span className="font-medium">{fileName}</span>
                </p>
              </div>
            )}
            <TextArea
              value={transcript}
              onChange={setTranscript}
              placeholder="Paste your meeting transcript here..."
              rows={12}
              className="resize-none"
            />
            <div className="flex justify-between items-center text-sm text-[#555555]">
              <span>{transcript.length} characters</span>
              {transcript.length > 0 && transcript.length < 50 && (
                <span className="text-[#F5A623] flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Minimum 50 characters required
                </span>
              )}
            </div>
          </div>
        ) : (
          <FileUpload onFileContent={handleFileContent} />
        )}

        {error && <ErrorAlert message={error} />}

        <Button
          onClick={handleSubmit}
          disabled={!isValidTranscript || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin text-white" />
              Processing Transcript...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Extract Summary & Action Items
            </>
          )}
        </Button>
      </div>
    </div>
  );
};