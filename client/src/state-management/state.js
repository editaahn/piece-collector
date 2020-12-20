const initialDate = new Date();

export default {
  selectedDate: {
    date: initialDate,
    year: initialDate.getFullYear(),
    month: initialDate.getMonth() + 1,
  },
  isToastOpen: false,
  colors: []
};