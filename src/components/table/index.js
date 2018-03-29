import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEventsList } from '../../middleware/eventAPI';
import Button from './button';
import Header from './header';
import TableFooter from './footer';
import TableBody from './tableBody';

import { months, weekDays } from '../../helpers/consts';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      view: 'months',
      display: months,
    };
  }

  getMonthsView = () => {
    this.changeView('months');
  };

  getWeeksView = () => {
    this.changeView('weeks');
  };

  headerCalc = (view, date = new Date()) => {
    if (view === 'weeks') {
      const year = date.getFullYear();
      const month = date.getMonth();

      const firstWeekDay = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month + 1, 0).getDate();

      const weekDaysArr = [];
      let currentWeekDay = firstWeekDay;

      for (let i = 0; i < lastDay; i += 1) {
        const weekDay = currentWeekDay > 6 ? currentWeekDay = 0 : currentWeekDay;
        weekDaysArr[i] = `${i + 1} ${weekDays[weekDay]}`;
        currentWeekDay += 1;
      }

      return weekDaysArr;
    }

    return months;
  };

  changeView = (newView) => {
    if (this.state.view !== newView) {
      this.setState({ view: newView });
      this.setState({ display: this.headerCalc(newView) });
    }
  };

  refreshEventsTable = () => {
    this.props.onGetEvents();
  };

  render() {
    return (
      <div>
        <div className="buttons-box">
          <Button
            onClick={this.refreshEventsTable}
            value="Refresh"
            class="refresh-button"
          />
          <Button
            onClick={this.getMonthsView}
            value="Months"
          />
          <Button
            onClick={this.getWeeksView}
            value="Weeks"
          />
        </div>
        <div className="table">
          <Header
            view={this.state.display}
          />
          <TableBody
            cells={this.state.display}
            view={this.state.view}
          />
          <TableFooter />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onGetEvents: () => {
    dispatch(getEventsList());
  },
});

export default connect(null, mapDispatchToProps)(Table);
