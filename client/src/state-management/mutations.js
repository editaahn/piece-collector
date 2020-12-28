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
  toggleMonthPicker(state, payload) {
    return ["isMonthPickerOpen", payload];
  },
  getColors(state, payload) {
    return ["colors", payload];
  },
  addSongsForNewDiary(state, payload) {
    return ["songsForNewDiary", payload];
  },
};
