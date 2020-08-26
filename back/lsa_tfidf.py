import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from gensim.models import LsiModel
from gensim.matutils import corpus2dense

class LSATfidfSummarizer(object):
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
    def fit(self, sentences):
        X = self.vectorizer.fit_transform(sentences)
        doc_term_matrix = X.transpose()
        id2word = dict(enumerate(self.vectorizer.get_feature_names()))
        self.lsa_model = LsiModel(doc_term_matrix, num_topics=15, id2word=id2word)
    def get_scores(self, sentences):
        X = self.vectorizer.transform(sentences).toarray()

        x = []
        for row in X.tolist():
            x.append([(i, n) for i, n in enumerate(row) if (n > 0)])

        V = corpus2dense(self.lsa_model[x], len(self.lsa_model.projection.s)).T / self.lsa_model.projection.s
        
        dim = int(V.shape[1] / 2) # V.shape[1] é igual a num_topics efetivamente encontrados
        sentences_length = np.sum(V[:,:dim], axis=1)

        minimum = sentences_length.min()
        maximum = sentences_length.max()
        scores = (sentences_length - minimum)/(maximum - minimum)

        return scores