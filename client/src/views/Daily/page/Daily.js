import Component from "../../../state-management/Component.js";
import store from "../../../state-management/index.js";
import DiaryTitle from "../components/DiaryTitle.js";
import DiarySong from "../components/DiarySong.js";
import DiaryArticle from "../components/DiaryArticle.js";
import DiaryColor from "../components/DiaryColor.js";
import { apiBaseUrl } from "../../../libraries/constants.js";
import { getIdParameter } from "../../../libraries/parsePath.js";
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

  render() {
    this.diaryId = getIdParameter();

    this.getDailyData(this.diaryId).then(() => {
      this.$root.innerHTML = "";
      const $page = document.createElement("section");
      $page.className = "Daily";

      this.title = new DiaryTitle({
        $page,
        data: {
          title: this.diary.title,
        },
      });

      this.color = new DiaryColor({
        $page,
        data: {
          color: this.diary.color,
        },
      });

      this.song = new DiarySong({
        $page,
        data: {
          songs: this.diary.songs,
        },
      });

      this.article = new DiaryArticle({
        $page,
        data: {
          article: this.diary.article,
        },
      });

      this.$root.appendChild($page);
    });
  }
}
