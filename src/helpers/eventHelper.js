const checkElementInArray = (array, elementId) => {
  const tempArr = array.filter(item => {
    return item.id.toString() === elementId.toString();
  });
  return tempArr.length === 0;
};

const filterEventArrayByMonth = (month, eventsArray) => {
  const filteredEventsByMonth = [];
  if (month !== null) {
    eventsArray.forEach(event => {
      const eventMonth = new Date(event.startDate).getMonth();
      if (eventMonth === month) {
        filteredEventsByMonth.push(event);
      }
    });
  } else {
    return eventsArray;
  }
  return filteredEventsByMonth.length > 0 ? filteredEventsByMonth : [];
};

const filterEventArray = (eventsFilter, eventsArray) => {
  const filteredEvents = [];
  eventsFilter.forEach(filter => {
    eventsArray.forEach(event => {
      if (event.topics.length > 0) {
        event.topics.forEach(eventTopic => {
          if (eventTopic.toLowerCase().includes(filter.toLowerCase())) {
            if (checkElementInArray(filteredEvents, event.id)) {
              filteredEvents.push(event);
            }
          }
        });
      }
    });
  });
  return filteredEvents.length > 0 ? filteredEvents : [];
};

const parseEventName = name => {
  const fullstringname = name.replace(/ /g, '').toLowerCase();
  if (fullstringname.indexOf('meetup') !== -1 || fullstringname.indexOf('meet-up') !== -1) {
    return { name: 'Global meetup', className: 'meetup', shortName: 'GM' };
  } else if (fullstringname.indexOf('talk') !== -1) {
    return { name: 'Talk', className: 'talk', shortName: 'TK' };
  } else if (fullstringname.indexOf('rollingscopes') !== -1) {
    return { name: 'Rolling scope', className: 'meetup', shortName: 'RS' };
  } else if (fullstringname.indexOf('openday') !== -1) {
    return { name: 'Open Day', className: 'openday', shortName: 'OD' };
  } else if (fullstringname.indexOf('itday') !== -1) {
    return { name: 'IT Day', className: 'meetup', shortName: 'ITD' };
  } else if (fullstringname.indexOf('hackathon') !== -1) {
    return { name: 'Hackathon', className: 'hackathon', shortName: 'HA' };
  } else if (fullstringname.indexOf('truestory') !== -1) {
    return { name: 'Global meetup', className: 'meetup', shortName: 'GM' };
  }
  return { name: 'Other event', className: 'otherevent', shortName: 'OE' };
};


const getSummaryInfo = events => {
  const summary = {
    talk: 0,
    meetup: 0,
    openday: 0,
    hackathon: 0,
    otherevent: 0,
  };

  events.forEach(event => {
    const eventType = parseEventName(event.name).className;
    summary[eventType] += 1;
  });
  return summary;
};

const getSummary = (state, action) => {
  if (action.data.isFiltered) {
    if (action.data.view === 'months') {
      return getSummaryInfo(state.filteredEvents);
    }
    return getSummaryInfo(filterEventArrayByMonth(action.data.displayed, state.filteredEvents));
  } else {
    if (action.data.view === 'weeks' || action.data.view === 'nextweeks' || action.data.view === 'prevweeks') {
      return getSummaryInfo(filterEventArrayByMonth(action.data.displayed, state.eventsList));
    }
    return getSummaryInfo(filterEventArrayByMonth(null, state.eventsList));
  }
};

const parseEvents = events => {
  const parsedArray = [];
  events.forEach(entity => {
    if (entity.events) {
      entity.events.forEach(event => {
        if (checkElementInArray(parsedArray, event.id)) {
          parsedArray.push(event);
        }
      });
    } else {
      if (checkElementInArray(parsedArray, entity.id)) {
        parsedArray.push(entity);
      }
    }
  });
  return parsedArray;
};

export { parseEvents, filterEventArray, filterEventArrayByMonth, getSummary, parseEventName };
