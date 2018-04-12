import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableFooter extends Component {
  render() {
    const {
      talks,
      openday,
      meetup,
      ccupdate,
      others,
    } = this.props.result;
    return (
      <div className="table-footer">
        <div className="footer-info-box total">
          <b>Total</b>
        </div>
        <div>
          <div className="footer-info-box sum-talk">
            {talks} Talks
          </div>
          <div className="footer-info-box sum-meetup">
            {meetup} Global Meetup
          </div>
          <div className="footer-info-box sum-openday">
            {openday} Open Days
          </div>
          <div className="footer-info-box sum-hackathon ">
            {ccupdate} CC Updates
          </div>
          <div className="footer-info-box sum-otherevent ">
            {others} Other Events
          </div>
        </div>
      </div>
    );
  }
}

TableFooter.propTypes = {
  talks: PropTypes.object,
  meetup: PropTypes.object,
  openday: PropTypes.string,
  ccupdate: PropTypes.string,
  others: PropTypes.string,
  result: PropTypes.object,
};

export default TableFooter;
