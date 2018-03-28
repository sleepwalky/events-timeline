import React from 'react';

const TableFooter = (props) => (
  <div className="table-footer">
    <div className="footer-info-box total">
      <b>Total</b>
    </div>
    <div>
      <div className="footer-info-box">
        {12} Global / {22} External
      </div>
      <div className="footer-info-box">
        {2} Global / {45} External
      </div>
      <div className="footer-info-box">
        {12} Open Days
      </div>
      <div className="footer-info-box">
        {12} CC Updates
      </div>
    </div>
  </div>
);

export default TableFooter;
