import React, { Component } from 'react';

export default class VotesItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { pintxo_name, votes_number} = this.props.item
    return (
      <div className="container-votes">
        <div className="skill-box">
          
            <div className="skill-bar">
              <span className="skill-per"
               style={{width: `${votes_number*0.1}vw`}}
               >
                <span className="tooltip">{votes_number}</span>
              </span>
            </div>
            <span className="title">{pintxo_name}</span>
        </div>
      </div>
    );
    }
  }