import React, {Component} from 'react';

import Event from '../Event';

import eventsJson from '../../events.json'
import {places} from '../../helpers/consts';

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: eventsJson.events
    };
  }

  sortAllEvents = (events) => {
    let sortedEvents = {};

    events.forEach(event => {
      let place = event.place.toLowerCase();
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
      let place = event.place.toLowerCase();
      if (!sortedEvents[place]) {
        sortedEvents[place] = [];
      }
      let currentMonth = new Date().getMonth();
      let eventMonth = new Date(event.date).getMonth();
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
      let eventDate = new Date(event.date);
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
      <Event key={event.name}
             className={event.type}
             name={event.name}
             time={event.time}
             place={event.place}
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

export default TableBody;
