import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableBody extends Component {
  render() {
    const {
      rowNames,
      sortedEvents,
      cells,
      renderEvents,
    } = this.props;
    return (
      <div className="table-body">
        {rowNames.map(placeName => (
          <div
            key={placeName}
            className="table-body-row"
          >
            <span className="table-row-name">{placeName}</span>
            {cells.map((c, ind) =>
              (<div
                key={`${c}${ind}`}
                className="table-cell"
              >
                {renderEvents(sortedEvents, ind, placeName.toLowerCase())}
              </div>))}
          </div>
        ))}
      </div>
    );
  }
}

TableBody.propTypes = {
  rowNames: PropTypes.array.isRequired,
  sortedEvents: PropTypes.object.isRequired,
  cells: PropTypes.array.isRequired,
  renderEvents: PropTypes.func.isRequired,
};

export default TableBody;
