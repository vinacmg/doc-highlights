from flask import Flask, jsonify, request
from flask_cors import CORS
from nltk.tokenize import sent_tokenize
from tfidf import TfIdfSummarizer
from lsa import LSASummarizer
from lsa_tfidf import LSATfidfSummarizer
from lsa_binary import LSABinarySummarizer
from files import Files

app = Flask(__name__)
CORS(app)

tfidf_summarizer = TfIdfSummarizer()
lsa_summarizer = LSASummarizer()
lsa_tfidf_summarizer = LSATfidfSummarizer()
lsa_binary_summarizer = LSABinarySummarizer()
documents = Files()

@app.route('/files', methods=['GET'])
def files_directory():
    d = documents.directory
    return jsonify({'files': d})

@app.route('/highlights', methods=['POST'])
def predict():
    doc = request.json['document']
    document = documents.get(doc)
    
    sentences = sent_tokenize(document)

    tfidf_summarizer.fit(sentences)
    tfidf_scores = tfidf_summarizer.get_scores(sentences)

    lsa_summarizer.fit(sentences)
    lsa_scores = lsa_summarizer.get_scores(sentences)

    lsa_tfidf_summarizer.fit(sentences)
    lsa_tfidf_scores = lsa_tfidf_summarizer.get_scores(sentences)

    lsa_binary_summarizer.fit(sentences)
    lsa_binary_scores = lsa_binary_summarizer.get_scores(sentences)

    resp = []
    for i, (_tfidf, _lsa, _lsa_tfidf, _lsa_binary) in enumerate(zip(tfidf_scores, lsa_scores, lsa_tfidf_scores, lsa_binary_scores)):
        resp.append({
            'text': sentences[i],
            'tfidf': _tfidf,
            'lsi': _lsa,
            'lsaTfidf': _lsa_tfidf,
            'lsaBinary': _lsa_binary
        })

    out = {
        'resp': resp
    }

    return jsonify(out)

if __name__ == '__main__':
    app.run(debug=True)