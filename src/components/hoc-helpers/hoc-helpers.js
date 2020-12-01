import React, { Component } from 'react';
import SwapService from '../../servises/swapi-services.js';
import Spinner from '../spiner/spiner.js';

const withData = (View, getData) => {
    return class extends Component{
      state = {
        data: null
      };
    
      componentDidMount() {
  
        getData()
          .then((data) => {
            this.setState({
              data
            });
          });
      }
      render() 
      {const {data} = this.state;
  
      if(!data){
          return <Spinner />
  
      }
        return <View {...this.props} data={data}/>
      }
    }
  };

  export default withData;