import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHeader extends Component {
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
