import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfClicks: 2
    }

    this.handleCounter = this.handleCounter.bind(this);
  }


  handleCounter() {
    this.state.numberOfClicks++;
    
    console.log('Nº Clicks', this.state.numberOfClicks);
    return this.state.numberOfClicks;
    
  } 

  render() {
    return (
      <div>
        <button 
         onClick={this.handleCounter}
        >
          Vote from comp
        </button>
      </div>
    );
    }
  }