import React, { Component } from 'react';

 class TableHeader extends Component {
  render() {
    return (
      <div className="table-header">
        { this.props.view.map((item, ind) =>
            <div key = { ind } className = "table-header-item">
              {item}
            </div>
        )}
      </div>
    );
  }
}

export default TableHeader;
