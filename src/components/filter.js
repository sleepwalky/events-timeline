import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './button';

class FilterBody extends Component {
  render() {
    const {
      topics,
      applyFilter,
      closeFilter,
      setTopic,
      clearFilter,
    } = this.props;
    return (
      <div>
        <div>
          <span className="search-box">
            <input placeholder="Search" className="search-input" />
          </span>
        </div>
        <div>
          <Button value="Clear filter" extraClass="clear-filter filter-btn" onClick={clearFilter} />
        </div>
        <div className="selected-topics">
          <span className="no-filters">NOTHING SELECTED</span>
        </div>
        <div className="filter-box">
          {
            topics.map((item, index) =>
              (
                <p key={`${item}-${index}`} className="uui-checkbox filter-item">
                  <input type="checkbox" id={`${item}-${index}`} value={item} />
                  <label htmlFor={`${item}-${index}`} name={item} onClick={setTopic}>{item}</label>
                </p>
              ),
            )
          }
        </div>
        <Button value="Apply" onClick={applyFilter} extraClass="popup-footer-btn filter-btn" />
      </div>
    );
  }
}

FilterBody.propTypes = {
  topics: PropTypes.array,
  applyFilter: PropTypes.func,
  closeFilter: PropTypes.func,
  setTopic: PropTypes.func,
  clearFilter: PropTypes.func,
};

export default FilterBody;
