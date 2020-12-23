export default {
  setMonthlyDate(state, payload) {
    return [
      "monthlyDate",
      {
        year: payload.getFullYear(),
        month: payload.getMonth() + 1,
      },
    ];
  },
  setNewDiaryDate(state, payload) {
    return [
      "newDairyDate",
      `${state.monthlyDate.year}-${state.monthlyDate.month}-${payload}`,
    ];
  },
  toggleToast(state, payload) {
    return ["isToastOpen", payload];
  },
  getColors(state, payload) {
    return ["colors", payload];
  },
};
