import song from "../../../../../server/models/song";
import goBack from "../../../images/goBack.svg";
import { apiBaseUrl } from "../../../libraries/constants.js";
const axios = require("axios");

export default class DiaryHeader {
  constructor({ $nav, data: { type, date } }) {
    this.$nav = $nav;
    this.type = type;
    this.date = date;

    this.render();
    this.$submit?.addEventListener("click", this.submit.bind(this));
  }

  render() {
    this.$date = document.createElement("h1");
    this.$date.className = "Diary__date";
    this.$date.innerHTML = this.date;

    this.$goBack = document.createElement("button");
    this.$goBack.className = "Diary__goBack";
    this.$goBack.innerHTML = `<img src=${goBack} alt="goBack"/>`;

    this.$submitDiv = document.createElement("div");
    this.$submitDiv.className = "Diary__submitDiv";
    if (this.type === "new") {
      this.$submit = document.createElement("button");
      this.$submit.className = "Diary__submit";
      this.$submit.innerHTML = "done";
      this.$submitDiv.appendChild(this.$submit);
    }

    this.$nav.appendChild(this.$goBack);
    this.$nav.appendChild(this.$date);
    this.$nav.appendChild(this.$submitDiv);
  }

  async create(data) {
    try {
      const result = await axios.post(`${apiBaseUrl}/daily`, data);
      if (result.status === 201) {
        return { status: 201, message: "등록이 완료되었습니다." };
      }
      throw Error(result.status);
    } catch (err) {
      // 추후 에러 처리
      console.error(err);
      return { status: err, message: "등록에 실패했습니다." };
    }
  }

  submit() {
    const data = {
      date: new Date(this.date),
      title: document.querySelector(".Diary__title")?.textContent,
      colorId: document.querySelector(".Diary__color--selected")?.dataset
        .colorid,
      songs: [],
      article: document.querySelector(".Diary__article")?.innerHTML,
    };

    // 등록되면 done 버튼 비노출 및 등록완료 알럿
    const isValid = this.validate(data);
    if (isValid) {
      this.create(data).then((response) => {
        alert(response.message); // 토스트팝업으로 변경 필요
        this.$submit?.remove();
      });
    } else {
      alert("내용을 1개 입력해주세요.");
    }
  }

  validate(data) {
    // title, song, article 셋중 하나 있어야함
    if (data.title?.length || data.song?.length || data.article?.length) {
      return true;
    }
    return false;
  }
}
