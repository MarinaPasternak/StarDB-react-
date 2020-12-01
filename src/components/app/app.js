import React, { Component } from 'react';

import Header from '../header/header.js';
import RandomPlanet from '../random-planet/random-planet.js';
import SwapService from '../../servises/swapi-services';
import Row from '../row/row.js';

import './app.css';
import ItemDetails, {Record} from '../item-details/item-details.js';
import ErrorBoundery from '../error-boundery/error-boundery.js';

export default class App extends Component{

  swapiServices = new SwapService;

  render() {

      const { getPerson,
              getStarship,
              getPersonImage,
              getStarshipImage } = this.swapiServices;
  
      const personDetails = (
        <ItemDetails
          itemId={11}
          getData={getPerson}
          getImageUrl={getPersonImage} >
          <Record field = "gender" label="Gender" />
          <Record field = "eyeColor" label="Eye Color" />
        </ItemDetails>
      );
  
      const starshipDetails = (
        <ItemDetails
          itemId={5}
          getData={getStarship}
          getImageUrl={getStarshipImage}>
          <Record field="model" label="Model" />
          <Record field="length" label="Length" />
          <Record field="cost" label="Cost" />
        </ItemDetails>
  
      );
  
      return (
        <ErrorBoundery>
          <div className="stardb-app">
            <Header />
  
            <Row
              left={personDetails}
              right={starshipDetails} />
          </div>
        </ErrorBoundery>
      );
   }
}
