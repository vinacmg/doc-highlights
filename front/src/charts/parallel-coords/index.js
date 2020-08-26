import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class ParallelCoords extends Component {

  constructor(props) {
    super();

    this.state = {
      document: props.document,
      tfidfBoundary: props.tfidf,
      lsiBoundary: props.lsi,
      lsaTfidfBoundary: props.lsaTfidf,
      lsaBinary: props.lsaBinary,
      textSelected: props.textSelected,
    };
  }

  componentWillReceiveProps({document, tfidf, lsi, lsaTfidf, lsaBinary, textSelected}) {
    this.setState({
      document: document,
      tfidfBoundary: tfidf,
      lsiBoundary: lsi,
      lsaTfidfBoundary: lsaTfidf,
      lsaBinaryBoundary: lsaBinary,
      textSelected: textSelected,
    });
  }

  render() {
    const { document, tfidfBoundary, lsiBoundary, lsaTfidfBoundary, lsaBinaryBoundary, textSelected } = this.state;
    const tfidf = [];
    const lsi = [];
    const lsaBinary = [];
    const lsaTfidf = [];
    const len = document.length;
    const text = Array.from(document, (_, i) => i + 1) // gets an [0,1,..,len] array

    document.forEach(element => {
      tfidf.push(element['tfidf']);
      lsi.push(element['lsi']);
      lsaTfidf.push(element['lsaTfidf']);
      lsaBinary.push(element['lsaBinary']);
    });

    const tfidfConstraint = tfidfBoundary
    const lsiConstraint = lsiBoundary
    const lsaTfidfConstraint = lsaTfidfBoundary
    const lsaBinaryConstraint = lsaBinaryBoundary

    let dimensions = []

    if (textSelected < 0) {
      dimensions = [
        {
          range: [0, len],
          label: 'Sentences',
          values: text,
          // tickvals: [1,2,3,4],
          // ticktext: ['text 1','text 2','text 4','text 5']
        }, {
          range: [0, 1],
          constraintrange: [tfidfConstraint - 1e-3, 1],
          label: 'TF-IDF',
          values: tfidf,
        }, {    
          range: [0, 1],
          constraintrange: [lsiConstraint - 1e-3, 1],
          label: 'LSA',
          values: lsi,
          // tickvals: [1.5,3,4.5]
        }, {
          range: [0, 1],
          constraintrange: [lsaTfidfConstraint - 1e-3, 1],
          label: 'LSA (TF-IDF)',
          values: lsaTfidf,
        }, {
          range: [0, 1],
          constraintrange: [lsaBinaryConstraint - 1e-3, 1],
          label: 'LSA Binary',
          values: lsaBinary,
        },
      ]
    } else {
      dimensions = [
        {
          range: [0, len],
          constraintrange: [textSelected + 1, textSelected + 1 + 1e-1],
          label: 'Sentence',
          values: text,
        }, {
          range: [0, 1],
          label: 'TF-IDF',
          values: tfidf,
        }, {    
          range: [0, 1],
          label: 'LSA',
          values: lsi,
        }, {
          range: [0, 1],
          label: 'LSA (TF-IDF)',
          values: lsaTfidf,
        }, {
          range: [0, 1],
          label: 'LSA Binary',
          values: lsaBinary,
        },
      ]
    }

    const trace = {
      type: 'parcoords',
      line: {
        color: 'blue'
      },
      dimensions: dimensions,
    }

    return (
      <Plot
        data={[
          trace,
        ]}
        layout={{
          width: 1500,
          height: 170,
          margin: {
            l: 50,
            r: 50,
            b: 20,
            t: 50,
            pad: 0
          },
        }}
      />
    );
  }
}

export default ParallelCoords;