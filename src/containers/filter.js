import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../containers/button';

class FilterBody extends Component {
  render() {
    const {
      topics,
      applyFilter,
      closeFilter,
      chooseTopic,
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
          <Button value="Clear filter" extraClass="clear-filter" onClick={clearFilter} />
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
                  <label htmlFor={`${item}-${index}`} name={item} onClick={chooseTopic}>{item}</label>
                </p>
              ),
            )
          }
        </div>
        <Button value="Apply" onClick={applyFilter} />
        <Button value="Close" class="close-filter" onClick={closeFilter} />
      </div>
    );
  }
}

FilterBody.propTypes = {
  topics: PropTypes.array,
  applyFilter: PropTypes.func,
  closeFilter: PropTypes.func,
  chooseTopic: PropTypes.func,
  clearFilter: PropTypes.func,
};

export default FilterBody;
