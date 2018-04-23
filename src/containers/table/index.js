import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getEventsList } from '../../middleware/eventAPI';
import { setMonthToEvents, setNextPrevMonthToEvents, setViewToTable, setDisplayToTable } from '../../actions/tableActions';
import { filterEventsByMonth, setEventsSummary } from '../../actions/eventActions';
import Button from '../../components/button';
import Header from '../../components/table/header';
import TableFooter from '../../components/table/footer';
import TableBody from './tableBody';
import Filter from './filter';
import Spinner from '../../components/spinner';
import { showOverlay } from '../../actions/overlayActions';

import { monthsNames, weekDays, fullMonths } from '../../helpers/consts';

class Table extends Component {
  setStateForTable = (setDisplayedMonth, setCurrentMonth, setView) => {
    this.props.onFilterEventsByMonth({
      month: setDisplayedMonth,
      isFiltered: this.props.isEventsFiltered,
    });
    this.props.onSetMonth(setCurrentMonth);
    this.props.onSetNextPrevMonth();
    this.props.onSetEventsSummary({
      displayed: setCurrentMonth,
      isFiltered: this.props.isEventsFiltered,
      view: setView,
    });
  };

  getYearView = () => {
    this.setStateForTable(null, this.props.currentMonth, 'year');
    this.changeView('year');
  };

  getMonthView = () => {
    this.setStateForTable(this.props.currentMonth, this.props.currentMonth, 'month');
    this.changeView('month');
  };

  headerCalc = view => {
    if (view !== 'year') {
      const data = {
        year: new Date().getFullYear(),
      };
      if (view === 'month') {
        data.month = this.props.currentMonth;
      } else if (view === 'nextmonth') {
        data.month = this.props.nextMonth;
      } else if (view === 'prevmonth') {
        data.month = this.props.prevMonth;
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
    this.props.onSetTableView(newView);
    this.props.onSetTableDisplay(this.headerCalc(newView));
  };

  getNextMonthView = () => {
    if (this.props.nextMonth !== 12) {
      this.setStateForTable(this.props.nextMonth, this.props.nextMonth, 'nextmonth');
      this.changeView('nextmonth');
    }
  };

  getPrevMonthView = () => {
    if (this.props.prevMonth !== -1) {
      this.setStateForTable(this.props.prevMonth, this.props.prevMonth, 'prevmonth');
      this.changeView('prevmonth');
    }
  };

  isMonthView = () => {
    const { view } = this.props;
    return view === 'month' ||
      view === 'nextmonth' ||
      view === 'prevmonth';
  };

  refreshEventsTable = () => {
    const spinnerData = {
      extraClass: 'spinner',
      title: 'Refreshing data...',
      content: <Spinner />,
      open: true,
    };
    this.props.showOverlay(spinnerData);
    this.props.onGetEvents({ view: this.props.view, displayed: this.props.month });
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
              onClick={this.getYearView}
              value="year"
              extraClass={this.props.view === 'year' && 'button-active'}
            />
            <Button
              onClick={this.getMonthView}
              value="month"
              extraClass={this.isMonthView() && 'button-active'}
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
                  fullMonths[this.props.currentMonth]
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
          view={this.props.display}
        />
        <div className="table">
          <TableBody
            cells={this.props.display}
            view={this.props.view}
          />
          <TableFooter
            result={this.props.summary}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    month: state.table.displayedMonth,
    view: state.table.view,
    display: state.table.display,
    currentMonth: state.table.currentMonth,
    nextMonth: state.table.nextMonth,
    prevMonth: state.table.prevMonth,
    eventProfile: state.event.eventProfile,
    summary: state.event.summary,
    isEventsFiltered: state.filter.filters.length > 0,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetEvents: data => {
      dispatch(getEventsList(data));
    },
    onSetEventsSummary: data => {
      dispatch(setEventsSummary(data));
    },
    onSetMonth: month => {
      dispatch(setMonthToEvents(month));
    },
    onSetNextPrevMonth: () => {
      dispatch(setNextPrevMonthToEvents());
    },
    onSetTableView: view => {
      dispatch(setViewToTable(view));
    },
    onSetTableDisplay: display => {
      dispatch(setDisplayToTable(display));
    },
    onFilterEventsByMonth: month => {
      dispatch(filterEventsByMonth(month));
    },
    showOverlay: data => {
      dispatch(showOverlay(data));
    },
  };
};

Table.propTypes = {
  onSetMonth: PropTypes.func.isRequired,
  onSetNextPrevMonth: PropTypes.func.isRequired,
  onSetTableView: PropTypes.func.isRequired,
  onSetTableDisplay: PropTypes.func.isRequired,
  onGetEvents: PropTypes.func.isRequired,
  showOverlay: PropTypes.func.isRequired,
  onFilterEventsByMonth: PropTypes.func.isRequired,
  onSetEventsSummary: PropTypes.func.isRequired,
  month: PropTypes.any,
  isEventsFiltered: PropTypes.bool,
  currentMonth: PropTypes.any,
  nextMonth: PropTypes.any,
  prevMonth: PropTypes.any,
  summary: PropTypes.any,
  view: PropTypes.string,
  display: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
