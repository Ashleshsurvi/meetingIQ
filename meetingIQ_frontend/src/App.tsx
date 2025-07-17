import React from 'react';
import { Header } from './components/Header';
import { TranscriptInput } from './components/TranscriptInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { NotificationProvider } from './contexts/NotificationContext';
import { useTranscriptProcessor } from './hooks/useTranscriptProcessor';

function App() {
  const {
    transcript,
    setTranscript,
    results,
    isLoading,
    error,
    truncationNote,
    processTranscript,
    clearResults
  } = useTranscriptProcessor();

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#F4F1EE] via-[#F4F1EE] to-[#F0EDE9]">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <TranscriptInput
                transcript={transcript}
                setTranscript={setTranscript}
                onSubmit={processTranscript}
                isLoading={isLoading}
                error={error}
              />
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <ResultsDisplay
                results={results}
                isLoading={isLoading}
                truncationNote={truncationNote}
                onClear={clearResults}
              />
            </div>
          </div>
        </main>
      </div>
    </NotificationProvider>
  );
}

export default App;