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
        tfidf: 0.5,
        lsi: 0.5,
        textSelected: -999,
    };
  }

  componentDidMount() {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document: 'Coronavírus é uma família de vírus que causam infecções respiratórias. O novo agente do coronavírus foi descoberto em 31 de Dezembro de 2019 após casos registrados na China. Provoca a doença chamada de coronavírus (COVID-19). Os primeiros coronavírus humanos foram isolados pela primeira vez em 1937. No entanto, foi em 1965 que o vírus foi descrito como coronavírus, em decorrência do perfil na microscopia, parecendo uma coroa. A maioria das pessoas se infecta com os coronavírus comuns ao longo da vida, sendo as crianças pequenas mais propensas a se infectarem com o tipo mais comum do vírus. Os coronavírus mais comuns que infectam humanos são o alpha coronavírus 229E e NL63 e beta coronavírus OC43, HKU1…31 de Dezembro de 2019. O primeiro caso da pandemia pelo novo coronavírus, SARS-CoV2, foi identificado em Wuhan, na China, no dia 31 de dezembro do último ano. Desde então, os casos começaram a se espalhar rapidamente pelo mundo: primeiro pelo continente asiático, e depois por outros países. Em fevereiro, a transmissão da Covid-19, nome dado à doença causada pelo SARS-CoV2, no Irã e na Itália chamaram a atenção pelo crescimento rápido de novos casos e mortes, fazendo com que o Ministério da Saúde alterasse a definição de caso suspeito para incluir pacientes que estiveram em outros países. O primeiro caso no Brasil foi identificado em São Paulo. Em março, a Organização Mundial da Saúde (OMS) definiu o surto da doença como pandemia.'})
    };
    fetch('http://127.0.0.1:5000/highlights', request)
      .then(response => response.json())
      .then(data => this.setState({ document: data.resp }));
  }

  
  handle0 = (e) => {
    let scale = e.target.value / 100
    this.setState({tfidf:scale})
  }

  handle1 = (e) => {
    let scale = e.target.value / 100
    this.setState({lsi:scale})
  }

  handleSelection = (index) => {
    this.setState({textSelected:index})
    console.log(index)
  }

  render() {
    return (
        <div className="background">
            <div className="top">
              <ParallelCoords document={this.state.document} tfidf={this.state.tfidf} lsi={this.state.lsi} textSelected={this.state.textSelected}/>
            </div>
            <div className="menu align-items-center">
              <div className="mt-1 text-left">
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" className="ml-4" onChange={this.handle0}></input>
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" className="ml-3" onChange={this.handle1}></input>
              </div>
            </div>
            <div className="bottom">
              <LeftBar className="left-bar"/>
              <div className="doc">
                <Document document={this.state.document} tfidf={this.state.tfidf} lsi={this.state.lsi} onSelectText={this.handleSelection}/>
              </div>
            </div>
        </div>
    );
  }
}

export default Main;