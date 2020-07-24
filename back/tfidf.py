import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

class TfIdfSummarizer(object):
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
    def fit(self, sentences):
        self.vectorizer.fit_transform(sentences)
    def get_scores(self, sentences):
        scores = np.sum(self.vectorizer.transform(sentences).toarray(), axis=1)
        return scores