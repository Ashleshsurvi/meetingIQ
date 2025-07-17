import React, { useRef, useState } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FileUploadProps {
  onFileContent: (content: string, fileName: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileContent }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileRead = (file: File) => {
    setError('');
    
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileContent(content, file.name);
      };
      reader.onerror = () => {
        setError('Failed to read file. Please try again.');
      };
      reader.readAsText(file);
    } else {
      setError('Only text files (.txt) are supported. For DOCX or PDF files, please copy and paste the content manually.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200',
          isDragOver
            ? 'border-[#E07A5F] bg-[#FDF8F6]'
            : 'border-[#E5E2DE] hover:border-[#E07A5F] hover:bg-[#F8F6F4]'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,text/plain"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className={cn(
            'mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200',
            isDragOver ? 'bg-[#FDF8F6]' : 'bg-[#F8F6F4]'
          )}>
            <Upload className={cn(
              'h-8 w-8 transition-colors duration-200',
              isDragOver ? 'text-[#E07A5F]' : 'text-[#555555]'
            )} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-[#3E4E50] mb-2">
              Drop your file here or click to browse
            </p>
            <p className="text-sm text-[#555555]">
              Supports text files (.txt)
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-[#555555]">
            <File className="h-4 w-4" />
            <span>Maximum file size: 10MB</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-[#F8F6F4] border border-[#E5E2DE] rounded-lg p-4">
        <p className="text-sm text-[#3E4E50] font-medium mb-2">Supported File Types:</p>
        <ul className="text-sm text-[#555555] space-y-1">
          <li>• Plain text files (.txt)</li>
          <li>• For DOCX or PDF files, please copy and paste the content manually</li>
        </ul>
      </div>
    </div>
  );
};