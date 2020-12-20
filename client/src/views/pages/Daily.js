import Component from "../../state-management/Component.js";
import store from "../../state-management/index.js";
import { apiBaseUrl } from "../../libraries/constants.js";
import { getIdParameter } from "../../libraries/parsePath.js";
const axios = require("axios");

export default class Daily extends Component {
  constructor({ $root }) {
    super({
      store,
    });
    this.$root = $root;
  }

  async getDailyData(id) {
    const result = await axios.get(
      `${apiBaseUrl}/daily/${id}`
    );
    this.diaries = result.data;
  }

  render() {
    this.diaryId = getIdParameter();

    this.getDailyData(this.diaryId).then(() => {
      this.$root.innerHTML = "";
      this.$root.textContent = "It's a diary";
    });
  }
}
