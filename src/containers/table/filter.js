import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FilterBody from '../../components/filter';
import { filterEvents, setEventProfileById, setEventsSummary, filterEventsByMonth } from '../../actions/eventActions';
import { setFilters, filterTopics } from '../../actions/filterActions';
import { hideOverlay } from '../../actions/overlayActions';
import { setUrlParam } from '../../helpers/urlHelper';

class Filter extends Component {
  componentDidMount() {
    const params = window.location.search.split('?')[1];
    if (params !== '' && params !== undefined) {
      params.split('&').forEach(param => {
        const paramName = param.split('=')[0];
        if (paramName === 'filter') {
          this.findTopicName(param.split('='));
        }
      });
    }
    document.querySelector('.search-input').addEventListener('keyup', event => {
      const currentSearchValue = event.currentTarget.value;
      this.props.onFilterTopics(currentSearchValue);
    });
  }
  findTopicName = parameter => {
    const values = decodeURI(parameter[1]).split(',');
    values.forEach(value => {
      const input = document.querySelector(`.filter-item input[value='${value}']`);
      if (input) {
        input.checked = true;
        const label = document.querySelector(`label[name='${value}']`);
        if (label) {
          this.setTopic(label);
        }
      }
    });
  };
  checkSelectedElements = (elements, currentElement) => {
    let checked = false;
    let element = '';
    elements.forEach(node => {
      if (node.querySelector('label').textContent === currentElement) {
        checked = true;
        element = node;
      }
    });
    return {
      isChecked: checked,
      nodeElement: element,
    };
  };
  setTopic = event => {
    const currentElement = event.currentTarget ? event.currentTarget : event;
    const wrapper = document.querySelector('.selected-topics');
    const cloneLabel = currentElement.cloneNode(true);
    const chosenElements = wrapper.querySelectorAll('.chosen-filter');
    const checkedData = this.checkSelectedElements(chosenElements, currentElement.innerHTML);
    if (!checkedData.isChecked) {
      const chooseTopicDIV = document.createElement('div');
      const deleteTopicDIV = document.createElement('div');
      const spanFirst = document.createElement('span');
      const spanSecond = document.createElement('span');
      deleteTopicDIV.appendChild(spanFirst);
      deleteTopicDIV.appendChild(spanSecond);
      cloneLabel.appendChild(deleteTopicDIV);
      chooseTopicDIV.classList.add('chosen-filter');
      deleteTopicDIV.classList.add('delete-filter');
      chooseTopicDIV.appendChild(cloneLabel);
      wrapper.appendChild(chooseTopicDIV);
      deleteTopicDIV.addEventListener('click', closeEvent => {
        let deletedNode = '';
        if (closeEvent.srcElement.tagName === 'SPAN') {
          deletedNode = closeEvent.srcElement.parentNode.parentNode.parentNode;
          closeEvent.srcElement.parentNode.parentNode.parentNode.remove();
        } else if (closeEvent.srcElement.tagName === 'DIV') {
          deletedNode = closeEvent.srcElement.parentNode.parentNode;
          closeEvent.srcElement.parentNode.parentNode.remove();
        }
        if (wrapper.querySelectorAll('.chosen-filter').length > 0) {
          document.querySelector('.clear-filter').style.display = 'block';
        } else {
          document.querySelector('.clear-filter').style.display = 'none';
        }
        const deletedValue = deletedNode.querySelector('label').htmlFor;
        const selectedCheckbox = document.getElementById(`${deletedValue}`);
        if (selectedCheckbox) {
          selectedCheckbox.checked = false;
        }
      }, false);
    } else {
      checkedData.nodeElement.remove();
    }
    this.checkSelectedTopics(wrapper);
  };
  checkSelectedTopics = wrapper => {
    if (wrapper.querySelectorAll('.chosen-filter').length > 0) {
      document.querySelector('.clear-filter').style.display = 'block';
      document.querySelector('.no-filters').style.display = 'none';
    } else {
      document.querySelector('.clear-filter').style.display = 'none';
      document.querySelector('.no-filters').style.display = 'inline-block';
    }
  };
  applyFilter = () => {
    const chosenTopics = [];
    const selectedTopics = document.querySelectorAll('.chosen-filter label');
    selectedTopics.forEach(item => {
      chosenTopics.push(item.getAttribute('name'));
    });
    this.props.onFilterTopics(null);
    this.props.onSetEventFilters(chosenTopics);
    this.props.onFilterEvent(chosenTopics);
    setUrlParam('filter', chosenTopics.join(',').length > 0 ? chosenTopics.join(',') : null);
    this.setSummary(this.props.month, chosenTopics.length);
    this.props.onHideOverlay();
  };
  setSummary = (displayedMonth, topicLen) => {
    this.props.onFilterEventsByMonth({
      month: displayedMonth,
      isFiltered: topicLen > 0,
    });
    this.props.onSetEventsSummary({
      displayed: displayedMonth,
      isFiltered: topicLen > 0,
      view: this.props.view,
    });
  };
  clearFilter = () => {
    const wrapper = document.querySelector('.selected-topics');
    if (wrapper.querySelectorAll('.chosen-filter').length > 0) {
      wrapper.querySelectorAll('.chosen-filter').forEach(node => {
        node.remove();
      });
      const selectedTopics = document.querySelectorAll('.filter-item input');
      selectedTopics.forEach(input => {
        input.checked = false;
      });
      document.querySelector('.clear-filter').style.display = 'none';
      document.querySelector('.no-filters').style.display = 'inline-block';
    }
  };
  closeFilter = () => {
    this.props.onFilterTopics(null);
    this.props.onHideOverlay();
  };
  render() {
    return (
      <FilterBody
        topics={this.props.filter}
        applyFilter={this.applyFilter}
        closeFilter={this.closeFilter}
        setTopic={this.setTopic}
        clearFilter={this.clearFilter}
      />
    );
  }
}

Filter.propTypes = {
  onFilterTopics: PropTypes.func.isRequired,
  onFilterEventsByMonth: PropTypes.func.isRequired,
  onSetEventsSummary: PropTypes.func.isRequired,
  onSetEventFilters: PropTypes.func.isRequired,
  onFilterEvent: PropTypes.func.isRequired,
  onHideOverlay: PropTypes.func.isRequired,
  onSetEventProfileById: PropTypes.func.isRequired,
  filter: PropTypes.array,
  month: PropTypes.any,
  view: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    filter: state.filter.filteredTopics.length > 0 || state.filter.searchFilter !== ''
      ? state.filter.filteredTopics
      : state.filter.topicsList,
    month: state.table.displayedMonth,
    view: state.table.view,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFilterEvent: param => {
      dispatch(filterEvents(param));
    },
    onSetEventFilters: filters => {
      dispatch(setFilters(filters));
    },
    onSetEventsSummary: data => {
      dispatch(setEventsSummary(data));
    },
    onHideOverlay: () => {
      dispatch(hideOverlay());
    },
    onFilterTopics: filter => {
      dispatch(filterTopics(filter));
    },
    onFilterEventsByMonth: month => {
      dispatch(filterEventsByMonth(month));
    },
    onSetEventProfileById: data => {
      dispatch(setEventProfileById(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
