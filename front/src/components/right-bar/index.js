import React, { Component } from 'react';
import Radar from '../../charts/radar';
import './index.css';

class RightBar extends Component {
  constructor(props) {
    super();

    this.state = {
      document: props.document,
      textSelected: props.textSelected,
      hl0: {
        model: 'tfidf',
        borderColor: '#FFFF00',
      },
      hl1: {
        model: 'lsi',
        borderColor: 'black',
      }
    };
  }
  
  componentWillReceiveProps({document, textSelected}) {
    this.setState({...this.state, document, textSelected})
  }

  handleTFIDF = (e) => {
    let scale = e.target.value / 100
    this.props.tfidfScale(scale);
  }

  handleLSA = (e) => {
    let scale = e.target.value / 100
    this.props.lsaScale(scale);
  }

  select = (model) => {
    let hl0 = {borderColor: '#FFFF00'}
    let hl1 = {borderColor: 'black'}
  
    if (!this.state.hl0) {
      hl0['model'] = model
      this.setState({...this.state, hl0})
      this.forceUpdate()
    } else {
      if (!this.state.hl1) {
        hl1['model'] = model
        this.setState({...this.state, hl1})
        this.forceUpdate()
      }
    }
  }

  render() {
    const { document, textSelected, hl0, hl1 } = this.state;
    let sentence = ''
    let tfidfStyle = {borderColor: null}
    let lsiStyle = {borderColor: null}
    let lsaTfidfStyle = {borderColor: null}
    let lsaOneStyle = {borderColor: null}

    if (textSelected < 0) {
      sentence = ''
    } else {
      sentence = document[textSelected].text
    }
    
    if (hl0) {
      switch (hl0.model) {
        case 'tfidf':
          tfidfStyle.borderColor = hl0.borderColor;
          break;
        case 'lsi':
          lsiStyle.borderColor = hl0.borderColor;
          break;
        case 'lsaTfidf':
          lsaTfidfStyle.borderColor = hl0.borderColor;
          break;
        case 'lsaOne':
          lsaOneStyle.borderColor = hl0.borderColor;
          break;
        default:
          break
      }
    }

    if (hl1) {
      switch (hl1.model) {
        case 'tfidf':
          tfidfStyle.borderColor = hl1.borderColor;
          break;
        case 'lsi':
          lsiStyle.borderColor = hl1.borderColor;
          break;
        case 'lsaTfidf':
          lsaTfidfStyle.borderColor = hl1.borderColor;
          break;
        case 'lsaOne':
          lsaOneStyle.borderColor = hl1.borderColor;
          break;
        default:
          break
      }
    }

    return (
      <div className="scrollable">
          <div className="card" style={{tfidfStyle}}>
            <div className="card-body p-1">
            <div className="card-text">
                <p className="m-0"  onClick={() => this.select('tfidf')}>TF-IDF</p>
                0.0
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" className="mx-2" onChange={this.handleTFIDF}></input>
                1.0
            </div>
            </div>
        </div>
        <div className="card" style={lsiStyle}>
            <div className="card-body p-1">
            <div className="card-text">
                <p className="m-0" onClick={() => this.select('lsi')}>LSA</p>
                0.0
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" className="mx-2" onChange={this.handleLSA}></input>
                1.0
            </div>
            </div>
        </div>
        <div className="card" style={lsaTfidfStyle}>
            <div className="card-body p-1">
            <div className="card-text">
                <p className="m-0" onClick={() => this.select('lsaTfidf')}>LSA (TF-IDF)</p>
                0.0
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" className="mx-2"></input>
                1.0
            </div>
            </div>
        </div>
        <div className="card" style={lsaOneStyle}>
            <div className="card-body p-1">
            <div className="card-text">
                <p className="m-0" onClick={() => this.select('lsaOne')}>LSA (Binary)</p>
                0.0
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" className="mx-2"></input>
                1.0
            </div>
            </div>
        </div>
        <div className="mt-3"><Radar document={this.state.document} textSelected={this.state.textSelected}/></div>
        <p className="font-italic mt-3 mx-3" style={{fontSize:"14px"}}>{sentence}</p>
      </div>
    );
  }
}

export default RightBar;