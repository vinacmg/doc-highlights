import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class ParallelCoords extends Component {

  constructor(props) {
    super();

    this.state = {
      document: props.document,
      tfidfBoundary: props.tfidf,
      lsiBoundary: props.lsi,
      textSelected: props.textSelected,
    };
  }

  componentWillReceiveProps({document, tfidf, lsi, textSelected}) {
    this.setState({
      document: document,
      tfidfBoundary: tfidf,
      lsiBoundary: lsi,
      textSelected: textSelected,
    });
  }

  render() {
    const { document, tfidfBoundary, lsiBoundary, textSelected } = this.state;
    const tfidf = [];
    const lsi = [];
    const len = document.length;
    const text = Array.from(document, (_, i) => i + 1) // gets an [0,1,..,len] array

    document.forEach(element => {
      tfidf.push(element['tfidf']);
      lsi.push(element['lsi']);
    });

    const tfidfMin = Math.min(...tfidf)
    const tfidfMax = Math.max(...tfidf)
    const tfidfConstraint = tfidfBoundary*(tfidfMax - tfidfMin) + tfidfMin

    const lsiMin = Math.min(...lsi)
    const lsiMax = Math.max(...lsi)
    const lsiConstraint = lsiBoundary*(lsiMax - lsiMin) + lsiMin

    let dimensions = []

    if (textSelected < 0) {
      dimensions = [
        {
          range: [0, len],
          label: 'Sentence',
          values: text,
          // tickvals: [1,2,3,4],
          // ticktext: ['text 1','text 2','text 4','text 5']
        }, {
          range: [Math.floor(tfidfMin), Math.ceil(tfidfMax)],
          constraintrange: [tfidfConstraint, Math.ceil(tfidfMax)],
          label: 'TF-IDF',
          values: tfidf,
        }, {    
          range: [Math.floor(Math.min(...lsi)), Math.ceil(Math.max(...lsi))],
          constraintrange: [lsiConstraint, Math.ceil(lsiMax)],
          label: 'LSA',
          values: lsi,
          // tickvals: [1.5,3,4.5]
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
          range: [Math.floor(tfidfMin), Math.ceil(tfidfMax)],
          label: 'TF-IDF',
          values: tfidf,
        }, {    
          range: [Math.floor(Math.min(...lsi)), Math.ceil(Math.max(...lsi))],
          label: 'LSA',
          values: lsi,
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