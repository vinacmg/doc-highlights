from flask import Flask, jsonify, request
from flask_cors import CORS
from nltk.tokenize import sent_tokenize
from tfidf import TfIdfSummarizer

app = Flask(__name__)
CORS(app)

summarizer = TfIdfSummarizer()

@app.route('/highlights', methods=['POST'])
def predict():
    document = request.json['document']

    sentences = sent_tokenize(document)
    summarizer.fit(sentences)
    tfidf_scores = summarizer.get_scores(sentences)

    resp = []
    for i, score in enumerate(tfidf_scores):
        resp.append({
            'text': sentences[i],
            'tfidf': score,
            'lsi': 0,
        })

    out = {
        'resp': resp
    }

    return jsonify(out)

if __name__ == '__main__':
    app.run(debug=True)