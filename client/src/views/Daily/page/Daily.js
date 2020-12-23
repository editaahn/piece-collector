import Component from "../../../state-management/Component.js";
import store from "../../../state-management/index.js";
import DiaryTitle from "../components/DiaryTitle.js";
import DiarySong from "../components/DiarySong.js";
import DiaryArticle from "../components/DiaryArticle.js";
import DiaryColor from "../components/DiaryColor.js";
import { setDocumentTheme } from "../../../libraries/themeColor";
import { apiBaseUrl } from "../../../libraries/constants.js";
import { getParameter } from "../../../libraries/parsePath.js";
import DiaryHeader from "../components/DiaryHeader.js";
const axios = require("axios");

export default class Daily extends Component {
  constructor({ $root }) {
    super({
      store,
    });
    this.$root = $root;
  }

  async getDailyData(id) {
    const result = await axios.get(`${apiBaseUrl}/daily/${id}`);
    this.diary = result.data;
  }

  async render() {
    this.diary = null; // 기존 데이터 초기화
    const parameter = getParameter();
    parameter !== "/new" && (await this.getDailyData(parameter));

    this.$root.innerHTML = "";

    const $nav = document.createElement("header");
    const $page = document.createElement("section");

    $nav.className = "Diary__header";
    $page.className = "page Daily";

    this.header = new DiaryHeader({
      $nav,
      data: {
        date:
          this.diary?.date ?? store.state.newDairyDate,
      },
    });

    this.title = new DiaryTitle({
      $page,
      data: {
        id: this.diary?.id ?? "",
        title: this.diary?.title ?? "",
      },
    });

    this.color = new DiaryColor({
      $page,
      data: {
        id: this.diary?.id ?? "",
        color: this.diary?.color ?? "",
      },
    });

    this.song = new DiarySong({
      $page,
      data: {
        id: this.diary?.id ?? "",
        songs: this.diary?.songs ?? [],
        color: this.diary?.color ?? "",
      },
    });

    this.article = new DiaryArticle({
      $page,
      data: {
        id: this.diary?.id ?? "",
        article: this.diary?.article ?? "",
      },
    });

    setDocumentTheme(this.diary?.color.id);

    this.$root.appendChild($nav);
    this.$root.appendChild($page);
  }
}
