import React, { Component } from 'react';
import axios from 'axios';
import NavigationContainer from '../navigation/navigation-container';
import VotesItem from './votes-item';

export default class VotesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }
  
  getPintxosVotes() {
    axios.get('https://asuapretni.pythonanywhere.com/pintxos_votes')
    .then(response => {
      this.setState({
        data: response.data
      })
    console.log("Votes data", response);
  })
  .catch(error => {
    console.log(error);
  });
  }

  pintxoVotes() {
    return this.state.data.map(item => {
      console.log(item);
      return <VotesItem key={item.votes_id} item={item} />;
    })
  }

  componentDidMount(){
    this.getPintxosVotes();
  }


  render() {
    return (
      <div>
        <h2>Pintxo Votes</h2>
        <div>{this.pintxoVotes()}</div>
      </div>
    );
    }
  }