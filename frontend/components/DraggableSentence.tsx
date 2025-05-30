import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DraggableWord } from './DraggableWord';

/**
 * Props for the DraggableSentence component
 */
interface DraggableSentenceProps {
  words: string[];
  onSentenceCheck: (arrangedWords: string[]) => void;
}

/**
 * A component that provides a drag and drop interface for arranging words into a sentence.
 * Uses dnd-kit for drag and drop functionality.
 * 
 * @param words - The words to be arranged
 * @param onSentenceCheck - Callback function to check if the sentence is correct
 */
export default function DraggableSentence({ words, onSentenceCheck }: DraggableSentenceProps) {
  // State to track the current arrangement of words
  const [items, setItems] = useState<string[]>(words);

  // Set up sensors for drag and drop
  const sensors = useSensors(
    // Pointer sensor for mouse/touch interactions
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance before a drag starts
      },
    }),
    // Keyboard sensor for accessibility
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /**
   * Handle the end of a drag event
   * @param event - The drag end event
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // If the item was dropped in a valid location
    if (over && active.id !== over.id) {
      setItems((items) => {
        // Find the indices of the dragged item and the drop target
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        
        // Return a new array with the items reordered
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  /**
   * Check if the current arrangement is correct
   */
  const checkSentence = () => {
    onSentenceCheck(items);
  };

  return (
    <div className="flex flex-col items-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-wrap justify-center gap-2 p-4 bg-white rounded-lg shadow-md mb-4">
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {items.map((word) => (
              <DraggableWord key={word} id={word} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
      
      <button
        onClick={checkSentence}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Check Sentence
      </button>
    </div>
  );
}