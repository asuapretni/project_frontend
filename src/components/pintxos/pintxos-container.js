import React, { Component } from 'react';
import axios from "axios";
import NavigationContainer from '../navigation/navigation-container';
import PintxoItem from './pintxo-item';


export default class PintxosContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

    this.getPintxosItems = this.getPintxosItems.bind(this);
  }

  getPintxosItems() {
    axios.get('https://asuapretni.pythonanywhere.com/pintxos')
    .then(response => {
      this.setState({
        data: response.data
      })
    console.log("Pintxos data", response);
  })
  .catch(error => {
    console.log(error);
  });
  }

  pintxoItems() {
    return this.state.data.map(item => {
      console.log(item);
      return <PintxoItem key={item.pintxo_id} item={item} />;
    })
  }

  componentDidMount(){
    this.getPintxosItems();
  }

  componentWillUnmount() {
    
  }

  render() {
    
    return (
      <div>
       
        <div className='pintxo-items-wrapper'>{this.pintxoItems()}</div>
        
      </div>
    );
  }
}
