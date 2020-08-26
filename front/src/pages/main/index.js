import React, { Component } from 'react';
import Document from '../../components/document';
import LeftBar from '../../components/left-bar';
import RightBar from '../../components/right-bar';
import ParallelCoords from '../../charts/parallel-coords';
import './index.css';


class Main extends Component {

  constructor(props) {
    super()
    this.state = {
        document: [],
        tfidf: 0.5,
        lsi: 0.5,
        lsaTfidf: 0.5,
        lsaBinary: 0.5,
        textSelected: -999,
        file: '',
    };
  }
  
  handle0 = (scale) => {
    this.setState({tfidf:scale})
  }

  handle1 = (scale) => {
    this.setState({lsi:scale})
  }

  handleSelection = (index) => {
    this.setState({textSelected:index})
  }

  handleFile = (file) => {
    this.setState({file:file})
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document: file})
    };
    fetch('http://127.0.0.1:5000/highlights', request)
      .then(response => response.json())
      .then(data => this.setState({ document: data.resp }));
  }

  render() {
    return (
        <div className="background">
            <div className="top">
              <ParallelCoords 
                document={this.state.document} 
                tfidf={this.state.tfidf} 
                lsi={this.state.lsi}
                lsaTfidf={this.state.lsaTfidf}
                lsaBinary={this.state.lsaBinary}
                textSelected={this.state.textSelected}
              />
            </div>
            <div className="bottom">
              <div className="left-bar"><LeftBar onSelectFile={this.handleFile}/></div>
              <div className="doc">
                <Document file={this.state.file} document={this.state.document} tfidf={this.state.tfidf} lsi={this.state.lsi} onSelectText={this.handleSelection}/>
              </div>
              <div className="right-bar">
                <RightBar tfidfScale={this.handle0} lsaScale={this.handle1} document={this.state.document}  tfidf={this.state.tfidf} lsi={this.state.lsi} textSelected={this.state.textSelected}/>
              </div>
            </div>
        </div>
    );
  }
}

export default Main;