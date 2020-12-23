const initialDate = new Date();

export default {
  monthlyDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
  newDairyDate: null,
  isToastOpen: false,
  colors: []
};