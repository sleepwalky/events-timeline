import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Event from './event';
import Spinner from '../../containers/spinner';
import { getEventsList } from '../../middleware/eventAPI';
import { showOverlay } from '../../actions/overlayActions';
import Body from '../../containers/table/tableBody';

class TableBody extends Component {
  componentDidMount() {
    const filterData = {
      extraClass: 'spinner',
      title: 'Loading data...',
      content: <Spinner />,
      open: true,
    };
    this.props.showOverlay(filterData);
    this.props.onGetEvents({ view: this.props.view });
  }

  sortAllEvents = events => {
    const sortedEvents = {};

    events.forEach(event => {
      const place = event.city ? event.city.toLowerCase() : 'no_city';
      if (!sortedEvents[place]) {
        sortedEvents[place] = [];
      }
      sortedEvents[place].push(event);
    });

    return sortedEvents;
  };

  sortMonthEvents = events => {
    const sortedEvents = {};

    events.forEach((event => {
      const place = event.city ? event.city.toLowerCase() : 'no_city';
      if (!sortedEvents[place]) {
        sortedEvents[place] = [];
      }
      const currentMonth = this.props.month;
      const eventMonth = new Date(event.startDate).getMonth();
      if (currentMonth === eventMonth) {
        sortedEvents[place].push(event);
      }
    }));

    return sortedEvents;
  };

  renderEvents = (events, timeInd, place) => {
    if (!events[place]) {
      return;
    }

    const renderingEvents = [];

    events[place].forEach(event => {
      const eventDate = new Date(event.startDate);
      const month = eventDate.getMonth();
      const day = eventDate.getDate();

      if (this.props.view === 'months' && month === timeInd) {
        renderingEvents.push(this.addToEventsArr(event));
      }

      if ((this.props.view === 'weeks' || this.props.view === 'nextweeks' || this.props.view === 'prevweeks') && day === timeInd + 1) {
        renderingEvents.push(this.addToEventsArr(event));
      }
    });

    return renderingEvents;
  };

  addToEventsArr = event => (
    <Event
      key={event.id}
      id={event.id}
      className="js"
      name={event.name}
      startDate={event.startDate}
      endDate={event.endDate}
      city={event.city}
      url={event.url}
      backgroundImageUrl={event.backgroundImageUrl}
    />
  );

  getRowNamesList = events => {
    const rowNames = [];

    events.forEach(event => {
      const place = event.city ? event.city : 'No_city';
      if (rowNames.indexOf(place) === -1) {
        rowNames.push(place);
      }
    });
    rowNames.unshift('GLOBAL');
    return rowNames;
  };
  render() {
    let eventsArray = '';
    if (this.props.currentMonth === this.props.month) {
      eventsArray = this.props.events;
    } else {
      eventsArray = this.props.monthlyEvents;
    }
    const rowNames = this.getRowNamesList(eventsArray);
    const sortedEvents = this.props.view === 'months' ?
      this.sortAllEvents(eventsArray) :
      this.sortMonthEvents(eventsArray);

    return (
      <Body
        rowNames={rowNames}
        sortedEvents={sortedEvents}
        cells={this.props.cells}
        renderEvents={this.renderEvents}
      />
    );
  }
}

TableBody.propTypes = {
  onGetEvents: PropTypes.func.isRequired,
  showOverlay: PropTypes.func.isRequired,
  month: PropTypes.any,
  view: PropTypes.string,
  currentMonth: PropTypes.any,
  monthlyEvents: PropTypes.array,
  events: PropTypes.array,
  cells: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    events: state.event.filteredEvents.length === 0 && state.filter.filters.length === 0 ?
      state.event.eventsList :
      state.event.filteredEvents,
    monthlyEvents: state.event.filteredByMonth,
    month: state.table.displayedMonth,
    currentMonth: state.table.currentMonth,
  };
}

const mapDispatchToProps = dispatch => ({
  onGetEvents: data => {
    dispatch(getEventsList(data));
  },
  showOverlay: data => {
    dispatch(showOverlay(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
