import { render, screen, waitFor } from '@testing-library/react';
import Home from '../index';

// Mock the fetch function
global.fetch = jest.fn();

// Mock the DraggableSentence component
jest.mock('../../components/DraggableSentence', () => ({
  __esModule: true,
  default: ({ words, onSentenceCheck }: { words: string[], onSentenceCheck: (words: string[]) => void }) => (
    <div data-testid="draggable-sentence">
      <div data-testid="words">{words.join(',')}</div>
      <button onClick={() => onSentenceCheck(words)}>Check</button>
    </div>
  ),
}));

describe('Home', () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    (global.fetch as jest.Mock).mockReset();
  });

  it('displays loading state initially', () => {
    // Mock the fetch to return a pending promise
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<Home />);
    
    // Check if loading message is displayed
    expect(screen.getByText('Loading sentence...')).toBeInTheDocument();
  });

  it('displays the sentence and words after loading', async () => {
    // Mock the fetch to return sentence data
    const mockSentence = 'This is a test sentence.';
    const mockWords = ['This', 'is', 'a', 'test', 'sentence.'];
    
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ sentence: mockSentence, words: mockWords }),
      })
    );
    
    render(<Home />);
    
    // Wait for the data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading sentence...')).not.toBeInTheDocument();
    });
    
    // Check if the sentence is displayed
    expect(screen.getByText(mockSentence)).toBeInTheDocument();
    
    // Check if the DraggableSentence component is rendered with the correct words
    expect(screen.getByTestId('draggable-sentence')).toBeInTheDocument();
    expect(screen.getByTestId('words').textContent).toBe(mockWords.join(','));
  });

  it('displays an error message if loading fails', async () => {
    // Mock the fetch to return an error
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.reject(new Error('Network error'))
    );
    
    render(<Home />);
    
    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.queryByText('Loading sentence...')).not.toBeInTheDocument();
    });
    
    // Check if the error message is displayed
    expect(screen.getByText('Failed to load sentence. Please try again later.')).toBeInTheDocument();
  });
});