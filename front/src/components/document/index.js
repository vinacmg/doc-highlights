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
            document: props.document,
            tfidf: props.tfidf,
            lsi: props.lsi,
        };
    }

    componentWillReceiveProps({document, tfidf, lsi}) {
        this.setState({...this.state, document, tfidf, lsi})
    }

    clickText = (index) => {
        this.props.onSelectText(index);
    }

    render() {

        const { document, tfidf, lsi } = this.state;

        var min_tfidf = 999
        var max_tfidf = -1

        var min_lsi = 999
        var max_lsi = -999

        document.forEach(element => {
            if (element.tfidf < min_tfidf)
                min_tfidf = element.tfidf
            else if (element.tfidf > max_tfidf)
                max_tfidf = element.tfidf

            if (element.lsi < min_lsi)
                min_lsi = element.lsi
            else if (element.lsi > max_lsi)
                max_lsi = element.lsi
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
                                    if (obj.tfidf >= (min_tfidf + tfidf*(max_tfidf - min_tfidf)))
                                        stl = Object.assign(stl, style.yellow);
                                    if (obj.lsi >= (min_lsi + lsi*(max_lsi - min_lsi)))
                                        stl = Object.assign(stl, style.bold);
                                    return <span key={index} style={stl} onClick={() => this.clickText(index)}>{obj.text}</span>
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