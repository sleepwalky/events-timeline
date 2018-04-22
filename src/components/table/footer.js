import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableFooter extends Component {
  render() {
    const {
      talk,
      openday,
      meetup,
      hackathon,
      otherevent,
    } = this.props.result;
    return (
      <div className="table-footer">
        <div className="footer-info-box total">
          <b>Total</b>
        </div>
        <div>
          <div className="footer-info-box sum-talk">
            {talk} Talks
          </div>
          <div className="footer-info-box sum-meetup">
            {meetup} Global Meetup
          </div>
          <div className="footer-info-box sum-openday">
            {openday} Open Days
          </div>
          <div className="footer-info-box sum-hackathon ">
            {hackathon} CC Updates
          </div>
          <div className="footer-info-box sum-otherevent ">
            {otherevent} Other Events
          </div>
        </div>
      </div>
    );
  }
}

TableFooter.propTypes = {
  talk: PropTypes.object,
  meetup: PropTypes.object,
  openday: PropTypes.string,
  hackathon: PropTypes.string,
  otherevent: PropTypes.string,
  result: PropTypes.object,
};

export default TableFooter;
