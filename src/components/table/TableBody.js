import React, { Component } from 'react';

import Event from '../Event';

import eventsJson from '../../events.json'
import { places } from '../../helpers/consts';

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: eventsJson.events
    };
  }

  sortAllEvents = (events) => {
    let sortedEvents = {};
    for (let i = 0; i < events.length; i++) {
      let place = events[i].place.toLowerCase();
      if (!sortedEvents[place]) {
        sortedEvents[place] = [];
      }
      sortedEvents[place].push(events[i])
    }

    return sortedEvents;
  };

  sortMonthEvents = (events) => {
    let sortedEvents = {};
    for (let i = 0; i < events.length; i++) {
      let place = events[i].place.toLowerCase();
      if (!sortedEvents[place]) {
        sortedEvents[place] = [];
      }
      let currentMonth = new Date().getMonth();
      let eventMonth = new Date(events[i].date).getMonth();
      if (currentMonth === eventMonth) {
        sortedEvents[place].push(events[i])
      }
    }

    return sortedEvents;
  };

  renderEvents = (events, timeInd, place) => {
    if (!events[place]) {
      return;
    }

    let renderingEvents = [];
    for (let i = 0; i < events[place].length; i++) {
      let eventDate = new Date(events[place][i].date);
      let month = eventDate.getMonth();
      let day = eventDate.getDate();

      if (this.props.view === 'months' && month === timeInd) {
        renderingEvents.push(this.addToEventsArr(events[place], i));
      }

      if (this.props.view === 'weeks' &&  day === timeInd + 1) {
          renderingEvents.push(this.addToEventsArr(events[place], i));
      }
    }

    return renderingEvents;
  };

  addToEventsArr = (initialArr, ind) => {
    return (
      <Event key = { initialArr[ind].name }
             className = { initialArr[ind].type }
             name = { initialArr[ind].name }
             time = { initialArr[ind].time }
             place = { initialArr[ind].place }
      />
    )
  };

  getRowNamesList = () => {
    const rowNames = places.slice();
      rowNames.unshift('GLOBAL');

    return rowNames;
  };

  render() {
    const rowNames = this.getRowNamesList();
    const sortedEvents = this.props.view === 'months' ?
      this.sortAllEvents(this.state.events) :
      this.sortMonthEvents(this.state.events);

    return (
      <div className = "table-body">
        { rowNames.map( placeName => {
          return (
            <div
              key = { placeName }
              className = "table-body-row"
            >
              <span className = "table-row-name">{ placeName }</span>
              { this.props.cells.map( (c, ind) =>
              <div
                key = { `${c}${ind}` }
                className = "table-cell"
              >
                { this.renderEvents(sortedEvents, ind, placeName.toLowerCase()) }
              </div>
              )}
            </div>
          )}
        )}
      </div>
    );
  }
}

export default TableBody;
