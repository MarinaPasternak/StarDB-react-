import React, { Component } from 'react';
import SwapService from '../../servises/swapi-services.js';
import Spinner from '../spiner/spiner.js';

import { withData } from '../hoc-helpers/hoc-helpers.js'

import './item-list.css';

const ItemList = (props) => {

    const { data, onItemSelected, children: renderLabel } =  props;

    const items = data.map((item)=>{
      const {id} = item;
      const label = renderLabel(item);
   
    return (
      <li className="list-group-item"
            key={id}
            onClick={() => onItemSelected(id)}>
          {label}
      </li>
    );
    });
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
}

export default ItemList;