import { onNavigate } from "../../../router.js";
import store from "../../../state-management/index.js";
import state from "../../../state-management/state.js";

export default class Calendar {
  constructor({ $page, data: { date, diaries } }) {
    this.$page = $page;
    this.date = date;
    this.diaries = diaries;
    this.writtenDays = this.diaries.map((diary) =>
      parseInt(diary.date.slice(-2))
    );

    this.setMonthInfo();
    this.render();
    this.$table.addEventListener("click", (e) => this.onClickDate(e));
  }

  setMonthInfo() {
    const { year, month } = this.date;
    this.lastDate = new Date(year, month + 1, 0).getDate(); // 다음 월의 1일에서 -1일
  }

  render() {
    this.$table = document.createElement("table");

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

        if (this.writtenDays.includes(dateCount)) {
          $td.style.backgroundColor = "red";
        }
        if (thisDay === day) {
          $td.textContent = dateCount;
          dateCount++;
        }

        $tr.appendChild($td);
      }

      this.$table.appendChild($tr);
    }
    this.$page.appendChild(this.$table);
  }

  onClickDate(e) {
    if (e.target.tagName !== "TD") return;

    const clickedDate = parseInt(e.target.textContent);
    const clickedId = this.diaries.find(
      (diary) => parseInt(diary.date.slice(-2)) === clickedDate
    )?.id;

    if (this.writtenDays.includes(clickedDate)) {
      // diaries가 등록된 날이면 조회 화면으로 이동
      onNavigate(`/daily/${clickedId}`);
    } else {
      // 등록되지 않은 날이면 작성 화면으로 이동
      store.dispatch("setNewDiaryDate", clickedDate);
      onNavigate("/daily/new");
    }
  }
}
