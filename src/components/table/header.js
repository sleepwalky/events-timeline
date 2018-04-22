import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHeader extends Component {
  // splitDate = date => {
  //   return date.split(' ').join(); // add some library for parsing????????
  // };

  render() {
    return (
      <div className="table-header">
        {this.props.view.map(item => (
          <div key={item} className="table-header-item">
            {item}
          </div>
        ))}
      </div>
    );
  }
}

TableHeader.propTypes = {
  view: PropTypes.array.isRequired,
};

export default TableHeader;
