from flask import Flask, render_template, jsonify, request
import random
import json

app = Flask(__name__)

# German sentences data
SENTENCES = [
    {
        "german": ["Obwohl", "es", "regnete,", "gingen", "wir", "spazieren."],
        "english": "Although it was raining, we went for a walk.",
        "translation": "Obwohl es regnete, gingen wir spazieren."
    },
    {
        "german": ["Der", "Zug", "hatte", "zwei", "Stunden", "Verspätung."],
        "english": "The train was two hours late.",
        "translation": "Der Zug hatte zwei Stunden Verspätung."
    },
    {
        "german": ["Nachdem", "ich", "gegessen", "hatte,", "fühlte", "ich", "mich", "besser."],
        "english": "After I had eaten, I felt better.",
        "translation": "Nachdem ich gegessen hatte, fühlte ich mich besser."
    },
    {
        "german": ["Sie", "studiert", "Medizin", "an", "der", "Universität", "München."],
        "english": "She studies medicine at the University of Munich.",
        "translation": "Sie studiert Medizin an der Universität München."
    },
    {
        "german": ["Wegen", "des", "schlechten", "Wetters", "blieben", "wir", "zu", "Hause."],
        "english": "Because of the bad weather, we stayed at home.",
        "translation": "Wegen des schlechten Wetters blieben wir zu Hause."
    },
    {
        "german": ["Ich", "hätte", "gerne", "einen", "Kaffee", "mit", "Milch."],
        "english": "I would like a coffee with milk.",
        "translation": "Ich hätte gerne einen Kaffee mit Milch."
    },
    {
        "german": ["Falls", "du", "Zeit", "hast,", "können", "wir", "ins", "Kino", "gehen."],
        "english": "If you have time, we can go to the cinema.",
        "translation": "Falls du Zeit hast, können wir ins Kino gehen."
    },
    {
        "german": ["Der", "Arzt", "empfahl", "mir,", "mehr", "Sport", "zu", "treiben."],
        "english": "The doctor recommended that I do more sports.",
        "translation": "Der Arzt empfahl mir, mehr Sport zu treiben."
    },
    {
        "german": ["Bevor", "wir", "das", "Haus", "verließen,", "schlossen", "wir", "alle", "Fenster."],
        "english": "Before we left the house, we closed all windows.",
        "translation": "Bevor wir das Haus verließen, schlossen wir alle Fenster."
    },
    {
        "german": ["Während", "der", "Ferien", "besuchten", "wir", "unsere", "Großeltern."],
        "english": "During the holidays, we visited our grandparents.",
        "translation": "Während der Ferien besuchten wir unsere Großeltern."
    },
    {
        "german": ["Trotz", "der", "Schwierigkeiten", "gab", "er", "nicht", "auf."],
        "english": "Despite the difficulties, he didn't give up.",
        "translation": "Trotz der Schwierigkeiten gab er nicht auf."
    },
    {
        "german": ["Die", "Kinder", "spielten", "im", "Garten,", "während", "es", "schneite."],
        "english": "The children played in the garden while it was snowing.",
        "translation": "Die Kinder spielten im Garten, während es schneite."
    },
    {
        "german": ["Um", "gesund", "zu", "bleiben,", "esse", "ich", "viel", "Gemüse."],
        "english": "To stay healthy, I eat a lot of vegetables.",
        "translation": "Um gesund zu bleiben, esse ich viel Gemüse."
    },
    {
        "german": ["Seit", "drei", "Jahren", "lerne", "ich", "Deutsch", "in", "dieser", "Schule."],
        "english": "I have been learning German at this school for three years.",
        "translation": "Seit drei Jahren lerne ich Deutsch in dieser Schule."
    },
    {
        "german": ["Je", "mehr", "ich", "übe,", "desto", "besser", "wird", "mein", "Deutsch."],
        "english": "The more I practice, the better my German becomes.",
        "translation": "Je mehr ich übe, desto besser wird mein Deutsch."
    },
    {
        "german": ["Anstatt", "fernzusehen,", "sollten", "wir", "lieber", "lesen."],
        "english": "Instead of watching TV, we should rather read.",
        "translation": "Anstatt fernzusehen, sollten wir lieber lesen."
    },
    {
        "german": ["Sowohl", "meine", "Schwester", "als", "auch", "ich", "mögen", "klassische", "Musik."],
        "english": "Both my sister and I like classical music.",
        "translation": "Sowohl meine Schwester als auch ich mögen klassische Musik."
    },
    {
        "german": ["Damit", "wir", "pünktlich", "ankommen,", "sollten", "wir", "früher", "losfahren."],
        "english": "So that we arrive on time, we should leave earlier.",
        "translation": "Damit wir pünktlich ankommen, sollten wir früher losfahren."
    },
    {
        "german": ["Außerdem", "müssen", "wir", "noch", "Lebensmittel", "einkaufen."],
        "english": "Additionally, we still need to buy groceries.",
        "translation": "Außerdem müssen wir noch Lebensmittel einkaufen."
    },
    {
        "german": ["Ohne", "deine", "Hilfe", "hätte", "ich", "es", "nicht", "geschafft."],
        "english": "Without your help, I wouldn't have made it.",
        "translation": "Ohne deine Hilfe hätte ich es nicht geschafft."
    }
]


@app.route('/')
def index():
    """Main page route"""
    return render_template('index.html')


@app.route('/api/sentence/<int:sentence_id>')
def get_sentence(sentence_id):
    """Get a specific sentence by ID"""
    if 0 <= sentence_id < len(SENTENCES):
        sentence = SENTENCES[sentence_id].copy()
        # Shuffle the words for the game
        sentence['shuffled_words'] = sentence['german'].copy()
        random.shuffle(sentence['shuffled_words'])
        return jsonify(sentence)
    return jsonify({'error': 'Sentence not found'}), 404


@app.route('/api/check', methods=['POST'])
def check_sentence():
    """Check if the submitted sentence is correct"""
    data = request.get_json()
    sentence_id = data.get('sentence_id')
    user_words = data.get('user_words', [])

    if 0 <= sentence_id < len(SENTENCES):
        correct_words = SENTENCES[sentence_id]['german']
        is_correct = user_words == correct_words

        return jsonify({
            'correct': is_correct,
            'correct_sentence': SENTENCES[sentence_id]['translation'],
            'english_translation': SENTENCES[sentence_id]['english']
        })

    return jsonify({'error': 'Invalid sentence ID'}), 400


@app.route('/api/total_sentences')
def get_total_sentences():
    """Get the total number of sentences"""
    return jsonify({'total': len(SENTENCES)})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)


