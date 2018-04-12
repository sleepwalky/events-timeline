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

import { months, weekDays, fullMonths } from '../../helpers/consts';

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
  getMonthsView = () => {
    this.setStateForTable(null, this.props.currentMonth, 'months');
    this.changeView('months');
  };

  getWeeksView = () => {
    this.setStateForTable(this.props.currentMonth, this.props.currentMonth, 'weeks');
    this.changeView('weeks');
  };

  headerCalc = view => {
    if (view !== 'months') {
      const data = {
        year: new Date().getFullYear(),
      };
      if (view === 'weeks') {
        data.month = this.props.currentMonth;
      } else if (view === 'nextweeks') {
        data.month = this.props.nextMonth;
      } else if (view === 'prevweeks') {
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
    return months;
  };

  changeView = newView => {
    this.props.onSetTableView(newView);
    this.props.onSetTableDisplay(this.headerCalc(newView));
  };

  getNextWeeksView = () => {
    if (this.props.nextMonth !== 12) {
      this.setStateForTable(this.props.nextMonth, this.props.nextMonth, 'nextweeks');
      this.changeView('nextweeks');
    }
  };

  getPrevWeeksView = () => {
    if (this.props.prevMonth !== -1) {
      this.setStateForTable(this.props.prevMonth, this.props.prevMonth, 'prevweeks');
      this.changeView('prevweeks');
    }
  };

  refreshEventsTable = () => {
    const filterData = {
      extraClass: 'spinner',
      title: 'Refreshing data...',
      content: <Spinner />,
      open: true,
    };
    this.props.showOverlay(filterData);
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
          <Button
            onClick={this.refreshEventsTable}
            value="Refresh"
            extraClass="refresh-button"
          />
          <Button
            onClick={this.selectTopics}
            value="Filter"
          />
          <Button
            onClick={this.getMonthsView}
            value="Current year"
          />
          <Button
            onClick={this.getWeeksView}
            value="Current month"
          />
          <Button
            onClick={this.getNextWeeksView}
            value="next month"
            extraClass="next-week-button"
          />
          <span className="month-name">
            {
              this.props.month !== '' ?
                fullMonths[this.props.month] :
                fullMonths[this.props.currentMonth]
            }
          </span>
          <Button
            onClick={this.getPrevWeeksView}
            value="prev month"
            extraClass="prev-week-button"
          />
          <Header
            view={this.props.display}
          />
        </div>
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
