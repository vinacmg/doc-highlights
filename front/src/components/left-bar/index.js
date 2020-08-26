import React, { Component } from 'react';
import './index.css';

class LeftBar extends Component {
    constructor(props) {
        super()
        this.state = {
            files: [],
        }
    }

    componentDidMount() {
        const request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://127.0.0.1:5000/files', request)
            .then(response => response.json())
            .then(data => this.setState({ files: data.files }));
    }

    clickFile = (file) => {
        this.props.onSelectFile(file);
    }
    
    render() {
        const { files } = this.state;

        return (
            <div className="card">
                <div className="card-body">
                <div className="card-text text-justify scrollable">
                    <div style={{fontSize:'15px'}}>
                        {
                            files.map((file, index) => {
                                return <div key={index} style={{fontSize: '15px'}} onClick={() => this.clickFile(file)}>{file}</div>
                            })
                        }
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default LeftBar;