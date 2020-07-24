import React, { Component } from 'react';
import Document from '../../components/document';
import LeftBar from '../../components/left-bar';
import ParallelCoords from '../../charts/parallel-coords';
import './index.css';


class Main extends Component {

  constructor(props) {
    super()
    this.state = {
        document: [],
        tfidf: 0.5
    };
  }
  
  handle = (e) => {
    let scale = e.target.value / 100
    this.setState({tfidf:scale})
  }

  render() {
    return (
        <div className="background">
            <div className="top">
              <ParallelCoords/>
            </div>
            <div className="menu align-items-center">
              <div className="mt-1 text-left">
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" className="ml-4" onChange={this.handle}></input>
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" className="ml-3"></input>
              </div>
            </div>
            <div className="bottom">
              <LeftBar className="left-bar"/>
              <div className="doc"><Document tfidf={this.state.tfidf}/></div>
            </div>
        </div>
    );
  }
}

export default Main;