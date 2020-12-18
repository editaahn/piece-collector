export default class Calendar {
  constructor({ $page, data: { date, diaries } }) {
    this.$page = $page;
    this.date = date;
    this.diaries = diaries;

    this.setMonthInfo();
    this.render();
  }

  setMonthInfo() {
    const { year, month } = this.date;
    this.lastDate = new Date(year, month + 1, 0).getDate(); // 다음 월의 1일에서 -1일
  }

  render() {
    const $table = document.createElement("table");

    const { year, month } = this.date;
    const WEEKS = 6; // 6주
    const DAYS = 7; // 1주에 7일

    let dateCount = 1; // 반복문 내 추가되는 날짜 현황

    for (let week = 1; week <= WEEKS; week++) {
      if (dateCount > this.lastDate) {
        break;
      }

      const $tr = document.createElement("tr");
      for (let day = 1; day <= DAYS; day++) {
        if (dateCount > this.lastDate) {
          break;
        }

        const thisDay = new Date(year, month, dateCount).getDay() + 1; // 요일
        const $td = document.createElement("td");
        if (thisDay === day) {
          $td.textContent = dateCount;
          dateCount++;
        }
        $tr.appendChild($td);
      }

      $table.appendChild($tr);
    }
    this.$page.appendChild($table);
  }
}
