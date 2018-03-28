import React, {Component} from 'react';
import { connect } from 'react-redux';

import Event from '../Event';
import * as eventAPI from '../../middleware/event-api';
import store from '../../store/store';
import {places} from '../../helpers/consts';

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    eventAPI.getEventsList();
    store.subscribe(()=>{
      this.setState({events: store.getState().eventsState.eventsList});
    })
  }

  sortAllEvents = (events) => {
    let sortedEvents = {};

    events.forEach(event => {
      let place = event.city ? event.city.toLowerCase() : 'no_city';
      if (!sortedEvents[place]) {
        sortedEvents[place] = [];
      }
      sortedEvents[place].push(event)
    });

    return sortedEvents;
  };

  sortMonthEvents = (events) => {
    let sortedEvents = {};

    events.forEach((event => {

      let place = event.city ? event.city.toLowerCase() : 'no_city';
      if (!sortedEvents[place]) {
        sortedEvents[place] = [];
      }
      let currentMonth = new Date().getMonth();
      let eventMonth = new Date(event.startDate).getMonth();
      if (currentMonth === eventMonth) {
        sortedEvents[place].push(event)
      }
    }));

    return sortedEvents;
  };

  renderEvents = (events, timeInd, place) => {
    if (!events[place]) {
      return;
    }

    let renderingEvents = [];

    events[place].forEach((event) => {
      let eventDate = new Date(event.startDate);
      let month = eventDate.getMonth();
      let day = eventDate.getDate();

      if (this.props.view === 'months' && month === timeInd) {
        renderingEvents.push(this.addToEventsArr(event));
      }

      if (this.props.view === 'weeks' && day === timeInd + 1) {
        renderingEvents.push(this.addToEventsArr(event));
      }
    });

    return renderingEvents;
  };

  addToEventsArr = (event) => {
    return (
      <Event key={event.id}
             id={event.id}
             className="js"
             name={event.name}
             startDate={event.startDate}
             endDate={event.endDate}
             city={event.city}
             url={event.url}
      />
    )
  };

  getRowNamesList = (events) => {
    const rowNames = [];

    events.forEach(event => {
      let place = event.city ? event.city : 'No_city';
      if (rowNames.indexOf(place) === -1) {
        rowNames.push(place)
      }
    });
    rowNames.unshift('GLOBAL');
    return rowNames;
  };

  render() {
    const rowNames = this.getRowNamesList(this.state.events);
    const sortedEvents = this.props.view === 'months' ?
      this.sortAllEvents(this.state.events) :
      this.sortMonthEvents(this.state.events);

    return (
      <div className="table-body">
        {rowNames.map(placeName => {
            return (
              <div
                key={placeName}
                className="table-body-row"
              >
                <span className="table-row-name">{placeName}</span>
                {this.props.cells.map((c, ind) =>
                  <div
                    key={`${c}${ind}`}
                    className="table-cell"
                  >
                    {this.renderEvents(sortedEvents, ind, placeName.toLowerCase())}
                  </div>
                )}
              </div>
            )
          }
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.eventsState.eventsList,
  };
}

export default connect(mapStateToProps)(TableBody);
