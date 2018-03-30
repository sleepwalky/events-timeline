import React from 'react';

const TableHeader = props => (
  <div className="table-header">
    {props.view.map(item => (
      <div key={item} className="table-header-item">
        {item}
      </div>
    ))}
  </div>
);

export default TableHeader;
