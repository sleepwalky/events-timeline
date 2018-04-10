import { FILTER_TOPICS, SET_FILTERS } from '../actions/filterActions';
import { topics } from '../helpers/topics';

const initialState = {
  topicsList: topics,
  filteredTopics: [],
  filters: [],
  searchFilter: '',
};

function filterReducer(state = initialState, action) {
  const filteredTopicsArr = [];
  let searchFilterValue = '';
  switch (action.type) {
    case FILTER_TOPICS:
      if (action.filter !== null) {
        state.topicsList.forEach(topic => {
          if (topic.toLowerCase().indexOf(action.filter.toLowerCase()) !== -1) {
            filteredTopicsArr.push(topic);
          }
        });
        searchFilterValue = action.filter;
      } else {
        filteredTopicsArr.concat(state.topicsList);
      }
      return Object.assign({}, state, {
        filteredTopics: filteredTopicsArr.length > 0
          ? filteredTopicsArr
          : [],
        searchFilter: searchFilterValue,
      });
    case SET_FILTERS:
      return Object.assign({}, state, { filters: action.filters });
    default: {
      return state;
    }
  }
}

export default filterReducer;
