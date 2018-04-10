import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FilterBody from '../../containers/filter';
import { filterEvents, setEventProfileById } from '../../actions/eventActions';
import { setFilters, filterTopics } from '../../actions/filterActions';
import { hideOverlay } from '../../actions/overlayActions';

function findElement(name) {
  return document.querySelector(name);
}

function findAllElements(name) {
  return document.querySelectorAll(name);
}

function createElement(name) {
  return document.createElement(name);
}

class Filter extends Component {
  componentDidMount() {
    const params = window.location.search.split('?')[1];
    if (params !== '' && params !== undefined) {
      params.split('&').forEach(param => {
        const paramName = param.split('=')[0];
        if (paramName === 'filter') {
          this.setTopic(param.split('='));
        }
      });
    }
    findElement('.search-input').addEventListener('keyup', event => {
      const currentSearchValue = event.currentTarget.value;
      this.props.onFilterTopics(currentSearchValue);
    });
  }
  setTopic = parameter => {
    const values = decodeURI(parameter[1]).split(',');
    values.forEach(value => {
      const input = findElement(`.filter-item input[value='${value}']`);
      if (input) {
        input.checked = true;
        const label = findElement(`label[name='${value}']`);
        if (label) {
          this.chooseTopic(label);
        }
      }
    });
  };
  getUrlParam = name => {
    const params = window.location.search.split('?')[1];
    if (params !== '' && params !== undefined) {
      let paramValue = '';
      params.split('&').forEach(param => {
        const paramName = param.split('=')[0];
        if (paramName === 'filter' && name === 'filter') {
          paramValue = param.split('=')[1] !== '' ? param.split('=')[1].split(',') : [];
        }
        if (paramName === 'eventId' && name === 'eventId') {
          paramValue = param.split('=')[1] ? param.split('=')[1] : null;
        }
      });
      return paramValue;
    }
  };
  chooseTopic = event => {
    const currentElement = event.currentTarget ? event.currentTarget : event;
    const wrapper = findElement('.selected-topics');
    const cloneLabel = currentElement.cloneNode(true);
    let isChecked = false;
    let nodeElement = '';
    wrapper.querySelectorAll('.chosen-filter').forEach(node => {
      if (node.querySelector('label').textContent === currentElement.innerHTML) {
        isChecked = true;
        nodeElement = node;
      }
    });
    if (!isChecked) {
      const chooseTopicDIV = createElement('div');
      const deleteTopicDIV = createElement('div');
      const spanFirst = createElement('span');
      const spanSecond = createElement('span');
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
          findElement('.clear-filter').style.display = 'inline-block';
        } else {
          findElement('.clear-filter').style.display = 'none';
        }
        const deletedValue = deletedNode.querySelector('label').htmlFor;
        const selectedCheckbox = document.getElementById(`${deletedValue}`);
        if (selectedCheckbox) {
          selectedCheckbox.checked = false;
        }
      }, false);
    } else {
      nodeElement.remove();
    }
    this.checkSelectedTopics(wrapper);
  };
  checkSelectedTopics = wrapper => {
    if (wrapper.querySelectorAll('.chosen-filter').length > 0) {
      findElement('.clear-filter').style.display = 'inline-block';
      findElement('.no-filters').style.display = 'none';
    } else {
      findElement('.clear-filter').style.display = 'none';
      findElement('.no-filters').style.display = 'inline-block';
    }
  };
  applyFilter = () => {
    const chosenTopics = [];
    const { history } = window;
    const selectedTopics = findAllElements('.chosen-filter label');
    selectedTopics.forEach(item => {
      chosenTopics.push(item.getAttribute('name'));
    });
    this.props.onFilterTopics(null);
    this.props.onSetEventFilters(chosenTopics);
    this.props.onFilterEvent(chosenTopics);
    const pathname = window.location.search;
    const paramsString = pathname.split('?')[1];
    let newPathName = '';
    if (paramsString === '' || paramsString === undefined) {
      newPathName = `${pathname}?filter=${chosenTopics.join(',')}`;
      history.pushState({}, null, newPathName);
    } else {
      this.setHistoryState(paramsString, pathname, history, chosenTopics);
    }
    this.props.onHideOverlay();
  };
  setHistoryState = (params, pathname, history, chosenTopics) => {
    const filterString = chosenTopics.length > 0 ? `filter=${chosenTopics.join(',')}` : '';
    const paramsCount = params.split('&').length;
    let isFilterExist = false;
    let isFilteredEvents = true;
    if (paramsCount > 0) {
      params.split('&').forEach((param, index) => {
        const paramName = param.split('=')[0];
        let filterForReplace = param;
        if (paramName === 'filter') {
          isFilterExist = true;
          if (paramsCount !== 1 && filterString === '') {
            isFilteredEvents = false;
            filterForReplace = (index === 0) ? `${param}&` : `&${param}`;
          }
          const newPathName = pathname.replace(filterForReplace, `${encodeURI(filterString)}`);
          history.pushState({}, null, newPathName);
        }
      });
    }
    if (!isFilterExist) {
      if (chosenTopics.length > 0) {
        const newPathName = `${pathname}&filter=${chosenTopics.join(',')}`;
        history.pushState({}, null, newPathName);
      }
    }
    const eventData = {
      id: this.getUrlParam('eventId'),
      isFiltered: isFilteredEvents,
    };
    this.props.onSetEventProfileById(eventData);
  };
  clearFilter = () => {
    const wrapper = findElement('.selected-topics');
    if (wrapper.querySelectorAll('.chosen-filter').length > 0) {
      wrapper.querySelectorAll('.chosen-filter').forEach(node => {
        node.remove();
      });
      const selectedTopics = findAllElements('.filter-item input');
      selectedTopics.forEach(input => {
        input.checked = false;
      });
      findElement('.clear-filter').style.display = 'none';
      findElement('.no-filters').style.display = 'inline-block';
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
        chooseTopic={this.chooseTopic}
        clearFilter={this.clearFilter}
      />
    );
  }
}

Filter.propTypes = {
  onFilterTopics: PropTypes.func.isRequired,
  onSetEventFilters: PropTypes.func.isRequired,
  onFilterEvent: PropTypes.func.isRequired,
  onHideOverlay: PropTypes.func.isRequired,
  onSetEventProfileById: PropTypes.func.isRequired,
  filter: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    filter: state.filter.filteredTopics.length > 0 || state.filter.searchFilter !== ''
      ? state.filter.filteredTopics
      : state.filter.topicsList,
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
    onHideOverlay: () => {
      dispatch(hideOverlay());
    },
    onFilterTopics: filter => {
      dispatch(filterTopics(filter));
    },
    onSetEventProfileById: data => {
      dispatch(setEventProfileById(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
