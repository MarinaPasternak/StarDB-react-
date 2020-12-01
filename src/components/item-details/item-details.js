import React, { Component } from 'react';
import SwapService from '../../servises/swapi-services.js';
import Spinner from '../spiner/spiner.js';

import './item-details.css';

const Record = ({item, field, label }) => {
  return(
    <li className="list-group-item">
              <span className="term">{label}</span>
              <span>{item[field]}</span>
    </li>
  );
}
export {
  Record
};
export default class ItemDetails extends Component {
  
  swapiService = new SwapService();

  state = {
    item: null,
    loading: true,
    image: null,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading:false,
          image: getImageUrl(item)
        });
      });
  }

  render() {

    const { item, image,  loading } = this.state;

    if (!this.state.item) {
      return <span>Select a person from a list</span>;
    }

    if(loading){
      return <Spinner />;
    }

    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { id, name, gender,
              birthYear, eyeColor } = this.state.item;
         
    return (
      <div className="person-details card">
          <img className="item-image"
          src={image}
          alt="item"/>
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {item} );
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}