export default {
  setDateState(context, payload) {
    context.commit("setDateState", payload);
  },
  toggleToast(context, payload) {
    context.commit("toggleToast", payload);
  },
};
