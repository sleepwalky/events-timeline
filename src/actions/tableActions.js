// Event actions
export const SET_MONTH = 'SET_MONTH';

export function setMonthToEvents(month) {
  return {
    type: SET_MONTH,
    month,
  };
}
