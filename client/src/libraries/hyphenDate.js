export const hyphenDate = (year, month, date) => {
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }

  return `${year}-${month}-${date}`;
};
