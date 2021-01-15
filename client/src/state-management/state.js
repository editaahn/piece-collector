const initialDate = new Date();

export default {
  monthlyDate: {
    year: initialDate.getFullYear(),
    month: initialDate.getMonth(),
  },
  newDairyDate: null,
  isMonthPickerOpen: false,
  isMenuOpen: false,
  colors: [],
  songsForNewDiary: [],
};