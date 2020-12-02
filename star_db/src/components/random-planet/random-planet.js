import React, { Component } from 'react';

import './random-planet.css';

import '../../servises/swapi-services.js'
import SwapService from '../../servises/swapi-services.js';
import Spinner from '../spiner/spiner.js';
import ErrorIndicator from '../error-indicator/error-indicator.js';

export default class RandomPlanet extends Component {

  swapiServices = new SwapService();

  state = {
    planet:{},
    loading: true,
    error: true
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet,2500);
  }

  componentWillUnMount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false, error: false });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false 
    })

  }

  updatePlanet = () => {
    const id = Math.floor(Math.random()*25)+3;
    this.swapiServices
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  };

  render() {
   
    const {planet, loading, error} = this.state;

    const hasData = !(loading || error);

    const errMessage = error ? <ErrorIndicator />: null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={ planet } /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errMessage}
      </div>
    );
  }
}

const PlanetView = ( {planet} ) => {

  const {id, name, population, rotationPeriod, diameter} = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  ) 
}