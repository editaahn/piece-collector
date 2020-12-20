export default {
  setDateState(state, payload) {
    return [
      "selectedDate",
      {
        date: payload,
        year: payload.getFullYear(),
        month: payload.getMonth() + 1,
      },
    ];
  },
  toggleToast(state, payload) {
    return ["isToastOpen", payload];
  },
  getColors(state, payload) {
    return ["colors", payload];
  },
};
