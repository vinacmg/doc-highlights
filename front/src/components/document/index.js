import React, { Component } from 'react';
import './index.css';

const style = {
    yellow: {
        backgroundColor: '#FFFF00',
    },
    bold: {
        fontWeight: 'bold',
    },
};

class Document extends Component {

    constructor(props) {
        super();

        this.state = {
            document: [],
            tfidf: props.tfidf
        };
    }

    componentWillReceiveProps({tfidf}) {
        this.setState({...this.state, tfidf})
    }

    componentDidMount() {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ document: 'O primeiro caso da pandemia pelo novo coronavírus, SARS-CoV2, foi identificado em Wuhan, na China, no dia 31 de dezembro do último ano. Desde então, os casos começaram a se espalhar rapidamente pelo mundo: primeiro pelo continente asiático, e depois por outros países. Em fevereiro, a transmissão da Covid-19, nome dado à doença causada pelo SARS-CoV2, no Irã e na Itália chamaram a atenção pelo crescimento rápido de novos casos e mortes, fazendo com que o Ministério da Saúde alterasse a definição de caso suspeito para incluir pacientes que estiveram em outros países. No mesmo dia, o primeiro caso do Brasil foi identificado, em São Paulo. Em março, a Organização Mundial da Saúde (OMS) definiu o surto da doença como pandemia. Poucos dias depois, foi confirmada a primeira morte no Brasil, em São Paulo. No mesmo dia, dois pacientes que haviam testado positivo para coronavírus, do Rio de Janeiro, vieram a óbito, mas laudos das mortes ainda não foram divulgados. Os casos suspeitos, prováveis e confirmados devem ser notificados pelo profissional de saúde responsável pelo atendimento. Para os estados com número grande de casos, porém, a orientação do Ministério da Saúde é que o tratamento de casos graves é mais importante que a notificação, por isso pessoas com síndrome gripal que não estejam graves são orientadas a não buscar um posto de emergência, realizando apenas o isolamento social.' })
        };
        fetch('http://127.0.0.1:5000/highlights', request)
            .then(response => response.json())
            .then(data => this.setState({ document: data.resp }));
    }

    render() {

        const { document, tfidf } = this.state;

        var min = 999
        var max = -1

        document.forEach(element => {
            if (element.tfidf < min)
                min = element.tfidf
            else if (element.tfidf > max)
                max = element.tfidf
        });

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Highlighted</h5>
                    <div className="card-text text-justify scrollable">
                        <p>
                            {
                                document.map((obj, index) => {
                                    let stl = {}
                                    if (obj.tfidf >= (min + tfidf*(max - min)))
                                        stl = Object.assign(stl, style.yellow);
                                    if (obj.lsi > 0.6)
                                        stl = Object.assign(stl, style.bold);
                                    return <span key={index} style={stl}>{obj.text}</span>
                                })
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Document;