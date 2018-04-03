import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { getEventsList } from '../../middleware/eventAPI';
import { setMonthToEvents } from '../../actions/tableActions';
import { filterEvents, setfilterForEvents } from '../../actions/eventActions';
import Button from './button';
import Header from './header';
import TableFooter from './footer';
import TableBody from './tableBody';

import { months, weekDays, fullMonths } from '../../helpers/consts';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      view: 'months',
      display: months,
      currentMonth: new Date().getMonth(),
      nextMonth: new Date().getMonth() + 1,
      prevMonth: new Date().getMonth() - 1,
      selectedOptions: '',
    };
  }

  getMonthsView = () => {
    this.changeView('months');
  };

  getWeeksView = () => {
    this.setState(() => ({
      nextMonth: this.state.currentMonth + 1,
      prevMonth: this.state.currentMonth - 1,
    }));
    this.props.onSetMonth(this.state.currentMonth);
    this.changeView('weeks');
  };

  headerCalc = (view) => {
    if (view !== 'months') {
      const data = {
        year: new Date().getFullYear(),
      };
      if (view === 'weeks') {
        data.month = this.state.currentMonth;
      } else if (view === 'nextweeks') {
        data.month = this.state.nextMonth;
      } else if (view === 'prevweeks') {
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
    return months;
  };

  changeView = (newView) => {
    this.setState({ view: newView });
    this.setState({ display: this.headerCalc(newView) });
  };

  getNextWeeksView = () => {
    if (this.state.nextMonth !== 12) {
      this.setState(() => ({
        nextMonth: this.state.nextMonth + 1,
        prevMonth: this.state.nextMonth - 1,
      }));
      this.props.onSetMonth(this.state.nextMonth);
      this.changeView('nextweeks');
    }
  };

  getPrevWeeksView = () => {
    if (this.state.prevMonth !== -1) {
      this.setState(() => ({
        nextMonth: this.state.nextMonth - 1,
        prevMonth: this.state.prevMonth - 1,
      }));
      this.props.onSetMonth(this.state.prevMonth);
      this.changeView('prevweeks');
    }
  };

  refreshEventsTable = () => {
    this.props.onGetEvents();
  };
  handleChange = (selectedOption) => {
    const options = [];
    selectedOption.forEach((item) => {
      options.push(item.value);
    });
    this.setState({ selectedOptions: options.join(',') });
    this.props.onSetEventFilters(options);
    this.props.onFilterEvent(options);
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
            <Select
              className="filter"
              placeholder="Select technologies..."
              value={this.state.selectedOptions}
              name="form-field-name"
              multi
              closeOnSelect={false}
              onChange={this.handleChange}
              options={[
                { value: 'js', label: 'Javascript' },
                { value: 'react', label: 'React' },
                { value: 'css', label: 'CSS' },
                { value: 'html', label: 'HTML' },
              ]}
            />
          <Button
            onClick={this.getMonthsView}
            value="Current year"
          />
          <Button
            onClick={this.getWeeksView}
            value="Current month"
          />
          <span className="month-name">
            {
              this.props.month !== '' ?
                fullMonths[this.props.month] :
                fullMonths[this.state.currentMonth]
            }
          </span>
          <Button
            onClick={this.getNextWeeksView}
            value="next month"
            class="next-week-button"
          />
          <Button
            onClick={this.getPrevWeeksView}
            value="prev month"
            class="prev-week-button"
          />

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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetEvents: () => {
      dispatch(getEventsList());
    },
    onSetMonth: (month) => {
      dispatch(setMonthToEvents(month));
    },
    onFilterEvent: (param) => {
      dispatch(filterEvents(param));
    },
    onSetEventFilters: (filter) => {
      dispatch(setfilterForEvents(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
