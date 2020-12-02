import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details.js';
import Row from '../row/row.js'

import ErrorIndicator from '../error-indicator/error-indicator.js';
import ErrorBoundery from '../error-boundery/error-boundery.js';
import SwapService from '../../servises/swapi-services';

import './people-page.css';


class PeoplePage extends Component {

    swapiServices = new SwapService;

    state = {
        selectedItem: 5,
        hasError: false,
    };
        
      onItemSelected = (selectedItem) => {
        this.setState({ selectedItem });
      };
        
  render() {

    if(this.state.hasError){
        return <ErrorIndicator />
      }

    const itemList = (
      <ItemList 
      onItemSelected={this.onItemSelected}
      getData={this.swapiServices.getAllPeople}>
  
      {(i) => (
        `${i.name} (${i.birthYear})`
      )}
  
      </ItemList>);

    const itemDetails = (<ItemDetails itemId={this.state.selectedItem}/>);

    return (
        <ErrorBoundery>
          <Row left={itemList} rigth={itemDetails} />
        </ErrorBoundery>
      
    );
  }
}

export default PeoplePage;