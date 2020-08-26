import os


class Files(object):
    def __init__(self):
        self.path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'documents/')

    @property
    def directory(self):
        return os.listdir(self.path)

    def get(self, file):
        document = ''
        with open(os.path.join(self.path, file)) as f:
            for line in f:
                document = str(line) + ' '
        return document
