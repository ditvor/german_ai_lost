import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * Props for the DraggableWord component
 */
interface DraggableWordProps {
  id: string;
}

/**
 * A component that represents a draggable word in the sentence.
 * Uses dnd-kit's useSortable hook to make the word draggable.
 * 
 * @param id - The unique identifier for the word (the word itself)
 */
export function DraggableWord({ id }: DraggableWordProps) {
  // Use the useSortable hook to make the word draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Apply the transform and transition styles
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Apply different styles when the word is being dragged
    backgroundColor: isDragging ? '#e2e8f0' : 'white',
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="px-3 py-2 bg-white border border-gray-300 rounded-md cursor-grab shadow-sm hover:shadow-md transition-shadow"
    >
      {id}
    </div>
  );
}