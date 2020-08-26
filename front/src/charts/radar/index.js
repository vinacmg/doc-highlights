import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class Radar extends Component {

  constructor(props) {
    super();

    this.state = {
      document: props.document,
      textSelected: props.textSelected,
    };
  }

  componentWillReceiveProps({document, textSelected}) {
    this.setState({...this.state, document, textSelected})
  }


  render() {
    const { document, textSelected } = this.state;
    let values = [];

    if (textSelected < 0) {
      return('')
    } else {
      let doc = document[textSelected]

      values = [
        doc.lsi,
        doc.lsaTfidf,
        doc.tfidf,
        doc.lsaBinary,
        doc.lsi,
      ]
    }

    const data = [{
        type: 'scatterpolar',
        r: values,
        theta: ['LSA', 'LSA (TF-IDF)', 'TF-IDF', 'LSA (Binary)', 'LSA'],
        fill: 'toself'
    }]

    return (
      <Plot
        data={data}
        layout={{
            polar: {
                radialaxis: {
                visible: true,
                range: [0, 1]
                }
            },
            width: 280,
            height: 210,
            margin: {
              l: 50,
              r: 50,
              b: 30,
              t: 30,
              pad: 0
            },
            showlegend: false
        }}
        config={{displayModeBar: false}}
      />
    );
  }
}

export default Radar;