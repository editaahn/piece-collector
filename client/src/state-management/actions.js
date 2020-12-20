import { apiBaseUrl } from "../libraries/constants";
const axios = require("axios");

export default {
  setDateState(context, payload) {
    context.commit("setDateState", payload);
  },
  toggleToast(context, payload) {
    context.commit("toggleToast", payload);
  },
  async getColors(context) {
    const payload = await axios.get(`${apiBaseUrl}/color/list`);
    await context.commit("getColors", payload.data);
  },
};
