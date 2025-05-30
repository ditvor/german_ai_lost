# German Learning App

A web application for learning German through sentence building exercises. The app allows users to arrange words to form correct German sentences using drag and drop functionality.

## Project Structure

This is a hybrid application with:
- **Frontend**: Next.js with TypeScript and dnd-kit for drag and drop functionality
- **Backend**: Flask API serving sentence data and checking user submissions

## Features

- Drag and drop interface for arranging words
- Real-time feedback on sentence correctness
- Responsive design for various screen sizes
- Accessibility support through keyboard navigation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd german-learning-app
   ```

2. Set up the backend:
   ```
   # Create and activate a virtual environment (optional but recommended)
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   # Install dependencies
   pip install flask flask-cors
   ```

3. Set up the frontend:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   # From the project root
   python app.py
   ```
   The Flask server will run on port 5001.

2. Start the frontend development server:
   ```
   # From the frontend directory
   npm run dev
   ```
   The Next.js server will run on port 3001.

3. Open your browser and navigate to `http://localhost:3001`

## Testing

### Backend Tests

Run the backend tests with:
```
python test_app.py
```

### Frontend Tests

Run the frontend tests with:
```
cd frontend
npm test
```

## Implementation Details

### Backend (Flask)

The Flask backend provides two main API endpoints:
- `GET /api/sentence`: Returns the original German sentence and a shuffled list of words
- `POST /api/check`: Checks if the user's arranged words match the correct sentence

### Frontend (Next.js)

The frontend is built with Next.js and uses:
- TypeScript for type safety
- dnd-kit for drag and drop functionality
- Tailwind CSS for styling

Key components:
- `pages/index.tsx`: Main page component that fetches data and manages state
- `components/DraggableSentence.tsx`: Component that provides the drag and drop interface
- `components/DraggableWord.tsx`: Component that represents each draggable word

## Development Approach

This project follows a test-driven development (TDD) approach:
1. Write tests for the desired functionality
2. Implement the functionality to pass the tests
3. Refactor the code while ensuring tests continue to pass

## License

[MIT License](LICENSE)