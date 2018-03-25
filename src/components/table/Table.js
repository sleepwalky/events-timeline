import React, { Component } from 'react';

import Button from './Button';
import Header from './Header';
import TableBody from './TableBody';

import { months, weekDays } from "../../helpers/consts";

class Table extends Component {
  constructor () {
    super();
    this.state = {
      view: 'months',
      display: months
    }
  }

  headerCalc = (view, date = new Date()) => {
    if (view === 'weeks') {
      let year = date.getFullYear();
      let month = date.getMonth();

      let firstWeekDay = new Date(year, month, 1).getDay();
      let lastDay = new Date(year, month + 1, 0).getDate();

      let weekDaysArr = [];
      let currentWeekDay = firstWeekDay;
      for (let i = 0; i < lastDay; i++) {
        let weekDay = currentWeekDay > 6 ? currentWeekDay = 0 : currentWeekDay;
        weekDaysArr[i] = `${i+1} ${weekDays[weekDay]}`;
        currentWeekDay++;
      }

      return weekDaysArr;
    }

    return months
  };

  getMonthsView = () => {
    this.changeView('months');
  };

  getWeeksView = () => {
    this.changeView('weeks');
  };

  changeView = (newView) => {
    if (this.state.view !== newView) {
      this.setState({ view: newView });
      this.setState({ display: this.headerCalc(newView) })
    }
  };

  render() {
    return (
      <div>
        <Button
          onClick = { this.getMonthsView }
          value = 'Months'
        />
        <Button
          onClick = { this.getWeeksView }
          value = 'Weeks'
        />
        <div className = "table">
          <Header
            view = { this.state.display }
          />
          <TableBody
            cells = { this.state.display }
            view = { this.state.view }
          />
        </div>
      </div>
    );
  }
}

export default Table;
