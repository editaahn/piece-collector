import { apiBaseUrl } from "../libraries/constants";
import axios from "axios";

export default {
  setMonthlyDate(context, payload) {
    context.commit("setMonthlyDate", payload);
  },
  setNewDiaryDate(context, payload) {
    context.commit("setNewDiaryDate", payload);
  },
  toggleMonthPicker(context, payload) {
    context.commit("toggleMonthPicker", payload);
  },
  async getColors(context) {
    const payload = await axios.get(`${apiBaseUrl}/color/list`);
    await context.commit("getColors", payload.data);
  },
  addSongsForNewDiary(context, payload) {
    context.commit("addSongsForNewDiary", payload);
  },
  openMenu(context, payload) {
    context.commit("openMenu", payload);
  }
};
