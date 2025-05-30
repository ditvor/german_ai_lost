import { useState, useEffect } from 'react';
import Head from 'next/head';
import DraggableSentence from '../components/DraggableSentence';

/**
 * Home page component for the German learning application.
 * This page displays a sentence building exercise using drag and drop.
 */
export default function Home() {
  // State to store the original sentence
  const [sentence, setSentence] = useState<string>('');
  // State to store the words that can be dragged
  const [words, setWords] = useState<string[]>([]);
  // State to track if the sentence is correct
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // State to track if data is loading
  const [loading, setLoading] = useState<boolean>(true);
  // State to track if there's an error
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch the sentence data from the backend API when the component mounts.
   */
  useEffect(() => {
    const fetchSentence = async () => {
      try {
        setLoading(true);
        // Fetch the sentence data from the backend API
        const response = await fetch('http://localhost:5001/api/sentence');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sentence data');
        }
        
        const data = await response.json();
        setSentence(data.sentence);
        setWords(data.words);
        setError(null);
      } catch (err) {
        console.error('Error fetching sentence:', err);
        setError('Failed to load sentence. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSentence();
  }, []);

  /**
   * Check if the arranged words form the correct sentence.
   * @param arrangedWords - The words arranged by the user
   */
  const checkSentence = async (arrangedWords: string[]) => {
    try {
      // Send the arranged words to the backend API for checking
      const response = await fetch('http://localhost:5001/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ words: arrangedWords }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to check sentence');
      }
      
      const data = await response.json();
      setIsCorrect(data.correct);
    } catch (err) {
      console.error('Error checking sentence:', err);
      setError('Failed to check sentence. Please try again later.');
    }
  };

  /**
   * Reset the exercise by fetching new data.
   */
  const resetExercise = async () => {
    setIsCorrect(null);
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/sentence');
      
      if (!response.ok) {
        throw new Error('Failed to fetch sentence data');
      }
      
      const data = await response.json();
      setSentence(data.sentence);
      setWords(data.words);
      setError(null);
    } catch (err) {
      console.error('Error fetching sentence:', err);
      setError('Failed to load sentence. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>German Learning App</title>
        <meta name="description" content="Learn German by building sentences" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">
          German Sentence Builder
        </h1>
        
        {loading ? (
          <p className="text-xl">Loading sentence...</p>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <button 
              onClick={resetExercise}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Original Sentence:</h2>
              <p className="text-lg">{sentence}</p>
            </div>
            
            <div className="w-full max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">
                Arrange the words to form the correct sentence:
              </h2>
              
              <DraggableSentence 
                words={words} 
                onSentenceCheck={checkSentence} 
              />
              
              {isCorrect !== null && (
                <div className={`mt-6 p-4 rounded ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <p className="text-lg font-semibold">
                    {isCorrect 
                      ? 'Correct! Well done!' 
                      : 'Not quite right. Try again!'}
                  </p>
                  <button 
                    onClick={resetExercise}
                    className={`mt-2 ${isCorrect ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'} text-white font-bold py-2 px-4 rounded`}
                  >
                    {isCorrect ? 'Try Another' : 'Reset'}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className="w-full h-24 border-t border-gray-200 flex justify-center items-center">
        <p className="text-gray-600">
          German Learning App - Built with Next.js and Flask
        </p>
      </footer>
    </div>
  );
}