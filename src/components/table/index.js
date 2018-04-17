import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getEventsList } from '../../middleware/eventAPI';
import { setMonthToEvents } from '../../actions/tableActions';
import Button from '../../containers/button';
import Header from '../../containers/table/header';
import TableFooter from '../../containers/table/footer';
import TableBody from './tableBody';
import Filter from './filter';
import Spinner from '../../containers/spinner';
import { showOverlay } from '../../actions/overlayActions';

import { monthsNames, weekDays, fullMonths } from '../../helpers/consts';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      view: 'year',
      display: monthsNames,
      currentMonth: new Date().getMonth(),
      nextMonth: new Date().getMonth() + 1,
      prevMonth: new Date().getMonth() - 1,
    };
  }
  getMonthsView = () => {
    this.changeView('year');
  };

  getWeeksView = () => {
    this.setState(() => ({
      nextMonth: this.state.currentMonth + 1,
      prevMonth: this.state.currentMonth - 1,
    }));
    this.props.onSetMonth(this.state.currentMonth);
    this.changeView('month');
  };

  headerCalc = view => {
    if (view !== 'year') {
      const data = {
        year: new Date().getFullYear(),
      };
      if (view === 'month') {
        data.month = this.state.currentMonth;
      } else if (view === 'nextmonth') {
        data.month = this.state.nextMonth;
      } else if (view === 'prevmonth') {
        data.month = this.state.prevMonth;
      }

      const firstWeekDay = new Date(data.year, data.month, 1).getDay();
      const lastDay = new Date(data.year, data.month + 1, 0).getDate();

      const weekDaysArr = [];
      let currentWeekDay = firstWeekDay;

      for (let i = 0; i < lastDay; i += 1) {
        const weekDay = currentWeekDay > 6 ? currentWeekDay = 0 : currentWeekDay;
        weekDaysArr[i] = `${i + 1} ${weekDays[weekDay]}`;
        currentWeekDay += 1;
      }
      return weekDaysArr;
    }
    return monthsNames;
  };

  changeView = newView => {
    this.setState({
      view: newView,
      display: this.headerCalc(newView),
    });
  };

  getNextMonthView = () => {
    if (this.state.nextMonth !== 12) {
      this.setState(() => ({
        nextMonth: this.state.nextMonth + 1,
        prevMonth: this.state.nextMonth - 1,
      }));
      this.props.onSetMonth(this.state.nextMonth);
      this.changeView('nextmonth');
    }
  };

  getPrevMonthView = () => {
    if (this.state.prevMonth !== -1) {
      this.setState(() => ({
        nextMonth: this.state.nextMonth - 1,
        prevMonth: this.state.prevMonth - 1,
      }));
      this.props.onSetMonth(this.state.prevMonth);
      this.changeView('prevmonth');
    }
  };

  isMonthView = () => {
    const { view } = this.state;
    return view === 'month' ||
      view === 'nextmonth' ||
      view === 'prevmonth';
  };

  refreshEventsTable = () => {
    const filterData = {
      extraClass: 'spinner',
      title: 'Refreshing data...',
      content: <Spinner />,
      open: true,
    };
    this.props.showOverlay(filterData);
    this.props.onGetEvents();
  };
  selectTopics = () => {
    const filterData = {
      extraClass: 'filter',
      title: 'Set filters',
      content: <Filter />,
      open: true,
    };
    this.props.showOverlay(filterData);
  };
  render() {
    return (
      <div>
        <div className="buttons-box">
          <div className="main-buttons button-box-part">
            <Button
              onClick={this.getMonthsView}
              value="year"
              extraClass={this.state.view === 'year' ? 'button-active' : ''}
            />
            <Button
              onClick={this.getWeeksView}
              value="month"
              extraClass={this.isMonthView() ? 'button-active' : ''}
            />
            <Button
              onClick={this.getPrevMonthView}
              value="prev month"
              extraClass="prev-month-button"
            />
            <span className="month-name button">
              {
                this.props.month !== '' ?
                  fullMonths[this.props.month] :
                  fullMonths[this.state.currentMonth]
              }
            </span>
            <Button
              onClick={this.getNextMonthView}
              value="next month"
              extraClass="next-month-button"
            />
          </div>
          <div className="sub-buttons button-box-part">
            <Button
              onClick={this.refreshEventsTable}
              value="refresh"
              extraClass="refresh-button"
            />
            <Button
              onClick={this.selectTopics}
              value="filter"
            />
          </div>
        </div>
        <Header
          view={this.state.display}
        />
        <div className="table">
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

function mapStateToProps(state) {
  return {
    month: state.table.monthDisplayed,
    eventProfile: state.event.eventProfile,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetEvents: () => {
      dispatch(getEventsList());
    },
    onSetMonth: month => {
      dispatch(setMonthToEvents(month));
    },
    showOverlay: data => {
      dispatch(showOverlay(data));
    },
  };
};

Table.propTypes = {
  onSetMonth: PropTypes.func.isRequired,
  onGetEvents: PropTypes.func.isRequired,
  showOverlay: PropTypes.func.isRequired,
  month: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
