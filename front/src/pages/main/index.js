import React, { Component } from 'react';
import Document from '../../components/document';
import LeftBar from '../../components/left-bar';
import ParallelCoords from '../../charts/parallel-coords';
import './index.css';


class Main extends Component {
  render() {
    return (
        <div className="background">
            <div className="top">
              <ParallelCoords/>
            </div>
            <div className="bottom">
              <LeftBar className="left-bar"/>
              <Document className="document"/>
            </div>
        </div>
    );
  }
}

export default Main;