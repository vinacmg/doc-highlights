from flask import Flask, jsonify, request
from flask_cors import CORS
from nltk.tokenize import sent_tokenize
from tfidf import TfIdfSummarizer
from lsa import LSASummarizer

app = Flask(__name__)
CORS(app)

tfidf_summarizer = TfIdfSummarizer()
lsa_summarizer = LSASummarizer()

@app.route('/highlights', methods=['POST'])
def predict():
    document = request.json['document']

    sentences = sent_tokenize(document)

    tfidf_summarizer.fit(sentences)
    tfidf_scores = tfidf_summarizer.get_scores(sentences)

    lsa_summarizer.fit(sentences)
    lsa_scores = lsa_summarizer.get_scores(sentences)

    resp = []
    for i, (tfidf, lsa) in enumerate(zip(tfidf_scores, lsa_scores)):
        resp.append({
            'text': sentences[i],
            'tfidf': tfidf,
            'lsi': lsa,
        })

    out = {
        'resp': resp
    }

    return jsonify(out)

if __name__ == '__main__':
    app.run(debug=True)