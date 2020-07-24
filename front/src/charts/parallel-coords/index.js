import React, { Component } from 'react';
import Plot from 'react-plotly.js';

const trace = {
  type: 'parcoords',
  line: {
    color: 'blue'
  },
  
  dimensions: [{
    range: [1, 5],
    constraintrange: [1, 2],
    label: 'C',
    values: [2,4],
    tickvals: [1,2,4,5],
    ticktext: ['text 1','text 2','text 4','text 5']
  }, {
    range: [1, 5],
    label: 'A',
    values: [1,4]
  }, {    
    range: [1,5],
    label: 'B',
    values: [3,1.5],
    tickvals: [1.5,3,4.5]
  }, {
    range: [1, 5],
    label: 'D',
    values: [4,2]
  }]
};

class ParallelCoords extends Component {
  render() {
    return (
      <Plot
        data={[
          trace,
        ]}
        layout={{
          width: 1500,
          height: 150,
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