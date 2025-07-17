import { useState } from 'react';

import { API_BASE_URL } from '../config/config.local';


interface ActionItem {
  description: string;
  owner: string;
  deadline: string;
}

interface Results {
  summary: string[];
  action_items: ActionItem[];
}

interface ApiResponse {
  summary: string[];
  action_items: ActionItem[];
  note?: string;
}

export const useTranscriptProcessor = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [truncationNote, setTruncationNote] = useState<string | null>(null);

  const processTranscript = async () => {
    if (transcript.trim().length < 50) {
      setError('Transcript must be at least 50 characters long.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTruncationNote(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_BASE_URL}/api/extract/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcript.trim(),
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Invalid request. Please check your transcript.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      }

      const data: ApiResponse = await response.json();
      
      setResults({
        summary: data.summary || [],
        action_items: data.action_items || [],
      });

      if (data.note) {
        setTruncationNote(data.note);
      }
      
    } catch (err) {
      console.error('API Error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to process transcript. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
    setTruncationNote(null);
    setTranscript('');
  };

  return {
    transcript,
    setTranscript,
    results,
    isLoading,
    error,
    truncationNote,
    processTranscript,
    clearResults,
  };
};