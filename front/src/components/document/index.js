import React, { Component } from 'react';
import './index.css';

const style = {
    yellow: {
        backgroundColor: '#FFFF00',
    },
    highlights: {

    }
};

class Document extends Component {
  render() {

    const document = [
        {
            text: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            isHighlight: false,
        },
        {
            text: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            isHighlight: true,
        },
        {
            text: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            isHighlight: true,
        },
        {
            text: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            isHighlight: false,
        },
    ]

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center mb-4">Highlighted</h5>
                <div className="card-text text-justify scrollable">
                    <p>
                        {
                            document.map((obj, index) => {
                                if (obj.isHighlight)
                                    return <span key={index} style={style.yellow}>{obj.text}</span>
                                else return <span key={index}>{obj.text}</span>
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