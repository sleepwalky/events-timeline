import React, { Component } from 'react';
import { connect } from 'react-redux';

import Event from '../event';
import { getEventsList } from '../../middleware/eventAPI';

class TableBody extends Component {
  componentDidMount() {
    this.props.onGetEvents();
  }

  sortAllEvents = (events) => {
    const sortedEvents = {};

    events.forEach((event) => {
      const place = event.city ? event.city.toLowerCase() : 'no_city';
      if (!sortedEvents[place]) {
        sortedEvents[place] = [];
      }
      sortedEvents[place].push(event);
    });

    return sortedEvents;
  };

  sortMonthEvents = (events) => {
    const sortedEvents = {};

    events.forEach(((event) => {
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

    events[place].forEach((event) => {
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

  getRowNamesList = (events) => {
    const rowNames = [];

    events.forEach((event) => {
      const place = event.city ? event.city : 'No_city';
      if (rowNames.indexOf(place) === -1) {
        rowNames.push(place);
      }
    });
    rowNames.unshift('GLOBAL');
    return rowNames;
  };

  render() {
    const rowNames = this.getRowNamesList(this.props.events);
    const sortedEvents = this.props.view === 'months' ?
      this.sortAllEvents(this.props.events) :
      this.sortMonthEvents(this.props.events);

    return (
      <div className="table-body">
        {rowNames.map(placeName => (
          <div
            key={placeName}
            className="table-body-row"
          >
            <span className="table-row-name">{placeName}</span>
            {this.props.cells.map((c, ind) =>
                  (<div
                    key={`${c}${ind}`}
                    className="table-cell"
                  >
                    {this.renderEvents(sortedEvents, ind, placeName.toLowerCase())}
                  </div>))}
          </div>
            ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.event.filteredEvents.length === 0 && state.event.eventsFilter.length === 0 ?
      state.event.eventsList :
      state.event.filteredEvents,
    month: state.table.monthDisplayed,
  };
}

const mapDispatchToProps = dispatch => ({
  onGetEvents: () => {
    dispatch(getEventsList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
