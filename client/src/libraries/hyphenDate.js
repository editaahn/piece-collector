export const hyphenDate = (year, month, date) => {
  if (date < 10) {
    date = "0" + date;
  }
  return `${year}-${month}-${date}`;
};
