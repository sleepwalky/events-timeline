// Event actions
export const SET_FILTERS = 'SET_FILTERS';
export const FILTER_TOPICS = 'FILTER_TOPICS';

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    filters,
  };
}

export function filterTopics(filter) {
  return {
    type: FILTER_TOPICS,
    filter,
  };
}
