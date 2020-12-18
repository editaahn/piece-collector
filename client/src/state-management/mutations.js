export default {
  setDateState(state, payload) {
    state.selectedDate = {
      date: payload,
      year: payload.getYear(),
      year: payload.getMonth() + 1,
    };

    return state;
  },
};
