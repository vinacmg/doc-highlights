import React, { Component } from 'react';
import './index.css';

class LeftBar extends Component {
  render() {
    return (
        <div className="card left-bar">
            <div className="card-body">
            <div className="card-text text-justify scrollable">
                <ul id="myUL">
                <li><span className="caret">Beverages</span>
                    <ul className="nested">
                    <li>Water</li>
                    <li>Coffee</li>
                    <li><span className="caret">Tea</span>
                        <ul className="nested">
                        <li>Black Tea</li>
                        <li>White Tea</li>
                        <li><span className="caret">Green Tea</span>
                            <ul className="nested">
                            <li>Sencha</li>
                            <li>Gyokuro</li>
                            <li>Matcha</li>
                            <li>Pi Lo Chun</li>
                            </ul>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </li>
                </ul>
            </div>
            </div>
        </div>
    );
  }
}

export default LeftBar;