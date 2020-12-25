import Component from "../../state-management/Component.js";
import store from "../../state-management/index.js";
import DiaryHeader from "../components/Daily/DiaryHeader.js";
import DiaryTitle from "../components/Daily/DiaryTitle.js";
import DiarySong from "../components/Daily/DiarySong.js";
import DiaryArticle from "../components/Daily/DiaryArticle.js";
import DiaryColor from "../components/Daily/DiaryColor.js";
import { setDocumentTheme } from "../../libraries/themeColor";
import { getParameter } from "../../libraries/parsePath.js";
import { api } from "../../libraries/request.js";

export default class Daily extends Component {
  constructor({ $root }) {
    super({
      store,
    });
    this.$root = $root;
  }

  async render() {
    // this.diary = null; // 기존 데이터 초기화
    const parameter = getParameter();

    let diary;
    if (parameter !== "/new") {
      diary = await api.getDailyData(parameter);
    }

    this.$root.innerHTML = "";

    const $nav = document.createElement("header");
    const $page = document.createElement("section");

    $nav.className = "Diary__header";
    $page.className = "page Daily";

    this.header = new DiaryHeader({
      $nav,
      data: {
        type: diary ? "written" : "new",
        date: diary?.date ?? store.state.newDairyDate,
      },
    });

    this.title = new DiaryTitle({
      $page,
      data: {
        id: diary?.id ?? "",
        title: diary?.title ?? "",
      },
    });

    this.color = new DiaryColor({
      $page,
      data: {
        id: diary?.id ?? "",
        color: diary?.color ?? "",
      },
    });

    this.song = new DiarySong({
      $page,
      data: {
        id: diary?.id ?? "",
        songs: diary?.songs ?? [],
        color: diary?.color ?? "",
      },
    });

    this.article = new DiaryArticle({
      $page,
      data: {
        id: diary?.id ?? "",
        article: diary?.article ?? "",
      },
    });

    setDocumentTheme(diary?.color.id);

    this.$root.appendChild($nav);
    this.$root.appendChild($page);
  }
}
