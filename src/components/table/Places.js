import React, { Component } from 'react';

import {places} from '../../helpers/consts';

class TablePlaces extends Component {
  render() {
    return (
      <div className = "table-places">
        <div className = "table-places-item">
          <span>GLOBAL</span>
        </div>
        { places.map( item =>
          <div key = { item } className = "table-places-item">
            <span>{ item }</span>
          </div>
        )}
      </div>
    );
  }
}

export default TablePlaces;
