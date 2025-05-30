import { render, screen, fireEvent } from '@testing-library/react';
import DraggableSentence from '../DraggableSentence';

// Mock the DraggableWord component to simplify testing
jest.mock('../DraggableWord', () => ({
  DraggableWord: ({ id }: { id: string }) => <div data-testid={`word-${id}`}>{id}</div>,
}));

describe('DraggableSentence', () => {
  const mockWords = ['word1', 'word2', 'word3'];
  const mockOnSentenceCheck = jest.fn();

  beforeEach(() => {
    // Reset the mock function before each test
    mockOnSentenceCheck.mockReset();
  });

  it('renders all words', () => {
    render(
      <DraggableSentence 
        words={mockWords} 
        onSentenceCheck={mockOnSentenceCheck} 
      />
    );

    // Check if all words are rendered
    mockWords.forEach(word => {
      expect(screen.getByTestId(`word-${word}`)).toBeInTheDocument();
    });
  });

  it('calls onSentenceCheck when the check button is clicked', () => {
    render(
      <DraggableSentence 
        words={mockWords} 
        onSentenceCheck={mockOnSentenceCheck} 
      />
    );

    // Find and click the check button
    const checkButton = screen.getByText('Check Sentence');
    fireEvent.click(checkButton);

    // Check if the onSentenceCheck callback was called with the correct words
    expect(mockOnSentenceCheck).toHaveBeenCalledTimes(1);
    expect(mockOnSentenceCheck).toHaveBeenCalledWith(mockWords);
  });
});