import unittest
import json
from app import app

class TestApp(unittest.TestCase):
    """
    Test cases for the Flask backend API.
    """

    def setUp(self):
        """
        Set up the test client before each test.
        """
        self.app = app.test_client()
        self.app.testing = True

    def test_get_sentence(self):
        """
        Test the /api/sentence endpoint to ensure it returns the correct sentence.
        """
        response = self.app.get('/api/sentence')
        data = json.loads(response.data)

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check if the response contains the expected sentence
        self.assertIn('sentence', data)
        self.assertEqual(
            data['sentence'], 
            "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt."
        )

        # Check if the response contains the words array
        self.assertIn('words', data)
        self.assertTrue(isinstance(data['words'], list))

        # Check if all words from the sentence are in the words array
        expected_words = "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.".replace(',', '').replace('.', '').split()
        for word in expected_words:
            self.assertIn(word, data['words'])

    def test_check_sentence(self):
        """
        Test the /api/check endpoint to verify if a sentence is correct.
        """
        # Test with correct sentence
        correct_data = {
            'words': "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.".replace(',', '').replace('.', '').split()
        }
        response = self.app.post('/api/check', 
                                json=correct_data,
                                content_type='application/json')
        data = json.loads(response.data)

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check if the response indicates the sentence is correct
        self.assertIn('correct', data)
        self.assertTrue(data['correct'])

        # Test with incorrect sentence
        incorrect_data = {
            'words': ["Gregor", "Als", "Samsa", "eines", "Morgens"]  # Wrong order
        }
        response = self.app.post('/api/check', 
                                json=incorrect_data,
                                content_type='application/json')
        data = json.loads(response.data)

        # Check if the response indicates the sentence is incorrect
        self.assertIn('correct', data)
        self.assertFalse(data['correct'])

if __name__ == '__main__':
    unittest.main()
