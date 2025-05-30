from flask import Flask, jsonify, request
from flask_cors import CORS
import random

# Initialize Flask application
app = Flask(__name__)

# Enable CORS to allow requests from the Next.js frontend
CORS(app)

# The German sentence we'll be working with
SENTENCE = "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt."

@app.route('/api/sentence', methods=['GET'])
def get_sentence():
    """
    API endpoint to get the German sentence and its words.
    
    Returns:
        JSON: A JSON object containing the original sentence and a shuffled list of words.
    """
    # Split the sentence into words, removing punctuation for the word list
    words = SENTENCE.replace(',', '').replace('.', '').split()
    
    # Shuffle the words to provide a randomized starting point for the user
    shuffled_words = words.copy()
    random.shuffle(shuffled_words)
    
    return jsonify({
        'sentence': SENTENCE,
        'words': shuffled_words
    })

@app.route('/api/check', methods=['POST'])
def check_sentence():
    """
    API endpoint to check if the user's sentence is correct.
    
    Expects:
        JSON: A JSON object containing the user's arranged words.
    
    Returns:
        JSON: A JSON object indicating whether the sentence is correct.
    """
    # Get the user's arranged words from the request
    user_words = request.json.get('words', [])
    
    # Get the correct words from the sentence (without punctuation)
    correct_words = SENTENCE.replace(',', '').replace('.', '').split()
    
    # Check if the user's sentence matches the correct sentence
    is_correct = user_words == correct_words
    
    return jsonify({
        'correct': is_correct
    })

if __name__ == '__main__':
    # Run the Flask application on port 5001 (non-default)
    app.run(debug=True, port=5001)